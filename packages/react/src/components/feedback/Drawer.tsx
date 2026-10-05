import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import { forwardRef, useId } from 'react';
import type { CSSProperties, ReactNode, Ref } from 'react';
import { warnOnce } from '../../lib/deprecate';

export interface DrawerProps {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Called whenever the drawer requests an open-state change (Esc, backdrop, close button). */
  onOpenChange?: (open: boolean) => void;
  side?: 'right' | 'left';
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  /** @deprecated Use `onOpenChange`. Called only when the drawer closes. Removed in v2.1. */
  onClose?: () => void;
  width?: number;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
}

/**
 * Side sheet over a scrim for secondary flows — floats (shadow) but stays flat inside.
 * Render inside a positioned container (the panel fills its height).
 * @startingPoint section="Feedback" subtitle="Side sheet over a scrim" viewport="560x420"
 */
export const Drawer = forwardRef<HTMLElement, DrawerProps>(function Drawer(
  {
    open,
    defaultOpen,
    onOpenChange,
    side = 'right',
    title,
    children,
    footer,
    onClose,
    width = 420,
    className,
    style,
    'aria-label': ariaLabel,
  },
  ref,
) {
  const titleId = useId();
  const fromRight = side === 'right';
  if (onClose !== undefined) {
    warnOnce('drawer-onclose', 'Drawer: `onClose` is deprecated — use `onOpenChange(open)`. Removed in v2.1.');
  }
  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange?.(nextOpen);
    if (!nextOpen) onClose?.();
  };

  return (
    <BaseDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
      <BaseDialog.Portal>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: fromRight ? 'flex-end' : 'flex-start' }}>
          <BaseDialog.Backdrop data-dt-drawer-overlay style={{ position: 'absolute', inset: 0, zIndex: 'var(--dt-z-index-overlay)', background: 'color-mix(in srgb, var(--dt-text-strong) 32%, transparent)' }} />
          <BaseDialog.Popup
            render={<aside ref={ref as Ref<HTMLElement>} />}
            data-dt-drawer-content
            className={className}
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : ariaLabel || 'pane'}
            style={{
              position: 'relative', zIndex: 'var(--dt-z-index-modal)', width, maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column',
              background: 'var(--dt-surface)', boxShadow: 'var(--dt-shadow-overlay)',
              borderLeft: fromRight ? '1px solid var(--dt-border-strong)' : 'none',
              borderRight: fromRight ? 'none' : '1px solid var(--dt-border-strong)',
              fontFamily: 'var(--dt-font-sans)', ...style,
            }}
          >
            <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderBottom: '1px solid var(--dt-border)' }}>
              {title ? <BaseDialog.Title id={titleId} render={<h3 style={{ margin: 0, flex: 1, minWidth: 0, fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--dt-text-strong)' }} />}>{title}</BaseDialog.Title> : null}
              <BaseDialog.Close
                aria-label="닫기"
                className="dt-close-control"
                style={{ flex: '0 0 auto', display: 'grid', placeItems: 'center', border: 'none', background: 'var(--dt-surface-sunken)', borderRadius: 'var(--dt-radius-sm)', color: 'var(--dt-text-subtle)', cursor: 'pointer' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </BaseDialog.Close>
            </header>
            <div style={{ flex: 1, overflowY: 'auto', padding: 18 }}>{children}</div>
            {footer ? <footer style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderTop: '1px solid var(--dt-border)' }}>{footer}</footer> : null}
          </BaseDialog.Popup>
        </div>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
});
Drawer.displayName = 'Drawer';
