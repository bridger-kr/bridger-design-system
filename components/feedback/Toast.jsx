import React from 'react';

const DOT = { info: 'var(--dt-cobalt)', success: 'var(--dt-success)', warning: 'var(--dt-warning)', danger: 'var(--dt-danger)' };

/**
 * Toast notification — a floating raised card with a status dot, message,
 * and optional action. Render inside a fixed corner stack.
 */
export function Toast({ tone = 'success', title, message, action, onDismiss, style }) {
  return (
    <div role="status" style={{
      display: 'flex', alignItems: 'flex-start', gap: 11, width: 340, maxWidth: '90vw',
      padding: '13px 15px', background: 'var(--dt-surface)',
      borderRadius: 'var(--dt-radius-md)', boxShadow: 'var(--dt-shadow-lg)',
      animation: 'dt-toast 240ms var(--dt-ease)', ...style,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: 9999, marginTop: 5, flex: '0 0 auto', background: DOT[tone] ?? DOT.success }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title ? <div style={{ fontSize: 14, fontWeight: 650, color: 'var(--dt-ink-strong)' }}>{title}</div> : null}
        {message ? <div style={{ marginTop: title ? 2 : 0, fontSize: 13, lineHeight: 1.5, color: 'var(--dt-muted-strong)' }}>{message}</div> : null}
      </div>
      {action ? <div style={{ flex: '0 0 auto' }}>{action}</div> : null}
      {onDismiss ? (
        <button onClick={onDismiss} aria-label="닫기" style={{ flex: '0 0 auto', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--dt-muted)', padding: 2, lineHeight: 0 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      ) : null}
      <style>{`@keyframes dt-toast{from{opacity:0;transform:translateY(10px)}}`}</style>
    </div>
  );
}
