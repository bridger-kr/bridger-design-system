import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export const SurfaceTone = {
  Default: 'default',
  Raised: 'raised',
  Sunken: 'sunken',
} as const;

export type SurfaceTone = (typeof SurfaceTone)[keyof typeof SurfaceTone];

export const MetricAccent = {
  Accent: 'accent',
  Success: 'success',
  Info: 'info',
} as const;

export type MetricAccent = (typeof MetricAccent)[keyof typeof MetricAccent];
export type MetricAccentName = MetricAccent;

const surfaceToneClass: Record<SurfaceTone, string> = {
  [SurfaceTone.Default]: 'bg-[var(--dt-surface)]',
  [SurfaceTone.Raised]: 'bg-[var(--dt-surface-raised)]',
  [SurfaceTone.Sunken]: 'bg-[var(--dt-surface-sunken)]',
};

const metricAccentClass: Record<MetricAccentName, string> = {
  [MetricAccent.Accent]: 'text-[var(--dt-accent)]',
  [MetricAccent.Success]: 'text-[var(--dt-success)]',
  [MetricAccent.Info]: 'text-[var(--dt-info)]',
};

export type PanelProps = ComponentPropsWithoutRef<'section'> & {
  readonly tone?: SurfaceTone;
  readonly children: ReactNode;
};

export function Panel({ tone = SurfaceTone.Default, className, children, ...props }: PanelProps) {
  return (
    <section
      className={cx(
        'rounded-dtLg border border-[var(--dt-border)] px-5 py-5 md:px-6 md:py-6',
        surfaceToneClass[tone],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function metricAccentColor(accent: MetricAccentName): string {
  return metricAccentClass[accent];
}
