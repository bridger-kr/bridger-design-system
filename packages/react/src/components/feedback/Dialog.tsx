import type { ReactNode } from 'react';
import { useEffect, useId } from 'react';

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  'aria-label'?: string;
  width?: number;
}

/** Modal dialog with overlay, Esc/backdrop close, and a footer action bar. */
export function Dialog({ open, onClose, title, description, children, footer, 'aria-label': ariaLabel, width = 460 }: DialogProps) {
  const titleId = useId();
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100, display: 'grid', placeItems: 'center', padding: 20,
      background: 'color-mix(in srgb, var(--dt-ink-strong) 32%, transparent)',
      backdropFilter: 'blur(2px)', animation: 'dt-fade 160ms var(--dt-ease)',
    }}>
      <div
        role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        style={{
          width: '100%', maxWidth: width, background: 'var(--dt-surface)',
          borderRadius: 'var(--dt-radius-lg)', boxShadow: 'var(--dt-shadow-xl)',
          animation: 'dt-pop 200ms var(--dt-ease)', overflow: 'hidden',
        }}
      >
        <div style={{ padding: '22px 24px' }}>
          {title ? <h3 id={titleId} style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--dt-ink-strong)' }}>{title}</h3> : null}
          {description ? <p style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55, color: 'var(--dt-muted-strong)' }}>{description}</p> : null}
          {children ? <div style={{ marginTop: title || description ? 16 : 0 }}>{children}</div> : null}
        </div>
        {footer ? <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '14px 24px', background: 'var(--dt-surface-sunken)' }}>{footer}</div> : null}
      </div>
      <style>{`@keyframes dt-fade{from{opacity:0}}@keyframes dt-pop{from{opacity:0;transform:translateY(8px) scale(.98)}}`}</style>
    </div>
  );
}
