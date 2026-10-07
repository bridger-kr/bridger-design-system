import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { forwardRef, useId } from 'react';
import type { CSSProperties, ReactNode, Ref } from 'react';
import { warnOnce } from '../../lib/deprecate';
import { cx } from '../../lib/cx';

export interface DialogProps {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Called whenever the dialog requests an open-state change (Esc, backdrop, close button). */
  onOpenChange?: (open: boolean) => void;
  /** @deprecated Use `onOpenChange`. Called only when the dialog closes. Removed in v2.1. */
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  'aria-label'?: string;
  width?: number;
  className?: string;
  style?: CSSProperties;
}

/** Modal dialog with overlay, Esc/backdrop close, and a footer action bar. */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  {
    open,
    defaultOpen,
    onOpenChange,
    onClose,
    title,
    description,
    children,
    footer,
    'aria-label': ariaLabel,
    width = 460,
    className,
    style,
  },
  ref,
) {
  const titleId = useId();
  if (onClose !== undefined) {
    warnOnce('dialog-onclose', 'Dialog: `onClose` is deprecated — use `onOpenChange(open)`. Removed in v2.1.');
  }
  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange?.(nextOpen);
    if (!nextOpen) onClose?.();
  };

  return (
    <BaseDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop data-dt-dialog-overlay className="dt-dialog-overlay" />
        <div data-dt-dialog-content className="dt-dialog-viewport">
          <BaseDialog.Popup
            ref={ref as Ref<HTMLDivElement>}
            className={cx('dt-dialog-popup', className)}
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : ariaLabel}
            style={{ '--dt-dialog-width': `${width}px`, ...style } as CSSProperties}
          >
            <div className="dt-dialog-body">
              {title ? <BaseDialog.Title id={titleId} render={<h3 className="dt-dialog-title" />}>{title}</BaseDialog.Title> : null}
              {description ? <BaseDialog.Description render={<p className="dt-dialog-desc" />}>{description}</BaseDialog.Description> : null}
              {children ? <div className="dt-dialog-children">{children}</div> : null}
            </div>
            {footer ? <div className="dt-dialog-footer">{footer}</div> : null}
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
});
Dialog.displayName = 'Dialog';
