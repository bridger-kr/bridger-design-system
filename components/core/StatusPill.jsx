// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/StatusPill.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
const TONE_CLASS = {
    neutral: 'dt-status-pill',
    accent: 'dt-status-pill dt-status-pill-accent',
    success: 'dt-status-pill dt-status-pill-success',
    warning: 'dt-status-pill dt-status-pill-warning',
    danger: 'dt-status-pill dt-status-pill-danger',
    info: 'dt-status-pill dt-status-pill-info',
};
const LEGACY_STATUS_MAP = {
    connected: 'success',
    success: 'success',
    reconnecting: 'warning',
    warning: 'warning',
    disconnected: 'danger',
    danger: 'danger',
    info: 'info',
    idle: 'neutral',
};
/**
 * Compact status pill: a tinted fill carrying a colored label — the console's
 * most-used status affordance (gateway / stream state). Live states pulse by
 * default; pass `pulse={false}` when a steady marker is more appropriate.
 */
export const StatusPill = forwardRef(function StatusPill({ tone, label, children, status, pulse, className, style, ...rest }, ref) {
    let resolvedTone = tone ?? 'neutral';
    if (status !== undefined) {
        warnOnce(`status-pill-status-${status}`, `StatusPill: status="${status}" is deprecated — use tone="${LEGACY_STATUS_MAP[status]}". Removed in v2.1.`);
        if (tone === undefined)
            resolvedTone = LEGACY_STATUS_MAP[status];
    }
    const shouldPulse = pulse ?? (status === 'connected' || status === 'reconnecting');
    return (<span ref={ref} className={cx(TONE_CLASS[resolvedTone], className)} style={style} {...rest}>
      {shouldPulse ? (<span className="dt-status-pulse dt-status-pill-dot" aria-hidden="true"/>) : null}
      {label ?? children}
    </span>);
});
StatusPill.displayName = 'StatusPill';
