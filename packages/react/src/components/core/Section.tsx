import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type SectionVariant = 'band' | 'proof' | 'plain';
export type SectionTone = 'soft' | 'accent-wash' | 'grid';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  tone?: SectionTone;
  innerClassName?: string;
  children?: ReactNode;
}

export function Section({
  variant = 'plain',
  tone = 'soft',
  innerClassName,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cx('dt-section', `dt-section-${variant}`, `dt-section-${tone}`, className)} {...rest}>
      <div className={cx('dt-section-inner', innerClassName)}>{children}</div>
    </section>
  );
}
