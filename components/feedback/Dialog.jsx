// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Dialog.tsx
// Regenerate: pnpm generate

import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import { useId } from 'react';
/** Modal dialog with overlay, Esc/backdrop close, and a footer action bar. */
export function Dialog({ open, onClose, title, description, children, footer, 'aria-label': ariaLabel, width = 460 }) {
    const titleId = useId();
    const handleOpenChange = (nextOpen) => {
        if (!nextOpen)
            onClose?.();
    };
    return (<BaseDialog.Root open={open} onOpenChange={handleOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop data-dt-dialog-overlay className="dt-dialog-overlay" style={{
            position: 'fixed', inset: 0, zIndex: 'var(--dt-z-index-overlay)', background: 'color-mix(in srgb, var(--dt-ink-strong) 32%, transparent)',
            backdropFilter: 'blur(2px)',
        }}/>
        <div data-dt-dialog-content style={{ position: 'fixed', inset: 0, zIndex: 'var(--dt-z-index-modal)', display: 'grid', placeItems: 'center', padding: 20, pointerEvents: 'none' }}>
          <BaseDialog.Popup className="dt-dialog-popup" aria-labelledby={title ? titleId : undefined} aria-label={title ? undefined : ariaLabel} style={{
            width: '100%', maxWidth: width, background: 'var(--dt-surface)', pointerEvents: 'auto',
            borderRadius: 'var(--dt-radius-lg)', boxShadow: 'var(--dt-shadow-xl)',
            overflow: 'hidden',
        }}>
            <div style={{ padding: '22px 24px' }}>
              {title ? <BaseDialog.Title id={titleId} render={<h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--dt-ink-strong)' }}/>}>{title}</BaseDialog.Title> : null}
              {description ? <BaseDialog.Description render={<p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'var(--dt-muted-strong)' }}/>}>{description}</BaseDialog.Description> : null}
              {children ? <div style={{ marginTop: title || description ? 16 : 0 }}>{children}</div> : null}
            </div>
            {footer ? <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '14px 24px', background: 'var(--dt-surface-sunken)' }}>{footer}</div> : null}
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>);
}
