// @vitest-environment jsdom
import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

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
  it('exports all form components as forwardRef objects', () => {
    for (const component of [Checkbox, Combobox, FileUpload, RadioGroup, SegmentedControl, Select, Slider, Switch, ToggleSwitch, Textarea, ThemeSwitch]) {
      expect(component).toBeDefined();
      expect((component as { $$typeof?: symbol }).$$typeof).toBe(Symbol.for('react.forward_ref'));
    }
  });

  it('exposes Select trigger hooks for hover and focus polish', () => {
    const { container } = render(<Select options={['서울']} placeholder="선택" />);
    const trigger = container.querySelector('.dt-select-trigger');

    expect(trigger).not.toBeNull();
  });

  it('gives every labeled form control a unique useId-backed id', () => {
    const { container } = render(
      <>
        <Select label="이메일" options={['a']} />
        <Select label="이메일" options={['b']} />
        <Checkbox label="동의" />
        <Checkbox label="동의" />
        <Textarea label="메모" />
        <Textarea label="메모" />
      </>,
    );

    const labelFor = [...container.querySelectorAll('label[for]')].map((label) => label.getAttribute('for'));
    expect(labelFor).toHaveLength(6);
    expect(new Set(labelFor).size).toBe(6);
    for (const id of labelFor) {
      expect(id).toBeTruthy();
      expect(document.getElementById(id as string)).toBeTruthy();
    }

    expect(screen.getAllByLabelText('이메일').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByLabelText('메모')).toHaveLength(2);
  });

  it('forwards refs to the underlying form controls', () => {
    const selectRef = createRef<HTMLButtonElement>();
    const checkboxRef = createRef<HTMLButtonElement>();
    const textareaRef = createRef<HTMLTextAreaElement>();
    const comboboxRef = createRef<HTMLInputElement>();
    render(
      <>
        <Select ref={selectRef} label="지역" options={['서울']} />
        <Checkbox ref={checkboxRef} label="동의" />
        <Textarea ref={textareaRef} label="메모" />
        <Combobox ref={comboboxRef} label="검색" options={[{ value: 'a', label: 'A' }]} />
      </>,
    );

    expect(selectRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(checkboxRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(textareaRef.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(comboboxRef.current).toBeInstanceOf(HTMLInputElement);
  });

  it('uses the popover layer token without injecting Select styles', () => {
    const { container } = render(<Select options={['서울']} placeholder="선택" />);
    const trigger = container.querySelector('button');

    expect(trigger).not.toBeNull();
    if (trigger) fireEvent.click(trigger);

    const popup = document.querySelector('[role="listbox"]')?.parentElement;
    expect(popup?.className).toContain('dt-select-popup');
    expect(popup?.style.zIndex).toBe('');
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
    expect(popup?.className).toContain('dt-combobox-popup');
    expect(popup?.style.zIndex).toBe('');
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

describe('SegmentedControl', () => {
  it('names the group and exposes selection independently of color', () => {
    const { getByRole } = render(<SegmentedControl aria-label="Status" options={['All', 'Active']} />);
    expect(getByRole('group', { name: 'Status' })).toBeDefined();
    expect(getByRole('button', { name: 'All' }).getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(getByRole('button', { name: 'Active' }));
    expect(getByRole('button', { name: 'All' }).getAttribute('aria-pressed')).toBe('false');
    expect(getByRole('button', { name: 'Active' }).getAttribute('aria-pressed')).toBe('true');
  });
});

describe('ThemeSwitch', () => {
  const labels = { group: '테마', system: '시스템', light: '라이트', dark: '다크' };

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

  // Install an in-memory Storage stand-in on `window` for every test:
  // Node ≥22's --experimental-webstorage (default-on in Node 26) shadows
  // jsdom's localStorage and throws on every access without
  // --localstorage-file, which breaks window.localStorage.* calls.
  const stubLocalStorage = () => {
    const original = Object.getOwnPropertyDescriptor(window, 'localStorage');
    const store = new Map<string, string>();
    const storage = {
      getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
      setItem: (key: string, value: string) => { store.set(key, String(value)); },
      removeItem: (key: string) => { store.delete(key); },
      clear: () => { store.clear(); },
      key: (index: number) => [...store.keys()][index] ?? null,
      get length() { return store.size; },
    };
    Object.defineProperty(window, 'localStorage', {
      value: storage,
      configurable: true,
      writable: true,
    });
    return () => {
      if (original) {
        Object.defineProperty(window, 'localStorage', original);
      } else {
        Reflect.deleteProperty(window, 'localStorage');
      }
    };
  };

  let restoreLocalStorage = () => {};

  beforeEach(() => {
    restoreLocalStorage = stubLocalStorage();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    restoreLocalStorage();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to light on first load even when the OS is dark', () => {
    stubSystemTheme(false);
    const { container } = render(<ThemeSwitch labels={labels} />);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(container.querySelector('button[aria-label="라이트"]')?.getAttribute('aria-pressed')).toBe('true');
    expect(window.localStorage.getItem('bridger-theme')).toBeNull();
  });

  it('restores a stored explicit choice over the OS theme', () => {
    stubSystemTheme(false);
    window.localStorage.setItem('bridger-theme', 'light');
    render(<ThemeSwitch labels={labels} />);

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('persists explicit picks including system', () => {
    stubSystemTheme(true);
    const { container, getByRole } = render(<ThemeSwitch labels={labels} />);

    fireEvent.click(getByRole('button', { name: '다크' }));
    expect(window.localStorage.getItem('bridger-theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    fireEvent.click(getByRole('button', { name: '시스템' }));
    expect(window.localStorage.getItem('bridger-theme')).toBe('system');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(container.querySelector('button[aria-label="시스템"]')?.getAttribute('aria-pressed')).toBe('true');
  });

  it('restores an explicit system preference on a dark OS', () => {
    stubSystemTheme(false);
    window.localStorage.setItem('bridger-theme', 'system');
    const { getByRole } = render(<ThemeSwitch labels={labels} />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(getByRole('button', { name: '시스템' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('defaults invalid preferences to light', () => {
    stubSystemTheme(false);
    window.localStorage.setItem('bridger-theme', 'invalid');
    render(<ThemeSwitch labels={labels} />);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('keeps the group semantics and option order stable', () => {
    stubSystemTheme(true);
    const { container } = render(<ThemeSwitch labels={labels} />);

    const group = container.querySelector('[role="group"]');
    expect(group?.getAttribute('aria-label')).toBe('테마');
    const options = [...(group?.querySelectorAll('button') ?? [])].map((b) => b.getAttribute('aria-label'));
    expect(options).toEqual(['시스템', '라이트', '다크']);
  });
});
