// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/ConfirmDialog.tsx
// Regenerate: pnpm generate

import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
import { BUTTON_TONE, BUTTON_VARIANT, Button } from '../core/Button.jsx';
/**
 * Confirmation dialog built on Base UI AlertDialog — flat translucent scrim,
 * bordered popup with a single overlay shadow (Kumo elevation), focus held
 * inside until the user answers. For destructive actions pass `danger` plus
 * `target`/`impact` so the consequence is named before the button.
 */
export function ConfirmDialog({ open, onClose, onConfirm, title, target, impact, description, children, danger = false, confirmLabel, cancelLabel, width = 420, }) {
    const messages = useDSMessages();
    const handleOpenChange = (nextOpen) => {
        if (!nextOpen)
            onClose?.();
    };
    const resolvedConfirm = confirmLabel ?? (danger ? messages.confirmDialog.confirmDanger : messages.confirmDialog.confirm);
    const resolvedCancel = cancelLabel ?? messages.confirmDialog.cancel;
    return (<BaseAlertDialog.Root open={open} onOpenChange={handleOpenChange}>
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className="dt-dialog-overlay" style={{
            position: 'fixed', inset: 0, zIndex: 'var(--dt-z-index-overlay)',
            background: 'color-mix(in srgb, var(--dt-ink-strong) 32%, transparent)',
        }}/>
        <BaseAlertDialog.Viewport style={{
            position: 'fixed', inset: 0, zIndex: 'var(--dt-z-index-modal)',
            display: 'grid', placeItems: 'center', padding: 20, pointerEvents: 'none',
        }}>
          <BaseAlertDialog.Popup className="dt-dialog-popup dt-confirm-dialog" data-danger={danger ? '' : undefined} style={{
            width: '100%', maxWidth: width, background: 'var(--dt-surface)', pointerEvents: 'auto',
            border: '1px solid var(--dt-border-strong)',
            borderRadius: 'var(--dt-radius-lg)', boxShadow: 'var(--dt-shadow-lg)',
            overflow: 'hidden', fontFamily: 'var(--dt-font-sans)',
        }}>
            <div style={{ padding: '22px 24px' }}>
              {title ? (<BaseAlertDialog.Title render={<h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--dt-ink-strong)' }}/>}>
                  {title}
                </BaseAlertDialog.Title>) : null}
              {target || impact ? (<div style={{
                marginTop: 14, display: 'grid', gap: 5, padding: '11px 13px',
                background: 'var(--dt-surface-sunken)',
                border: `1px solid ${danger ? 'var(--dt-danger)' : 'var(--dt-border)'}`,
                borderRadius: 'var(--dt-radius-md)',
            }}>
                  {target ? (<span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--dt-ink-strong)', wordBreak: 'break-all' }}>
                      {target}
                    </span>) : null}
                  {impact ? (<span style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--dt-muted-strong)' }}>{impact}</span>) : null}
                </div>) : null}
              {description ? (<BaseAlertDialog.Description render={<p style={{ margin: '12px 0 0', fontSize: 13.5, lineHeight: 1.55, color: 'var(--dt-muted-strong)' }}/>}>
                  {description}
                </BaseAlertDialog.Description>) : null}
              {children ? <div style={{ marginTop: title || description ? 14 : 0 }}>{children}</div> : null}
            </div>
            <div style={{
            display: 'flex', justifyContent: 'flex-end', gap: 8,
            padding: '14px 24px', borderTop: '1px solid var(--dt-border)',
            background: 'var(--dt-surface-sunken)',
        }}>
              <BaseAlertDialog.Close render={<Button variant={BUTTON_VARIANT.Outline}>{resolvedCancel}</Button>}/>
              <BaseAlertDialog.Close render={<Button variant={BUTTON_VARIANT.Solid} tone={danger ? BUTTON_TONE.Danger : BUTTON_TONE.Neutral} onClick={onConfirm}>{resolvedConfirm}</Button>}/>
            </div>
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>);
}
