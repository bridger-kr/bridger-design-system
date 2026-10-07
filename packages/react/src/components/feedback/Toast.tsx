import { Toast as BaseToast } from '@base-ui/react/toast';
import { X } from 'lucide-react';
import { forwardRef, useMemo } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../../lib/icon';
import { useDSMessages } from '../../locale/DSLocaleProvider';

const TONES = { info: true, success: true, warning: true, danger: true };

export type ToastTone = keyof typeof TONES;

function resolveTone(tone: ToastTone | undefined): ToastTone {
  return tone && tone in TONES ? tone : 'success';
}

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
  const resolved = resolveTone(tone);
  return (
    <div
      ref={ref}
      role={resolved === 'danger' || resolved === 'warning' ? 'alert' : 'status'}
      className={cx('dt-toast', className)}
      style={style}
      {...rest}
    >
      <span aria-hidden="true" className={cx('dt-toast-dot', `dt-toast-dot-${resolveTone(tone)}`)} />
      <div className="dt-toast-body">
        {title ? <div className="dt-toast-title">{title}</div> : null}
        {message ? <div className="dt-toast-desc">{message}</div> : null}
      </div>
      {action ? <div className="dt-toast-action">{action}</div> : null}
      {onDismiss ? (
        <button className="dt-toast-close" onClick={onDismiss} aria-label={closeLabel ?? messages.common.close}>
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
      <BaseToast.Viewport className="dt-toast-viewport">
        {visible.map((toast) => (
          <ToastCard key={toast.id} toast={toast} closeLabel={messages.common.close} />
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}

function ToastCard({ toast, closeLabel }: { toast: BaseToast.Root.ToastObject<ToastData>; closeLabel: string }) {
  const tone = resolveTone(toast.type as ToastTone | undefined);
  return (
    <BaseToast.Root
      toast={toast}
      className="dt-toast"
      role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}
    >
      <span aria-hidden="true" className={cx('dt-toast-dot', `dt-toast-dot-${tone}`)} />
      <div className="dt-toast-body">
        {toast.title ? (
          <BaseToast.Title className="dt-toast-title" />
        ) : null}
        {toast.description ? (
          <BaseToast.Description className="dt-toast-desc" />
        ) : null}
      </div>
      {toast.data?.action ? <div className="dt-toast-action">{toast.data.action}</div> : null}
      <BaseToast.Close
        aria-label={closeLabel}
        className="dt-toast-close"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </BaseToast.Close>
    </BaseToast.Root>
  );
}
