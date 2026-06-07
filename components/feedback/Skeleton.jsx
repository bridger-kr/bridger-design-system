import React from 'react';

/** Skeleton placeholder — a softly pulsing block. Match the real content's size. */
export function Skeleton({ width = '100%', height = 14, radius = 'var(--dt-radius-sm)', style }) {
  return (
    <span style={{
      display: 'block', width, height, borderRadius: radius,
      background: 'var(--dt-surface-sunken)', animation: 'dt-skel 1.4s var(--dt-ease) infinite', ...style,
    }}>
      <style>{`@keyframes dt-skel{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
    </span>
  );
}
