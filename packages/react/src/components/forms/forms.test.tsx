// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DS_MESSAGES_KO } from '../../locale/messages';
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
  ThemeSwitch,
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
    expect(ThemeSwitch).toBeTypeOf('function');
  });

  it('exposes Select trigger hooks for hover and focus polish', () => {
    const select = Select({ options: ['Seoul'], placeholder: 'Select' });
    const trigger = select.props.children[1].props.children[0].props.children[0];

    expect(trigger.props.className).toContain('dt-select-trigger');
  });

  it('uses the popover layer token without injecting Select styles', () => {
    const { container } = render(<Select options={['Seoul']} placeholder="Select" />);
    const trigger = container.querySelector('button');

    expect(trigger).not.toBeNull();
    if (trigger) fireEvent.click(trigger);

    const popup = document.querySelector('[role="listbox"]')?.parentElement;
    expect(popup?.style.zIndex).toBe('var(--dt-z-index-popover)');
    expect(popup?.querySelector('style')).toBeNull();
  });

  it('uses the popover layer token without injecting Combobox styles', () => {
    const { container } = render(
      <Combobox label="Region" options={[{ value: 'seoul', label: 'Seoul' }]} />,
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
        <Checkbox label="Agree" defaultChecked />
        <RadioGroup options={['Seoul']} defaultValue="Seoul" />
        <Switch label="Enabled" defaultChecked />
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
    expect(
      container.querySelector(`button[aria-label="${DS_MESSAGES_KO.fileUpload.remove}"]`)?.className,
    ).toContain('dt-file-upload-remove');
  });
});

describe('ThemeSwitch', () => {
  const labels = { group: 'Theme', system: 'System', light: 'Light', dark: 'Dark' };

  const stubSystemTheme = (light: boolean) => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: light,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );
  };

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('follows the OS theme on first load when nothing is stored', () => {
    stubSystemTheme(false);
    const { container } = render(<ThemeSwitch labels={labels} />);

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(container.querySelector('button[aria-label="System"]')?.getAttribute('aria-pressed')).toBe('true');
    expect(window.localStorage.getItem('bridger-theme')).toBeNull();
  });

  it('restores a stored explicit choice over the OS theme', () => {
    stubSystemTheme(false);
    window.localStorage.setItem('bridger-theme', 'light');
    render(<ThemeSwitch labels={labels} />);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('persists explicit picks and clears storage when returning to system', () => {
    stubSystemTheme(true);
    const { container, getByRole } = render(<ThemeSwitch labels={labels} />);

    fireEvent.click(getByRole('button', { name: 'Dark' }));
    expect(window.localStorage.getItem('bridger-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    fireEvent.click(getByRole('button', { name: 'System' }));
    expect(window.localStorage.getItem('bridger-theme')).toBeNull();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(container.querySelector('button[aria-label="System"]')?.getAttribute('aria-pressed')).toBe('true');
  });

  it('keeps the group semantics and option order stable', () => {
    stubSystemTheme(true);
    const { container } = render(<ThemeSwitch labels={labels} />);

    const group = container.querySelector('[role="group"]');
    expect(group?.getAttribute('aria-label')).toBe('Theme');
    const options = [...(group?.querySelectorAll('button') ?? [])].map((b) => b.getAttribute('aria-label'));
    expect(options).toEqual(['System', 'Light', 'Dark']);
  });
});
