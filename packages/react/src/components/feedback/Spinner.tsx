import { LoaderCircle } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useId } from 'react';

export interface SpinnerProps {
  size?: number;
  stroke?: number;
  color?: string;
  style?: CSSProperties;
}

export function Spinner({ size = 18, stroke = 1.75, color = 'var(--dt-accent)', style }: SpinnerProps) {
  useId();
  return (
    <span style={{ display: 'inline-flex', ...style }} role="status" aria-label="로딩 중">
      <LoaderCircle className="dt-spinner-svg" size={size} strokeWidth={stroke} color={color} aria-hidden="true" />
    </span>
  );
}
