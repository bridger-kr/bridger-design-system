// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';

import {
  Avatar,
  CodeBlock,
  CodePane,
  KeyValue,
  LogRow,
  Pagination,
  StatPanel,
  StatTile,
  Table,
  UsageMeter,
} from './index';

async function expectNoViolations(html: Element | string) {
  const results = await axe(html, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  const matcher = toHaveNoViolations(results);
  expect(matcher.pass, matcher.message()).toBe(true);
}

function stubClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(window.navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
}

afterEach(() => {
  cleanup();
});

describe('data a11y', () => {
  it('has no axe violations across data display components', async () => {
    const { container } = render(
      <>
        <Avatar name="브릿저" />
        <CodeBlock code={'{"ok": true}'} label="response" />
        <CodePane label="response" lines={[{ segments: [{ text: 'status', tone: 'key' }] }]} copyable />
        <KeyValue items={[{ key: '리전', value: 'kr-seoul' }]} />
        <LogRow entries={[{ time: '12:00:01', level: 'ok', tool: 'weather_getForecast' }]} />
        <Pagination page={2} pageCount={9} />
        <StatPanel items={[{ value: '47.2%', label: '성공률' }]} />
        <StatTile label="호출 수" value="1,204" delta="+8.4%" deltaTone="up" />
        <Table columns={[{ key: 'name', header: '이름' }]} rows={[{ name: '서울' }]} />
        <UsageMeter label="일일 호출" value={720} max={1000} unit="회" />
      </>,
    );

    await expectNoViolations(container);
  });

  it('labels and keyboard-focuses an overflowing code sample', () => {
    const { getByRole } = render(<CodeBlock code="curl https://example.invalid" label="Request example" />);
    const region = getByRole('region', { name: 'Request example' });
    expect(region.getAttribute('tabindex')).toBe('0');
    expect(region.classList.contains('dt-code-block-lines')).toBe(true);
  });

  it('Pagination exposes a labelled nav, aria-current page, and keyboard activation', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(<Pagination page={2} pageCount={9} onChange={onChange} />);

    const nav = container.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBeTruthy();
    expect(container.querySelector('[aria-current="page"]')?.textContent).toBe('2');

    const next = container.querySelector('button[aria-label="다음"]') as HTMLElement;
    next.focus();
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('CodeBlock announces a successful copy through a live region', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);

    const { container } = render(<CodeBlock code={'{"ok": true}'} />);
    await user.click(container.querySelector('button') as HTMLElement);

    await waitFor(() => {
      expect(container.querySelector('[role="status"]')?.textContent).toBe('복사됨');
    });
    expect(writeText).toHaveBeenCalledWith('{"ok": true}');
  });

  it('CodeBlock reports a failed copy instead of claiming success', async () => {
    const user = userEvent.setup();
    stubClipboard(() => Promise.reject(new Error('denied')));

    const { container } = render(<CodeBlock code={'{"ok": true}'} />);
    await user.click(container.querySelector('button') as HTMLElement);

    await waitFor(() => {
      expect(container.querySelector('[role="status"]')?.textContent).toBe('복사하지 못했어요');
    });
    expect(container.querySelector('button')?.textContent).toContain('복사하지 못했어요');
    expect(document.activeElement).toBe(container.querySelector('.dt-code-block-lines'));
  });

  it('CodeBlock fails visibly when the clipboard API is unavailable', async () => {
    const user = userEvent.setup();
    Object.defineProperty(window.navigator, 'clipboard', { value: undefined, configurable: true });

    const { container } = render(<CodeBlock code={'x'} showLineNumbers={false} />);
    await user.click(container.querySelector('button') as HTMLElement);

    await waitFor(() => {
      expect(container.querySelector('button')?.textContent).toContain('복사하지 못했어요');
    });
    expect(window.getSelection()?.toString()).toBe('x');
    expect(document.activeElement).toBe(container.querySelector('.dt-code-block-lines'));
  });

  it('CodePane announces copy success and failure through a live region', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);

    const { container } = render(
      <CodePane copyable copyText="const a = 1" lines={[{ segments: [{ text: 'const a = 1' }] }]} />,
    );
    await user.click(container.querySelector('button') as HTMLElement);
    await waitFor(() => {
      expect(container.querySelector('[role="status"]')?.textContent).toBe('복사됨');
    });

    writeText.mockRejectedValueOnce(new Error('denied'));
    await user.click(container.querySelector('button') as HTMLElement);
    await waitFor(() => {
      expect(container.querySelector('[role="status"]')?.textContent).toBe('복사하지 못했어요');
    });
  });
});
