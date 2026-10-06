// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Dialog.tsx
// Regenerate: pnpm generate

import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import { forwardRef, useId } from 'react';
import { warnOnce } from '../lib/deprecate.jsx';
import { cx } from '../lib/cx.jsx';
/** Modal dialog with overlay, Esc/backdrop close, and a footer action bar. */
export const Dialog = forwardRef(function Dialog({ open, defaultOpen, onOpenChange, onClose, title, description, children, footer, 'aria-label': ariaLabel, width = 460, className, style, }, ref) {
    const titleId = useId();
    if (onClose !== undefined) {
        warnOnce('dialog-onclose', 'Dialog: `onClose` is deprecated — use `onOpenChange(open)`. Removed in v2.1.');
    }
    const handleOpenChange = (nextOpen) => {
        onOpenChange?.(nextOpen);
        if (!nextOpen)
            onClose?.();
    };
    return (<BaseDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop data-dt-dialog-overlay className="dt-dialog-overlay" style={{
            position: 'fixed', inset: 0, zIndex: 'var(--dt-z-index-overlay)', background: 'color-mix(in srgb, var(--dt-text-strong) 32%, transparent)',
            backdropFilter: 'blur(2px)',
        }}/>
        <div data-dt-dialog-content style={{ position: 'fixed', inset: 0, zIndex: 'var(--dt-z-index-modal)', display: 'grid', placeItems: 'center', padding: 20, pointerEvents: 'none' }}>
          <BaseDialog.Popup ref={ref} className={cx('dt-dialog-popup', className)} aria-labelledby={title ? titleId : undefined} aria-label={title ? undefined : ariaLabel} style={{
            width: '100%', maxWidth: width, background: 'var(--dt-surface)', pointerEvents: 'auto',
            borderRadius: 'var(--dt-radius-card)', boxShadow: 'var(--dt-shadow-overlay)',
            overflow: 'hidden',
            ...style,
        }}>
            <div style={{ padding: '22px 24px' }}>
              {title ? <BaseDialog.Title id={titleId} render={<h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--dt-text-strong)' }}/>}>{title}</BaseDialog.Title> : null}
              {description ? <BaseDialog.Description render={<p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'var(--dt-text-subtle)' }}/>}>{description}</BaseDialog.Description> : null}
              {children ? <div style={{ marginTop: title || description ? 16 : 0 }}>{children}</div> : null}
            </div>
            {footer ? <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '14px 24px', background: 'var(--dt-surface-sunken)' }}>{footer}</div> : null}
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>);
});
Dialog.displayName = 'Dialog';
