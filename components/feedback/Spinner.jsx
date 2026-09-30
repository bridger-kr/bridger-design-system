import React from 'react';

/** Spinner — a thin persimmon arc rotating on a faint track.
    Loop is driven by the Web Animations API so it honours
    prefers-reduced-motion; no CSS `infinite` declaration. */
export function Spinner({ size = 18, stroke = 2, color = 'var(--dt-accent)', style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof el.animate !== 'function') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const anim = el.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
      { duration: 700, iterations: Infinity, easing: 'linear' }
    );
    return () => anim.cancel();
  }, []);
  return (
    <span style={{ display: 'inline-flex', ...style }} role="status" aria-label="로딩 중">
      <svg ref={ref} width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={stroke} style={{ color: 'var(--dt-border-strong)', opacity: 0.5 }} />
        <path d="M12 3a9 9 0 0 1 9 9" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      </svg>
    </span>
  );
}
