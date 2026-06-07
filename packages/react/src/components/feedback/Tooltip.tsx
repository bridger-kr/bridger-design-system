import type { CSSProperties, ReactNode } from 'react';
import { useState, useId } from 'react';

export interface TooltipProps {
  label: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
}

export function Tooltip({ label, position = 'top', children }: TooltipProps) {
  const tooltipId = useId();
  const [show, setShow] = useState(false);
  const pos: CSSProperties = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-7px)' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(7px)' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(-7px)' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(7px)' },
  }[position];
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      <span aria-describedby={show ? tooltipId : undefined}>{children}</span>
      <span id={tooltipId} role="tooltip" style={{
        position: 'absolute', zIndex: 60, whiteSpace: 'nowrap', pointerEvents: 'none',
        padding: '6px 9px', fontSize: 12, fontWeight: 500, lineHeight: 1.2,
        color: 'var(--dt-paper)', background: 'var(--dt-ink-strong)',
        borderRadius: 'var(--dt-radius-sm)', boxShadow: 'var(--dt-shadow-md)',
        animation: 'dt-tip 120ms var(--dt-ease)', ...pos,
      }}>{label}</span>
      <style>{`@keyframes dt-tip{from{opacity:0}}`}</style>
    </span>
  );
}
