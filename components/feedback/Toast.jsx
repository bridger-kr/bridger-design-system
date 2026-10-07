// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Toast.tsx
// Regenerate: pnpm generate

import { Toast as BaseToast } from '@base-ui/react/toast';
import { X } from 'lucide-react';
import { forwardRef, useMemo } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
const TONES = { info: true, success: true, warning: true, danger: true };
function resolveTone(tone) {
    return tone && tone in TONES ? tone : 'success';
}
export const Toast = forwardRef(function Toast({ tone = 'success', title, message, action, onDismiss, closeLabel, className, style, ...rest }, ref) {
    const messages = useDSMessages();
    const resolved = resolveTone(tone);
    return (<div ref={ref} role={resolved === 'danger' || resolved === 'warning' ? 'alert' : 'status'} className={cx('dt-toast', className)} style={style} {...rest}>
      <span aria-hidden="true" className={cx('dt-toast-dot', `dt-toast-dot-${resolveTone(tone)}`)}/>
      <div className="dt-toast-body">
        {title ? <div className="dt-toast-title">{title}</div> : null}
        {message ? <div className="dt-toast-desc">{message}</div> : null}
      </div>
      {action ? <div className="dt-toast-action">{action}</div> : null}
      {onDismiss ? (<button className="dt-toast-close" onClick={onDismiss} aria-label={closeLabel ?? messages.common.close}>
          <Icon icon={X} size="sm"/>
        </button>) : null}
    </div>);
});
Toast.displayName = 'Toast';
/**
 * Queued toast API. Must be called inside `<ToastProvider>`.
 * `push` returns the toast id; `dismiss()` without an id closes the newest.
 */
export function useToast() {
    const manager = BaseToast.useToastManager();
    return useMemo(() => ({
        toasts: manager.toasts,
        push: (input) => {
            const options = typeof input === 'string' ? { message: input } : input;
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
/**
 * Toast host — owns the queue, the 5s auto-dismiss timer, and the fixed
 * viewport at `--dt-z-index-toast`. Queued toasts are announced through Base
 * UI's live region; mount once near the app root.
 */
export function ToastProvider({ children, timeout = 5000, limit = 3 }) {
    return (<BaseToast.Provider timeout={timeout} limit={limit}>
      {children}
      <ToastViewport limit={limit}/>
    </BaseToast.Provider>);
}
function ToastViewport({ limit }) {
    const { toasts } = BaseToast.useToastManager();
    const messages = useDSMessages();
    // Base UI only limits auto-dismiss grouping — overflow stays in `toasts`, so
    // cap what we render to keep the viewport from stacking past `limit`.
    const visible = toasts.slice(0, Math.max(0, limit));
    return (<BaseToast.Portal>
      <BaseToast.Viewport className="dt-toast-viewport">
        {visible.map((toast) => (<ToastCard key={toast.id} toast={toast} closeLabel={messages.common.close}/>))}
      </BaseToast.Viewport>
    </BaseToast.Portal>);
}
function ToastCard({ toast, closeLabel }) {
    const tone = resolveTone(toast.type);
    return (<BaseToast.Root toast={toast} className="dt-toast" role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}>
      <span aria-hidden="true" className={cx('dt-toast-dot', `dt-toast-dot-${tone}`)}/>
      <div className="dt-toast-body">
        {toast.title ? (<BaseToast.Title className="dt-toast-title"/>) : null}
        {toast.description ? (<BaseToast.Description className="dt-toast-desc"/>) : null}
      </div>
      {toast.data?.action ? <div className="dt-toast-action">{toast.data.action}</div> : null}
      <BaseToast.Close aria-label={closeLabel} className="dt-toast-close">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </BaseToast.Close>
    </BaseToast.Root>);
}
