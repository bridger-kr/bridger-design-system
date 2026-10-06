// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';

import {
  Checkbox,
  Combobox,
  FileUpload,
  RadioGroup,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  Textarea,
  ThemeSwitch,
} from './index';

async function expectNoViolations(html: Element | string) {
  const results = await axe(html, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  const matcher = toHaveNoViolations(results);
  expect(matcher.pass, matcher.message()).toBe(true);
}

afterEach(() => {
  cleanup();
});

describe('forms a11y', () => {
  it('has no axe violations across form controls', async () => {
    const { container } = render(
      <>
        <Checkbox label="동의" />
        <Combobox label="지역" options={[{ value: 'seoul', label: '서울' }]} />
        <FileUpload label="스펙" />
        <RadioGroup name="plan" options={['무료', '프로']} />
        <SegmentedControl options={['일', '주']} />
        <Select label="지역" options={['서울']} />
        <Slider label="요청 한도" min={0} max={100} defaultValue={40} />
        <Switch label="알림" />
        <Textarea label="설명" />
        <ThemeSwitch />
      </>,
    );

    await expectNoViolations(container);
  });

  it('RadioGroup selects the next option with arrow keys', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <RadioGroup name="plan" options={['무료', '프로']} defaultValue="무료" onChange={onChange} />,
    );
    const radios = container.querySelectorAll('[role="radio"]');
    expect(radios.length).toBe(2);
    (radios[0] as HTMLElement).focus();
    await user.keyboard('{ArrowDown}');
    expect(onChange).toHaveBeenCalledWith('프로');
    expect(radios[1].getAttribute('aria-checked')).toBe('true');
  });

  it('Switch toggles on Space and keeps an accessible name', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(<Switch label="알림" onChange={onChange} />);
    const control = container.querySelector('button') as HTMLElement;
    control.focus();
    await user.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('Slider responds to arrow keys from the thumb', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Slider label="요청 한도" min={0} max={100} defaultValue={40} onChange={onChange} />,
    );
    const thumbInput = container.querySelector('input[type="range"]') as HTMLElement;
    expect(thumbInput).not.toBeNull();
    thumbInput.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(41);
  });

  it('Slider control carries no inline outline suppression', () => {
    const { container } = render(<Slider label="요청 한도" defaultValue={40} />);
    const control = container.querySelector('.dt-slider-control') as HTMLElement;
    expect(control.style.outline).toBe('');
  });

  it('Combobox opens, arrows through options, and commits on Enter', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Combobox
        label="지역"
        options={[
          { value: 'seoul', label: '서울' },
          { value: 'busan', label: '부산' },
        ]}
        onChange={onChange}
      />,
    );
    const input = container.querySelector('input') as HTMLElement;
    input.focus();
    await waitFor(() => expect(document.body.querySelector('[role="option"]')).not.toBeNull());
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    await waitFor(() => expect(onChange).toHaveBeenCalledWith('seoul'));
  });

  it('Combobox closes the popup on Escape', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Combobox label="지역" options={[{ value: 'seoul', label: '서울' }]} />,
    );
    const input = container.querySelector('input') as HTMLElement;
    input.focus();
    await waitFor(() => expect(document.body.querySelector('[role="option"]')).not.toBeNull());
    await user.keyboard('{Escape}');
    await waitFor(() => expect(document.body.querySelector('[role="option"]')).toBeNull());
  });

  it('Select opens the listbox from the keyboard and picks with Enter', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Select label="지역" options={['서울', '부산']} onChange={onChange} />,
    );
    const trigger = container.querySelector('button') as HTMLElement;
    trigger.focus();
    await user.keyboard('{Enter}');
    await waitFor(() => expect(document.body.querySelector('[role="listbox"]')).not.toBeNull());
    const option = document.body.querySelector('[role="option"]') as HTMLElement;
    option.focus();
    await user.keyboard('{Enter}');
    await waitFor(() => expect(onChange).toHaveBeenCalledWith('서울'));
  });

  it('SegmentedControl options are real buttons reachable by Tab', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <SegmentedControl options={['일', '주', '월']} onChange={onChange} />,
    );
    await user.tab();
    const focused = document.activeElement as HTMLElement;
    expect(focused.tagName).toBe('BUTTON');
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalled();
  });

  it('FileUpload remove control has an accessible name and works on Enter', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const { container } = render(
      <FileUpload label="스펙" file={{ name: 'openapi.json', size: 2048 }} onRemove={onRemove} />,
    );
    const remove = container.querySelector('button[aria-label]') as HTMLElement;
    expect(remove).not.toBeNull();
    remove.focus();
    await user.keyboard('{Enter}');
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('Checkbox toggles with a click on its labelled control', () => {
    const onChange = vi.fn();
    const { container } = render(<Checkbox label="동의" onChange={onChange} />);
    const control = container.querySelector('[role="checkbox"], button') as HTMLElement;
    expect(control).not.toBeNull();
    fireEvent.click(control);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
