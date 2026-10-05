import type { CSSProperties, HTMLAttributes } from 'react';

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
  size?: number;
  stroke?: number;
  color?: string;
  /** Accessible name announced through the status role. Pass `aria-hidden` instead when a parent (e.g. a busy button) already conveys the loading state. */
  label?: string;
  style?: CSSProperties;
}

export function Spinner({ size = 18, stroke = 2, color = 'var(--dt-accent)', label = '로딩 중', style, ...rest }: SpinnerProps) {
  const hidden = rest['aria-hidden'] === true || rest['aria-hidden'] === 'true';
  return (
    <span
      {...rest}
      style={{ display: 'inline-flex', ...style }}
      role={hidden ? undefined : 'status'}
      aria-label={hidden ? undefined : label}
    >
      <svg className="dt-spinner-svg" width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={stroke} style={{ color: 'var(--dt-border-strong)', opacity: 0.5 }} />
        <path d="M12 3a9 9 0 0 1 9 9" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      </svg>
    </span>
  );
}
