import React from 'react';

/**
 * Tooltip — a small dark label on hover/focus. Wraps a single child trigger.
 * Position: top (default) / bottom / left / right.
 */
export function Tooltip({ label, position = 'top', children }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top:    { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-7px)' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(7px)' },
    left:   { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(-7px)' },
    right:  { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(7px)' },
  }[position];
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      {show ? (
        <span role="tooltip" style={{
          position: 'absolute', zIndex: 60, whiteSpace: 'nowrap', pointerEvents: 'none',
          padding: '6px 9px', fontSize: 12, fontWeight: 500, lineHeight: 1.2,
          color: 'var(--dt-paper)', background: 'var(--dt-ink-strong)',
          borderRadius: 'var(--dt-radius-sm)', boxShadow: 'var(--dt-shadow-md)',
          animation: 'dt-tip 120ms var(--dt-ease)', ...pos,
        }}>{label}</span>
      ) : null}
      <style>{`@keyframes dt-tip{from{opacity:0}}`}</style>
    </span>
  );
}
