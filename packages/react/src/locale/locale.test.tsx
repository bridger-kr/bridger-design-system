// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DS_MESSAGES_EN, DS_MESSAGES_KO } from './messages';
import { DSLocaleProvider, useDSLocale } from './DSLocaleProvider';
import { CommandPalette } from '../components/navigation/CommandPalette';
import { Pagination } from '../components/data/Pagination';
import { Spinner } from '../components/feedback/Spinner';
import { Toast } from '../components/feedback/Toast';
import { ToolCard } from '../components/product/ToolCard';
import { FilterChip } from '../components/core/FilterChip';
import { UsageMeter } from '../components/data/UsageMeter';

describe('DSLocaleProvider', () => {
  it('falls back to Korean defaults without a provider', () => {
    const { container } = render(
      <>
        <CommandPalette open groups={[]} />
        <Pagination page={2} pageCount={5} />
        <Spinner />
      </>,
    );

    const input = container.querySelector('input');
    expect(input?.getAttribute('placeholder')).toBe(DS_MESSAGES_KO.commandPalette.placeholder);
    expect(container.querySelector('nav')?.getAttribute('aria-label')).toBe(DS_MESSAGES_KO.pagination.nav);
    expect(screen.getByRole('status').getAttribute('aria-label')).toBe(DS_MESSAGES_KO.common.loading);
  });

  it('switches built-in strings to English under locale="en"', () => {
    const { container } = render(
      <DSLocaleProvider locale="en">
        <CommandPalette open groups={[]} />
        <Pagination page={2} pageCount={5} />
        <Spinner />
        <Toast message="Saved" onDismiss={() => undefined} />
        <ToolCard name="weather_getForecast" />
        <FilterChip label="Weather" removable />
      </DSLocaleProvider>,
    );

    expect(container.querySelector('input')?.getAttribute('placeholder')).toBe(DS_MESSAGES_EN.commandPalette.placeholder);
    expect(container.querySelector('nav')?.getAttribute('aria-label')).toBe(DS_MESSAGES_EN.pagination.nav);
    expect(screen.getByRole('button', { name: DS_MESSAGES_EN.pagination.previous })).toBeTruthy();
    expect(screen.getByRole('status', { name: DS_MESSAGES_EN.common.loading })).toBeTruthy();
    expect(screen.getByRole('button', { name: DS_MESSAGES_EN.common.close })).toBeTruthy();
    expect(screen.getByText(DS_MESSAGES_EN.toolCard.emptyDescription)).toBeTruthy();
    expect(screen.getByText(DS_MESSAGES_EN.toolCard.state.available)).toBeTruthy();
    expect(screen.getByRole('button', { name: DS_MESSAGES_EN.filterChip.removeAriaLabel('Weather') })).toBeTruthy();
  });

  it('lets explicit props win over the ambient locale', () => {
    const { container } = render(
      <DSLocaleProvider locale="en">
        <CommandPalette open groups={[]} placeholder="Find a tool" />
      </DSLocaleProvider>,
    );

    expect(container.querySelector('input')?.getAttribute('placeholder')).toBe('Find a tool');
  });

  it('merges message overrides over the locale catalog', () => {
    render(
      <DSLocaleProvider locale="en" messages={{ common: { close: 'Dismiss' } }}>
        <Toast message="Saved" onDismiss={() => undefined} />
      </DSLocaleProvider>,
    );

    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeTruthy();
  });
});

describe('locale contract (EDD scope: DS #27)', () => {
  it('exposes the active locale for Intl formatting via useDSLocale', () => {
    function Probe() {
      const locale = useDSLocale();
      return <output data-testid="fmt">{new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US').format(1234567)}</output>;
    }

    render(
      <DSLocaleProvider locale="en">
        <Probe />
      </DSLocaleProvider>,
    );
    expect(screen.getByTestId('fmt').textContent).toBe('1,234,567');
  });

  it('formats UsageMeter numbers through the ambient locale', () => {
    render(
      <DSLocaleProvider locale="ko">
        <UsageMeter label="사용량" value={1234567} max={9999999} />
      </DSLocaleProvider>,
    );
    expect(screen.getByText('1,234,567')).toBeTruthy();
    expect(screen.getByText(/9,999,999/)).toBeTruthy();
  });

  it('warns in development when an override key is not in the catalog', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    render(
      <DSLocaleProvider locale="ko" messages={{ bogus: { key: 'x' } } as never}>
        <div />
      </DSLocaleProvider>,
    );
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("'bogus'"));
    spy.mockRestore();
  });

  it('does not fire CommandPalette onSelect for an Enter that commits an IME syllable', () => {
    const onSelect = vi.fn();
    const { container } = render(
      <CommandPalette
        open
        groups={[{ heading: 'tools', items: [{ label: 'weather' }] }]}
        onSelect={onSelect}
      />,
    );
    const input = container.querySelector('input');
    expect(input).toBeTruthy();
    if (!input) return;
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
    expect(onSelect).not.toHaveBeenCalled();
  });
});
