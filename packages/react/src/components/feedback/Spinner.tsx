import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
  stroke?: number;
  color?: string;
  style?: CSSProperties;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 18, stroke = 2, color = 'var(--dt-accent)', className, style, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', ...style }} role="status" aria-label="로딩 중" {...rest}>
      <svg className="dt-spinner-svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={stroke} style={{ color: 'var(--dt-border-strong)', opacity: 0.5 }} />
        <path d="M12 3a9 9 0 0 1 9 9" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      </svg>
    </span>
  );
});
Spinner.displayName = 'Spinner';
