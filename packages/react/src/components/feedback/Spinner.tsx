import type { CSSProperties } from 'react';
import { useId } from 'react';

export interface SpinnerProps {
  size?: number;
  stroke?: number;
  color?: string;
  style?: CSSProperties;
}

/** Indeterminate spinner — persimmon arc on a faint track. */
export function Spinner({ size = 18, stroke = 2, color = 'var(--dt-accent)', style }: SpinnerProps) {
  useId();
  return (
    <span style={{ display: 'inline-flex', ...style }} role="status" aria-label="로딩 중">
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ animation: 'dt-spin 0.7s linear infinite' }}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={stroke} style={{ color: 'var(--dt-border-strong)', opacity: 0.5 }} />
        <path d="M12 3a9 9 0 0 1 9 9" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      </svg>
      <style>{`@keyframes dt-spin{to{transform:rotate(360deg)}}`}</style>
    </span>
  );
}
