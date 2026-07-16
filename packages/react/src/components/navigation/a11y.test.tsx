// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { CommandPalette, Menu } from './index';

const groups = [
  {
    heading: '도구',
    items: [{ label: 'weather_getForecast' }, { label: 'realestate_search' }],
  },
];

describe('CommandPalette a11y', () => {
  it('renders a listbox of options', () => {
    const { container } = render(<CommandPalette open groups={groups} />);
    expect(container.querySelector('[role="listbox"]')).not.toBeNull();
    expect(container.querySelectorAll('[role="option"]').length).toBe(2);
  });

  it('marks the active option with aria-selected and moves with ArrowDown', () => {
    const { container } = render(<CommandPalette open groups={groups} />);
    const listbox = container.querySelector('[role="listbox"]') as HTMLElement;
    const optionsBefore = container.querySelectorAll('[role="option"]');
    expect(optionsBefore[0].getAttribute('aria-selected')).toBe('true');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    const optionsAfter = container.querySelectorAll('[role="option"]');
    expect(optionsAfter[1].getAttribute('aria-selected')).toBe('true');
  });

  it('selects the active item on Enter', () => {
    const onSelect = vi.fn();
    const { container } = render(
      <CommandPalette open groups={groups} onSelect={onSelect} />,
    );
    const listbox = container.querySelector('[role="listbox"]') as HTMLElement;
    fireEvent.keyDown(listbox, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(groups[0].items[0]);
  });

  it('closes on Escape', () => {
    const { container } = render(<CommandPalette open groups={groups} />);
    const listbox = container.querySelector('[role="listbox"]') as HTMLElement;
    fireEvent.keyDown(listbox, { key: 'Escape' });
    expect(container.querySelector('[role="listbox"]')).toBeNull();
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
