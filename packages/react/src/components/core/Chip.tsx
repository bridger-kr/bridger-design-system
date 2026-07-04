import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type ChipVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
export type ChipSize = 'sm' | 'md';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  children?: ReactNode;
}

export function Chip({ variant = 'neutral', size = 'md', className, children, ...rest }: ChipProps) {
  return (
    <span className={cx('dt-chip', `dt-chip-${variant}`, `dt-chip-${size}`, className)} {...rest}>
      {children}
    </span>
  );
}
