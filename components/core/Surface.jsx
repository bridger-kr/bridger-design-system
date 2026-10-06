// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Surface.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
export const SurfaceTone = {
    Default: 'default',
    Raised: 'raised',
    Sunken: 'sunken',
};
export const MetricAccent = {
    Accent: 'accent',
    Success: 'success',
    Info: 'info',
};
const surfaceToneClass = {
    [SurfaceTone.Default]: 'bg-[var(--dt-surface)]',
    [SurfaceTone.Raised]: 'bg-[var(--dt-surface-raised)]',
    [SurfaceTone.Sunken]: 'bg-[var(--dt-surface-sunken)]',
};
const metricAccentClass = {
    [MetricAccent.Accent]: 'text-[var(--dt-accent-text)]',
    [MetricAccent.Success]: 'text-[var(--dt-success)]',
    [MetricAccent.Info]: 'text-[var(--dt-info)]',
};
export const Panel = forwardRef(function Panel({ tone = SurfaceTone.Default, className, children, ...props }, ref) {
    return (<section ref={ref} className={cx('rounded-dtLg border border-[var(--dt-border)] px-5 py-5 md:px-6 md:py-6', surfaceToneClass[tone], className)} {...props}>
      {children}
    </section>);
});
Panel.displayName = 'Panel';
export function metricAccentColor(accent) {
    return metricAccentClass[accent];
}
