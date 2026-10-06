// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/StatusPill.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export type StatusPillTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
/** @deprecated v1 connection states — use `tone`. Removed in v2.1. */
export type StatusPillStatus = 'connected' | 'success' | 'reconnecting' | 'warning' | 'disconnected' | 'danger' | 'info' | 'idle';
export interface StatusPillProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
    /** Semantic tone — drives the dot and label color. */
    tone?: StatusPillTone;
    /** Visible label. Equivalent to `children`; use one or the other. */
    label?: ReactNode;
    children?: ReactNode;
    /**
     * @deprecated Use `tone` — `connected`→`success`, `reconnecting`→`warning`,
     * `disconnected`→`danger`, `idle`→`neutral`. Removed in v2.1.
     */
    status?: StatusPillStatus;
    /** Pulse the dot (transient states like reconnecting). */
    pulse?: boolean;
    style?: CSSProperties;
}
/**
 * Compact status pill: a tinted fill carrying a colored label — the console's
 * most-used status affordance (gateway / stream state). Live states pulse by
 * default; pass `pulse={false}` when a steady marker is more appropriate.
 */
export declare const StatusPill: import("react").ForwardRefExoticComponent<StatusPillProps & import("react").RefAttributes<HTMLSpanElement>>;
