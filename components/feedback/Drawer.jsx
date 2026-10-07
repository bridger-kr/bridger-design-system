// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Drawer.tsx
// Regenerate: pnpm generate

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import { forwardRef, useId } from 'react';
import { warnOnce } from '../lib/deprecate.jsx';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
/**
 * Side sheet over a scrim for secondary flows — floats (shadow) but stays flat inside.
 * Render inside a positioned container (the panel fills its height).
 * @startingPoint section="Feedback" subtitle="Side sheet over a scrim" viewport="560x420"
 */
export const Drawer = forwardRef(function Drawer({ open, defaultOpen, onOpenChange, side = 'right', title, children, footer, onClose, closeLabel, width = 420, className, style, 'aria-label': ariaLabel, }, ref) {
    const messages = useDSMessages();
    const titleId = useId();
    const fromRight = side === 'right';
    if (onClose !== undefined) {
        warnOnce('drawer-onclose', 'Drawer: `onClose` is deprecated — use `onOpenChange(open)`. Removed in v2.1.');
    }
    const handleOpenChange = (nextOpen) => {
        onOpenChange?.(nextOpen);
        if (!nextOpen)
            onClose?.();
    };
    return (<BaseDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
      <BaseDialog.Portal>
        <div className="dt-drawer-root" data-side={fromRight ? 'right' : 'left'}>
          <BaseDialog.Backdrop data-dt-drawer-overlay className="dt-drawer-overlay"/>
          <BaseDialog.Popup render={<aside ref={ref}/>} data-dt-drawer-content data-side={fromRight ? 'right' : 'left'} className={cx('dt-drawer-popup', className)} aria-labelledby={title ? titleId : undefined} aria-label={title ? undefined : ariaLabel || 'pane'} style={{ '--dt-drawer-width': `${width}px`, ...style }}>
            <header className="dt-drawer-header">
              {title ? <BaseDialog.Title id={titleId} render={<h3 className="dt-drawer-title"/>}>{title}</BaseDialog.Title> : null}
              <BaseDialog.Close aria-label={closeLabel ?? messages.common.close} className="dt-close-control dt-drawer-close">
                <Icon icon={X}/>
              </BaseDialog.Close>
            </header>
            <div className="dt-drawer-body">{children}</div>
            {footer ? <footer className="dt-drawer-footer">{footer}</footer> : null}
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>);
});
Drawer.displayName = 'Drawer';
