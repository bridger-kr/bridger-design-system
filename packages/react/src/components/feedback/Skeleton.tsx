import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  width?: number | string;
  height?: number | string;
  radius?: string;
  style?: CSSProperties;
}

export const Skeleton = forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  { width = '100%', height = 14, radius = 'var(--dt-radius-chip)', className, style, ...rest },
  ref,
) {
  const sizing = {
    '--dt-skeleton-width': typeof width === 'number' ? `${width}px` : width,
    '--dt-skeleton-height': typeof height === 'number' ? `${height}px` : height,
    '--dt-skeleton-radius': radius,
  } as CSSProperties;
  return (
    <span
      ref={ref}
      className={cx('dt-skeleton', className)}
      style={{ ...sizing, ...style }}
      {...rest}
    />
  );
});
Skeleton.displayName = 'Skeleton';
