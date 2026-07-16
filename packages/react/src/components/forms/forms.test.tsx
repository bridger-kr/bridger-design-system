// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Checkbox,
  Combobox,
  FileUpload,
  RadioGroup,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  ToggleSwitch,
  Textarea,
} from './index';

describe('forms exports', () => {
  it('exports all form components as functions', () => {
    expect(Checkbox).toBeTypeOf('function');
    expect(Combobox).toBeTypeOf('function');
    expect(FileUpload).toBeTypeOf('function');
    expect(RadioGroup).toBeTypeOf('function');
    expect(SegmentedControl).toBeTypeOf('function');
    expect(Select).toBeTypeOf('function');
    expect(Slider).toBeTypeOf('function');
    expect(Switch).toBeTypeOf('function');
    expect(ToggleSwitch).toBeTypeOf('function');
    expect(Textarea).toBeTypeOf('function');
  });

  it('exposes Select trigger hooks for hover and focus polish', () => {
    const select = Select({ options: ['서울'], placeholder: '선택' });
    const trigger = select.props.children[1].props.children[0].props.children[0];

    expect(trigger.props.className).toContain('dt-select-trigger');
  });

  it('uses the popover layer token without injecting Select styles', () => {
    const { container } = render(<Select options={['서울']} placeholder="선택" />);
    const trigger = container.querySelector('button');

    expect(trigger).not.toBeNull();
    if (trigger) fireEvent.click(trigger);

    const popup = document.querySelector('[role="listbox"]')?.parentElement;
    expect(popup?.style.zIndex).toBe('var(--dt-z-index-popover)');
    expect(popup?.querySelector('style')).toBeNull();
  });

  it('uses the popover layer token without injecting Combobox styles', () => {
    const { container } = render(
      <Combobox label="지역" options={[{ value: 'seoul', label: '서울' }]} />,
    );
    const input = container.querySelector('input');

    expect(input).not.toBeNull();
    if (input) fireEvent.focus(input);

    const popup = document.querySelector('[role="listbox"]')?.parentElement;
    expect(popup?.style.zIndex).toBe('var(--dt-z-index-popover)');
    expect(popup?.querySelector('style')).toBeNull();
  });

  it('exposes stylesheet hooks for checked form control states', () => {
    const { container } = render(
      <>
        <Checkbox label="동의" defaultChecked />
        <RadioGroup options={['서울']} defaultValue="서울" />
        <Switch label="활성" defaultChecked />
      </>,
    );

    expect(container.querySelector('.dt-checkbox-control[data-checked]')).not.toBeNull();
    expect(container.querySelector('.dt-radio-control')).not.toBeNull();
    expect(container.querySelector('.dt-switch-control[data-checked] .dt-switch-thumb')).not.toBeNull();
    expect(container.querySelector('style')).toBeNull();
  });

  it('uses canonical target hooks for FileUpload interactive controls', () => {
    const { container, rerender } = render(<FileUpload id="spec" />);

    expect(container.querySelector('label[for="spec"]')?.className).toContain('dt-file-upload-dropzone');

    rerender(<FileUpload id="spec" file={{ name: 'openapi.yaml' }} />);
    expect(container.querySelector('button[aria-label="제거"]')?.className).toContain('dt-file-upload-remove');
  });
});
