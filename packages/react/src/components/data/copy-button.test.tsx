// @vitest-environment jsdom
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';

import { CodeBlock, CodePane, CopyButton } from './index';

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
  vi.restoreAllMocks();
});

describe('CopyButton', () => {
  it('is a forwardRef component with displayName', () => {
    expect(CopyButton).toBeTypeOf('object');
    expect(CopyButton.displayName).toBe('CopyButton');
  });

  it('renders the idle label and a decorative icon', () => {
    const { container } = render(<CopyButton value="https://mcp.bridger.kr" />);
    const button = screen.getByRole('button', { name: '복사' });

    expect(button.className).toContain('dt-copy-button');
    expect(button.getAttribute('data-state')).toBeNull();
    const icon = container.querySelector('svg');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('copies the value, switches to the copied state, and announces it', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);
    const onCopy = vi.fn();

    render(<CopyButton value="https://mcp.bridger.kr" onCopy={onCopy} />);
    await user.click(screen.getByRole('button', { name: '복사' }));

    await waitFor(() => expect(screen.getByRole('button', { name: '복사됨' })).not.toBeNull());
    const button = screen.getByRole('button', { name: '복사됨' });
    expect(button.getAttribute('data-state')).toBe('copied');
    expect(writeText).toHaveBeenCalledWith('https://mcp.bridger.kr');
    expect(onCopy).toHaveBeenCalledWith('copied');
    expect(button.parentElement?.querySelector('[role="status"]')?.textContent).toBe('복사됨');
  });

  it('evaluates a function value on click', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);

    render(<CopyButton value={() => 'computed-value'} />);
    await user.click(screen.getByRole('button'));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('computed-value'));
  });

  it('reports failure when the clipboard write rejects', async () => {
    const user = userEvent.setup();
    stubClipboard(() => Promise.reject(new Error('denied')));
    const onCopy = vi.fn();

    render(<CopyButton value="x" onCopy={onCopy} />);
    await user.click(screen.getByRole('button', { name: '복사' }));

    await waitFor(() => expect(screen.getByRole('button', { name: '복사하지 못했어요' })).not.toBeNull());
    const button = screen.getByRole('button', { name: '복사하지 못했어요' });
    expect(button.getAttribute('data-state')).toBe('failed');
    expect(onCopy).toHaveBeenCalledWith('failed');
    expect(button.parentElement?.querySelector('[role="status"]')?.textContent).toBe('복사하지 못했어요');
  });

  it('reports failure when the clipboard API is absent', async () => {
    const user = userEvent.setup();
    Object.defineProperty(window.navigator, 'clipboard', { value: undefined, configurable: true });
    const onCopy = vi.fn();

    render(<CopyButton value="x" onCopy={onCopy} />);
    await user.click(screen.getByRole('button'));

    await waitFor(() => expect(onCopy).toHaveBeenCalledWith('failed'));
  });

  it('returns to idle after the reset delay', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);

    try {
      render(<CopyButton value="x" />);
      const button = screen.getByRole('button', { name: '복사' });
      await act(async () => {
        button.click();
      });
      expect(button.getAttribute('data-state')).toBe('copied');

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1600);
      });
      expect(button.getAttribute('data-state')).toBeNull();
      expect(button.textContent).toContain('복사');
    } finally {
      vi.useRealTimers();
    }
  });

  it('icon-only renders no visible label and requires an accessible name', async () => {
    const user = userEvent.setup();
    stubClipboard(vi.fn().mockResolvedValue(undefined));

    render(<CopyButton iconOnly value="x" aria-label="주소 복사" />);
    const button = screen.getByRole('button', { name: '주소 복사' });
    expect(button.querySelector('.dt-copy-button-label')).toBeNull();

    await user.click(button);
    await waitFor(() => expect(button.getAttribute('data-state')).toBe('copied'));
    // The accessible name stays the action; the result is announced, not renamed.
    expect(screen.getByRole('button', { name: '주소 복사' })).toBe(button);
  });

  it('has no axe violations in idle and result states', async () => {
    stubClipboard(vi.fn().mockResolvedValue(undefined));
    const { container } = render(
      <div>
        <CopyButton value="x" />
        <CopyButton iconOnly value="y" aria-label="주소 복사" />
      </div>,
    );

    await expectNoViolations(container);
  });
});

describe('copy integration on code surfaces', () => {
  it('CodeBlock uses CopyButton and copies the snippet', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);

    render(<CodeBlock code={'{"ok": true}'} label="response" />);
    await user.click(screen.getByRole('button', { name: '복사' }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('{"ok": true}'));
    expect(screen.getByRole('button', { name: '복사됨' })).not.toBeNull();
  });

  it('CodePane uses CopyButton and copies the composed text', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);

    render(
      <CodePane
        copyable
        label="response"
        lines={[{ segments: [{ text: 'status', tone: 'key' }, { text: ': 200', tone: 'number' }] }]}
      />,
    );
    await user.click(screen.getByRole('button', { name: '복사' }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('status: 200'));
    expect(screen.getByRole('button', { name: '복사됨' })).not.toBeNull();
  });

  it('code surfaces keep the copy button on the shared CopyButton class hooks', async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error('denied')));
    const { container } = render(<CodeBlock code="x" copyable />);
    const button = screen.getByRole('button', { name: '복사' });

    expect(button.className).toContain('dt-copy-button');
    expect(button.className).toContain('dt-code-block-copy');
    expect(container.querySelector('.dt-visually-hidden')).not.toBeNull();
    await expectNoViolations(container);
  });
});
