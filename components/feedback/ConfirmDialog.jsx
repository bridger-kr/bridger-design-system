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
        <BaseAlertDialog.Backdrop className="dt-dialog-overlay"/>
        <BaseAlertDialog.Viewport className="dt-dialog-viewport">
          <BaseAlertDialog.Popup className="dt-dialog-popup dt-confirm-dialog" data-danger={danger ? '' : undefined} style={{ '--dt-dialog-width': `${width}px` }}>
            <div className="dt-dialog-body">
              {title ? (<BaseAlertDialog.Title render={<h3 className="dt-confirm-title"/>}>
                  {title}
                </BaseAlertDialog.Title>) : null}
              {target || impact ? (<div className="dt-confirm-target">
                  {target ? <span className="dt-confirm-target-name">{target}</span> : null}
                  {impact ? <span className="dt-confirm-impact">{impact}</span> : null}
                </div>) : null}
              {description ? (<BaseAlertDialog.Description render={<p className="dt-confirm-desc"/>}>
                  {description}
                </BaseAlertDialog.Description>) : null}
              {children ? <div className="dt-dialog-children">{children}</div> : null}
            </div>
            <div className="dt-dialog-footer">
              <BaseAlertDialog.Close render={<Button variant={BUTTON_VARIANT.Outline}>{resolvedCancel}</Button>}/>
              <BaseAlertDialog.Close render={<Button variant={BUTTON_VARIANT.Solid} tone={danger ? BUTTON_TONE.Danger : BUTTON_TONE.Neutral} onClick={onConfirm}>{resolvedConfirm}</Button>}/>
            </div>
          </BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>);
}
