import type { CSSProperties } from 'react';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  style?: CSSProperties;
}

export function Skeleton({ width = '100%', height = 14, radius = 'var(--dt-radius-sm)', style }: SkeletonProps) {
  return (
    <span className="dt-skeleton" style={{
      display: 'block', width, height, borderRadius: radius,
      background: 'var(--dt-surface-sunken)', ...style,
    }} />
  );
}
