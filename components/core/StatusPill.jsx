// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/StatusPill.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { warnOnce } from '../lib/deprecate.jsx';
const TONE_STYLE = {
    neutral: { bg: 'var(--dt-tint-text)', fg: 'var(--dt-text-subtle)' },
    accent: { bg: 'var(--dt-tint-accent)', fg: 'var(--dt-accent-text)' },
    success: { bg: 'var(--dt-tint-success)', fg: 'var(--dt-success)' },
    warning: { bg: 'var(--dt-tint-warning)', fg: 'var(--dt-warning)' },
    danger: { bg: 'var(--dt-tint-danger)', fg: 'var(--dt-danger)' },
    info: { bg: 'var(--dt-tint-cobalt)', fg: 'var(--dt-info)' },
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
export const StatusPill = forwardRef(function StatusPill({ tone, label, children, status, pulse, style, ...rest }, ref) {
    let resolvedTone = tone ?? 'neutral';
    if (status !== undefined) {
        warnOnce(`status-pill-status-${status}`, `StatusPill: status="${status}" is deprecated — use tone="${LEGACY_STATUS_MAP[status]}". Removed in v2.1.`);
        if (tone === undefined)
            resolvedTone = LEGACY_STATUS_MAP[status];
    }
    const toneStyle = TONE_STYLE[resolvedTone];
    const shouldPulse = pulse ?? (status === 'connected' || status === 'reconnecting');
    return (<span ref={ref} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            borderRadius: 'var(--dt-radius-pill)',
            background: toneStyle.bg,
            padding: '4px 10px',
            fontSize: 12,
            fontWeight: 600,
            color: toneStyle.fg,
            ...style,
        }} {...rest}>
      {shouldPulse ? (<span className="dt-status-pulse" aria-hidden="true" style={{
                width: 7,
                height: 7,
                borderRadius: 'var(--dt-radius-pill)',
                background: toneStyle.fg,
            }}/>) : null}
      {label ?? children}
    </span>);
});
StatusPill.displayName = 'StatusPill';
