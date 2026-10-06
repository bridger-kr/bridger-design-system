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
  return (
    <span
      ref={ref}
      className={cx('dt-skeleton', className)}
      style={{
        display: 'block', width, height, borderRadius: radius,
        background: 'var(--dt-surface-sunken)', ...style,
      }}
      {...rest}
    />
  );
});
Skeleton.displayName = 'Skeleton';
