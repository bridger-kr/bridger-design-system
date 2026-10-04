// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/StatusPill.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface StatusPillProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
    /** Semantic state — drives the dot color. */
    status?: 'connected' | 'success' | 'reconnecting' | 'warning' | 'disconnected' | 'danger' | 'info' | 'idle';
    children?: ReactNode;
    /** Pulse the dot (use for transient states like reconnecting). */
    pulse?: boolean;
    style?: CSSProperties;
}
/**
 * Compact status pill: a tinted fill carrying a colored label — the console's
 * most-used status affordance (gateway / stream state). Live states pulse by
 * default; pass `pulse={false}` when a steady marker is more appropriate.
 */
export declare function StatusPill({ status, children, pulse, style, ...rest }: StatusPillProps): import("react").JSX.Element;
