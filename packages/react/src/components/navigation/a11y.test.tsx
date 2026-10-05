// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';

import { CommandPalette, Menu } from './index';

const groups = [
  {
    heading: '도구',
    items: [{ label: 'weather_getForecast' }, { label: 'realestate_search' }],
  },
];

const inputOf = (container: HTMLElement) =>
  container.querySelector('input[role="combobox"]') as HTMLElement;

describe('CommandPalette a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(<CommandPalette open groups={groups} />);
    const results = await axe(container, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      rules: { 'color-contrast': { enabled: false } },
    });
    const matcher = toHaveNoViolations(results);
    expect(matcher.pass, matcher.message()).toBe(true);
  });

  it('uses the combobox + listbox popup pattern', () => {
    const { container } = render(<CommandPalette open groups={groups} />);
    const input = inputOf(container);
    const listbox = container.querySelector('[role="listbox"]') as HTMLElement;

    expect(input).not.toBeNull();
    expect(listbox).not.toBeNull();
    // the combobox input is not nested inside the listbox
    expect(listbox.contains(input)).toBe(false);
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(input.getAttribute('aria-autocomplete')).toBe('list');
    expect(input.getAttribute('aria-controls')).toBe(listbox.getAttribute('id'));
    expect(input.getAttribute('aria-label')).toBeTruthy();
    expect(listbox.getAttribute('aria-label')).toBeTruthy();
    expect(container.querySelectorAll('[role="option"]').length).toBe(2);
  });

  it('points aria-activedescendant at the highlighted option and moves with arrows', () => {
    const { container } = render(<CommandPalette open groups={groups} />);
    const input = inputOf(container);
    const options = () => container.querySelectorAll('[role="option"]');

    expect(input.getAttribute('aria-activedescendant')).toBe(options()[0].getAttribute('id'));
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(options()[1].getAttribute('aria-selected')).toBe('true');
    expect(input.getAttribute('aria-activedescendant')).toBe(options()[1].getAttribute('id'));
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(options()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('selects the active item on Enter', () => {
    const onSelect = vi.fn();
    const { container } = render(
      <CommandPalette open groups={groups} onSelect={onSelect} />,
    );
    fireEvent.keyDown(inputOf(container), { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(groups[0].items[0]);
  });

  it('closes on Escape and reports through onOpenChange', () => {
    const onOpenChange = vi.fn();
    const { container } = render(
      <CommandPalette open groups={groups} onOpenChange={onOpenChange} />,
    );
    fireEvent.keyDown(inputOf(container), { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });

  it('follows the open prop when consumers control visibility', () => {
    const { container, rerender } = render(<CommandPalette open={false} groups={groups} />);
    expect(container.querySelector('[role="listbox"]')).toBeNull();
    rerender(<CommandPalette open groups={groups} />);
    expect(container.querySelector('[role="listbox"]')).not.toBeNull();
  });
});

describe('Menu a11y', () => {
  it('trigger exposes aria-haspopup and reflects expanded state', () => {
    const { container } = render(
      <Menu trigger={<span>열기</span>} items={[{ label: '항목' }]} />,
    );
    const trigger = container.querySelector('[aria-haspopup]');
    expect(trigger).not.toBeNull();
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');
  });

  it('uses scoped menu hooks and the canonical popover layer', async () => {
    const { container } = render(
      <Menu trigger={<span>열기</span>} items={[{ label: '항목' }]} />,
    );
    const trigger = container.querySelector('[aria-haspopup]');
    expect(trigger).not.toBeNull();
    if (trigger) fireEvent.click(trigger);

    await waitFor(() => expect(document.body.querySelector('[role="menu"]')).not.toBeNull());
    const menu = document.body.querySelector('[role="menu"]');
    expect(menu?.className).toContain('dt-menu-popup');
    expect(menu?.getAttribute('style')).toContain('z-index: var(--dt-z-index-popover)');
    expect(menu?.querySelector('.dt-menu-item')).not.toBeNull();
    expect(menu?.querySelector('style')).toBeNull();
  });
});
