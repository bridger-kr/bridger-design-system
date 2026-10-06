// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DS_MESSAGES_EN, DS_MESSAGES_KO } from './messages';
import { DSLocaleProvider } from './DSLocaleProvider';
import { CommandPalette } from '../components/navigation/CommandPalette';
import { Pagination } from '../components/data/Pagination';
import { Spinner } from '../components/feedback/Spinner';
import { Toast } from '../components/feedback/Toast';
import { ToolCard } from '../components/product/ToolCard';
import { FilterChip } from '../components/core/FilterChip';

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
