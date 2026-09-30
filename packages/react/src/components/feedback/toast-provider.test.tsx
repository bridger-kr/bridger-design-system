// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { DS_MESSAGES_EN, DS_MESSAGES_KO } from '../../locale/messages';
import { DSLocaleProvider } from '../../locale/DSLocaleProvider';
import { ToastProvider, useToast } from './Toast';

function Trigger({ options }: { options?: Parameters<ReturnType<typeof useToast>['push']>[0] }) {
  const { push } = useToast();
  return (
    <button type="button" onClick={() => push(options ?? { title: 'Saved', message: 'Changes applied', tone: 'success' })}>
      Notify
    </button>
  );
}

afterEach(() => {
  vi.useRealTimers();
});

describe('ToastProvider', () => {
  it('renders pushed toasts into a live-region viewport', () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));

    const viewport = document.querySelector('.dt-toast-viewport');
    expect(viewport?.getAttribute('aria-live')).toBe('polite');
    expect(viewport?.getAttribute('style')).toContain('z-index: var(--dt-z-index-toast)');
    expect(document.querySelector('.dt-toast')).not.toBeNull();
    expect(screen.getByText('Saved')).toBeTruthy();
    expect(screen.getByText('Changes applied')).toBeTruthy();
  });

  it('dismisses a toast through the localized close button', () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    const close = document.querySelector(`.dt-toast button[aria-label="${DS_MESSAGES_KO.common.close}"]`);
    expect(close).not.toBeNull();
    fireEvent.click(close as Element);
    expect(document.querySelector('.dt-toast')).toBeNull();
  });

  it('auto-dismisses after the 5s default timeout', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    expect(document.querySelector('.dt-toast')).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(5100);
    });
    expect(document.querySelector('.dt-toast')).toBeNull();
  });

  it('queues multiple toasts in the viewport', () => {
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    );
    const trigger = screen.getByRole('button', { name: 'Notify' });

    fireEvent.click(trigger);
    fireEvent.click(trigger);
    fireEvent.click(trigger);

    expect(document.querySelectorAll('.dt-toast').length).toBe(3);
  });

  it('matches the ko snapshot for a queued toast', () => {
    render(
      <ToastProvider>
        <Trigger options={{ title: 'Saved', message: 'Changes applied', tone: 'warning', timeout: 0 }} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    expect(document.querySelector('.dt-toast')).toMatchSnapshot();
  });

  it('matches the en snapshot for a queued toast', () => {
    render(
      <DSLocaleProvider locale="en">
        <ToastProvider>
          <Trigger options={{ title: 'Saved', message: 'Changes applied', tone: 'warning', timeout: 0 }} />
        </ToastProvider>
      </DSLocaleProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    const toast = document.querySelector('.dt-toast');
    expect(toast).toMatchSnapshot();
    expect(toast?.querySelector(`button[aria-label="${DS_MESSAGES_EN.common.close}"]`)).not.toBeNull();
  });
});
