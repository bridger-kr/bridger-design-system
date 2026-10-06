import { Toast as BaseToast } from '@base-ui/react/toast';
import { X } from 'lucide-react';
import { forwardRef, useMemo } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../../lib/icon';
import { useDSMessages } from '../../locale/DSLocaleProvider';

const DOT = { info: 'var(--dt-cobalt)', success: 'var(--dt-success)', warning: 'var(--dt-warning)', danger: 'var(--dt-danger)' };

export type ToastTone = keyof typeof DOT;

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: ToastTone;
  title?: ReactNode;
  message?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  /** Accessible name for the dismiss button; defaults to the ambient locale. */
  closeLabel?: string;
  style?: CSSProperties;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { tone = 'success', title, message, action, onDismiss, closeLabel, className, style, ...rest },
  ref,
) {
  const messages = useDSMessages();
  return (
    <div
      ref={ref}
      role="status"
      className={cx('dt-toast', className)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 11, width: 340, maxWidth: '90vw',
        padding: '13px 15px', background: 'var(--dt-surface)',
        border: '1px solid var(--dt-border-strong)',
        borderRadius: 'var(--dt-radius-card)', boxShadow: 'var(--dt-shadow-overlay)',
        ...style,
      }}
      {...rest}
    >
      <span style={{ width: 8, height: 8, borderRadius: 'var(--dt-radius-pill)', marginTop: 5, flex: '0 0 auto', background: DOT[tone] ?? DOT.success }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title ? <div style={{ fontSize: 14, fontWeight: 650, color: 'var(--dt-text-strong)' }}>{title}</div> : null}
        {message ? <div style={{ marginTop: title ? 2 : 0, fontSize: 13, lineHeight: 1.5, color: 'var(--dt-text-subtle)' }}>{message}</div> : null}
      </div>
      {action ? <div style={{ flex: '0 0 auto' }}>{action}</div> : null}
      {onDismiss ? (
        <button onClick={onDismiss} aria-label={closeLabel ?? messages.common.close} style={{ flex: '0 0 auto', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--dt-text-muted)', padding: 2, lineHeight: 0 }}>
          <Icon icon={X} size="sm" />
        </button>
      ) : null}
    </div>
  );
});
Toast.displayName = 'Toast';

interface ToastData {
  action?: ReactNode;
}

export interface ToastPushOptions {
  /** Re-adding an existing id updates the toast and resets its timer. */
  id?: string;
  tone?: ToastTone;
  title?: ReactNode;
  message?: ReactNode;
  /** Auto-dismiss delay in ms; 0 pins the toast. Defaults to the provider timeout. */
  timeout?: number;
  /** 'high' announces urgently; 'low' (default) announces politely. */
  priority?: 'low' | 'high';
  action?: ReactNode;
  onClose?: () => void;
}

export interface UseToastReturn {
  toasts: BaseToast.Root.ToastObject<ToastData>[];
  push: (options: ToastPushOptions | string) => string;
  dismiss: (toastId?: string) => void;
}

/**
 * Queued toast API. Must be called inside `<ToastProvider>`.
 * `push` returns the toast id; `dismiss()` without an id closes the newest.
 */
export function useToast(): UseToastReturn {
  const manager = BaseToast.useToastManager<ToastData>();
  return useMemo<UseToastReturn>(() => ({
    toasts: manager.toasts,
    push: (input) => {
      const options: ToastPushOptions = typeof input === 'string' ? { message: input } : input;
      return manager.add({
        id: options.id,
        type: options.tone,
        title: options.title,
        description: options.message,
        timeout: options.timeout,
        priority: options.priority,
        onClose: options.onClose,
        data: options.action ? { action: options.action } : undefined,
      });
    },
    dismiss: (toastId) => manager.close(toastId),
  }), [manager]);
}

export interface ToastProviderProps {
  children?: ReactNode;
  /** Auto-dismiss delay in ms. Default 5000; 0 disables auto-dismiss. */
  timeout?: number;
  /** Maximum toasts shown at once; older toasts queue. Default 3. */
  limit?: number;
}

/**
 * Toast host — owns the queue, the 5s auto-dismiss timer, and the fixed
 * viewport at `--dt-z-index-toast`. Queued toasts are announced through Base
 * UI's live region; mount once near the app root.
 */
export function ToastProvider({ children, timeout = 5000, limit = 3 }: ToastProviderProps) {
  return (
    <BaseToast.Provider timeout={timeout} limit={limit}>
      {children}
      <ToastViewport limit={limit} />
    </BaseToast.Provider>
  );
}

function ToastViewport({ limit }: { limit: number }) {
  const { toasts } = BaseToast.useToastManager<ToastData>();
  const messages = useDSMessages();
  // Base UI only limits auto-dismiss grouping — overflow stays in `toasts`, so
  // cap what we render to keep the viewport from stacking past `limit`.
  const visible = toasts.slice(0, Math.max(0, limit));
  return (
    <BaseToast.Portal>
      <BaseToast.Viewport
        className="dt-toast-viewport"
        style={{
          position: 'fixed', right: 16, bottom: 16, zIndex: 'var(--dt-z-index-toast)',
          display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end',
        }}
      >
        {visible.map((toast) => (
          <ToastCard key={toast.id} toast={toast} closeLabel={messages.common.close} />
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

function ToastCard({ toast, closeLabel }: { toast: BaseToast.Root.ToastObject<ToastData>; closeLabel: string }) {
  const tone = (toast.type as ToastTone | undefined) ?? 'success';
  return (
    <BaseToast.Root
      toast={toast}
      className="dt-toast"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 11, width: 340, maxWidth: '90vw',
        padding: '13px 15px', background: 'var(--dt-surface)',
        border: '1px solid var(--dt-border-strong)',
        borderRadius: 'var(--dt-radius-card)', boxShadow: 'var(--dt-shadow-overlay)',
      }}
    >
      <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 9999, marginTop: 5, flex: '0 0 auto', background: DOT[tone] ?? DOT.success }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {toast.title ? (
          <BaseToast.Title style={{ fontSize: 14, fontWeight: 650, color: 'var(--dt-text-strong)' }} />
        ) : null}
        {toast.description ? (
          <BaseToast.Description style={{ marginTop: toast.title ? 2 : 0, fontSize: 13, lineHeight: 1.5, color: 'var(--dt-text-subtle)' }} />
        ) : null}
      </div>
      {toast.data?.action ? <div style={{ flex: '0 0 auto' }}>{toast.data.action}</div> : null}
      <BaseToast.Close
        aria-label={closeLabel}
        style={{ flex: '0 0 auto', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--dt-text-muted)', padding: 2, lineHeight: 0 }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </BaseToast.Close>
    </BaseToast.Root>
  );
}
