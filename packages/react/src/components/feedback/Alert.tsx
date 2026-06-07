import type { CSSProperties, ReactNode } from 'react';

const TONE = {
  neutral: { fg: 'var(--dt-muted-strong)', bg: 'var(--dt-surface-sunken)', accent: 'var(--dt-muted)' },
  info: { fg: 'var(--dt-cobalt)', bg: 'var(--dt-tint-cobalt)', accent: 'var(--dt-cobalt)' },
  success: { fg: 'var(--dt-success)', bg: 'var(--dt-tint-success)', accent: 'var(--dt-success)' },
  warning: { fg: 'var(--dt-warning)', bg: 'var(--dt-tint-warning)', accent: 'var(--dt-warning)' },
  danger: { fg: 'var(--dt-danger)', bg: 'var(--dt-tint-danger)', accent: 'var(--dt-danger)' },
};

export interface AlertProps {
  tone?: keyof typeof TONE;
  title?: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  style?: CSSProperties;
}

/** Inline alert/banner with a left accent rule — calm, recovery-oriented. */
export function Alert({ tone = 'info', title, children, icon, action, onDismiss, style }: AlertProps) {
  const t = TONE[tone] ?? TONE.info;
  return (
    <div role="status" style={{
      display: 'flex', gap: 12, padding: '13px 15px',
      background: t.bg, borderRadius: 'var(--dt-radius-md)',
      boxShadow: `inset 3px 0 0 ${t.accent}`, ...style,
    }}>
      {icon ? <span style={{ color: t.fg, display: 'inline-flex', flex: '0 0 auto', marginTop: 1 }}>{icon}</span> : null}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title ? <div style={{ fontSize: 14, fontWeight: 650, color: 'var(--dt-ink-strong)' }}>{title}</div> : null}
        {children ? <div style={{ marginTop: title ? 3 : 0, fontSize: 13, lineHeight: 1.5, color: 'var(--dt-muted-strong)' }}>{children}</div> : null}
        {action ? <div style={{ marginTop: 10 }}>{action}</div> : null}
      </div>
      {onDismiss ? (
        <button onClick={onDismiss} aria-label="닫기" style={{ flex: '0 0 auto', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--dt-muted)', padding: 2, lineHeight: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      ) : null}
    </div>
  );
}
