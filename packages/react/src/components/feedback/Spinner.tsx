import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';

export interface SpinnerProps {
  size?: number;
  stroke?: number;
  color?: string;
  style?: CSSProperties;
}

/**
 * Determinate-arc loading spinner. The rotate loop is driven by the Web
 * Animations API rather than a CSS `infinite` declaration so it can honour
 * `prefers-reduced-motion` at runtime and keeps styles.css free of loop
 * syntax (DESIGN.md §11). Reduced motion renders the static arc.
 */
export function Spinner({ size = 18, stroke = 2, color = 'var(--dt-accent)', style }: SpinnerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el || typeof el.animate !== 'function') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animation = el.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }], {
      duration: 700,
      iterations: Infinity,
      easing: 'linear',
    });
    return () => animation.cancel();
  }, []);

  return (
    <span style={{ display: 'inline-flex', ...style }} role="status" aria-label="로딩 중">
      <svg ref={svgRef} className="dt-spinner-svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={stroke} style={{ color: 'var(--dt-border-strong)', opacity: 0.5 }} />
        <path d="M12 3a9 9 0 0 1 9 9" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      </svg>
    </span>
  );
}
