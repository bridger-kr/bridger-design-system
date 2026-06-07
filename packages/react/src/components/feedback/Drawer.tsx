import type { CSSProperties, ReactNode } from 'react';
import { useId } from 'react';

export interface DrawerProps {
  open?: boolean;
  side?: 'right' | 'left';
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  width?: number;
  style?: CSSProperties;
  'aria-label'?: string;
}

/**
 * Side sheet over a scrim for secondary flows — floats (shadow) but stays flat inside.
 * Render inside a positioned container (the panel fills its height).
 * @startingPoint section="Feedback" subtitle="Side sheet over a scrim" viewport="560x420"
 */
export function Drawer({ open = false, side = 'right', title, children, footer, onClose, width = 420, style, 'aria-label': ariaLabel }: DrawerProps) {
  const titleId = useId();
  if (!open) return null;
  const fromRight = side === 'right';
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40, display: 'flex', justifyContent: fromRight ? 'flex-end' : 'flex-start' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(24,22,18,0.32)' }} />
      <aside
        role="dialog" aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel || 'pane'}
        style={{
          position: 'relative', width, maxWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          background: 'var(--dt-surface)', boxShadow: 'var(--dt-shadow-xl)',
          borderLeft: fromRight ? '1px solid var(--dt-border-strong)' : 'none',
          borderRight: fromRight ? 'none' : '1px solid var(--dt-border-strong)',
          fontFamily: 'var(--dt-font-sans)', ...style,
        }}
      >
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderBottom: '1px solid var(--dt-border)' }}>
          {title ? <h3 id={titleId} style={{ margin: 0, flex: 1, minWidth: 0, fontSize: 16, fontWeight: 650, letterSpacing: '-0.01em', color: 'var(--dt-ink-strong)' }}>{title}</h3> : null}
          <button
            type="button" onClick={onClose} aria-label="닫기"
            style={{ flex: '0 0 auto', width: 30, height: 30, display: 'grid', placeItems: 'center', border: 'none', background: 'var(--dt-surface-sunken)', borderRadius: 'var(--dt-radius-sm)', color: 'var(--dt-muted-strong)', cursor: 'pointer' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </header>
        <div style={{ flex: 1, overflowY: 'auto', padding: 18 }}>{children}</div>
        {footer ? <footer style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', borderTop: '1px solid var(--dt-border)' }}>{footer}</footer> : null}
      </aside>
    </div>
  );
}
