import type { CSSProperties } from 'react';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: string;
  style?: CSSProperties;
}

/** Pulsing placeholder block for loading states. */
export function Skeleton({ width = '100%', height = 14, radius = 'var(--dt-radius-sm)', style }: SkeletonProps) {
  return (
    <span style={{
      display: 'block', width, height, borderRadius: radius,
      background: 'var(--dt-surface-sunken)', animation: 'dt-skel 1.4s var(--dt-ease) infinite', ...style,
    }}>
      <style>{`@keyframes dt-skel{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </span>
  );
}
