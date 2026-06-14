import React from 'react';

export const AlertTone = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
};

export const AlertMotion = {
  None: 'none',
  Subtle: 'subtle',
  Pulse: 'pulse',
};

const TONE_BACKGROUND = {
  info: 'var(--dt-status-cobalt)',
  success: 'var(--dt-status-success)',
  warning: 'var(--dt-status-warning)',
  danger: 'var(--dt-status-danger)',
};

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function Alert({ tone = AlertTone.Info, title, children, icon, action, motion = AlertMotion.None, onDismiss, className, style }) {
  const background = TONE_BACKGROUND[tone] ?? TONE_BACKGROUND[AlertTone.Info];
  const motionClass = motion === AlertMotion.None ? undefined : `dt-alert-motion-${motion}`;
  return (
    <div
      role="status"
      className={cx('dt-alert', motionClass, className)}
      style={{
        alignItems: 'flex-start',
        background,
        borderRadius: 20,
        color: 'var(--dt-alert-ink)',
        display: 'flex',
        gap: 12,
        minHeight: 62,
        overflow: 'clip',
        padding: '13px 15px',
        position: 'relative',
        transition: 'filter var(--dt-motion-fast), transform var(--dt-motion-fast)',
        width: 'min(100%, 380px)',
        ...style,
      }}
    >
      {icon ? <span style={{ color: 'currentColor', display: 'inline-flex', flex: '0 0 auto', marginTop: 1 }}>{icon}</span> : null}
      <div style={{ flex: '1 0 0', minWidth: 1, overflow: 'clip', wordBreak: 'break-word' }}>
        {title ? <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 'normal' }}>{title}</div> : null}
        {children ? <div style={{ marginTop: title ? 3 : 0, fontSize: 13, fontWeight: 400, lineHeight: 'normal' }}>{children}</div> : null}
        {action ? <div style={{ marginTop: 10 }}>{action}</div> : null}
      </div>
      {onDismiss ? (
        <button onClick={onDismiss} aria-label="닫기" style={{ flex: '0 0 auto', border: 'none', background: 'transparent', cursor: 'pointer', color: 'currentColor', padding: 2, lineHeight: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      ) : null}
    </div>
  );
}
