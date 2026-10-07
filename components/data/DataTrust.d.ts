// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/DataTrust.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
/**
 * Shared data-confidence model (issue #29). Every data component accepts the
 * same props so console screens can answer: is this a confirmed value, when
 * was it confirmed, did only part of the request succeed?
 */
export type DataState = 'loading' | 'ready' | 'empty' | 'partial' | 'stale' | 'error' | 'unauthorized';
export interface DataTrustProps {
    /** Lifecycle state — never synthesize `0`/empty silently for non-ready states. */
    state?: DataState;
    /** "기준 시각" — when the value was last confirmed (formatted or ISO). */
    asOf?: ReactNode;
    /** Data source label (e.g. the upstream preset or endpoint). */
    source?: ReactNode;
    /** Refresh affordance (usually a small Button or link). */
    refresh?: ReactNode;
    /** Why the state is not `ready` — rendered inside the meta line. */
    reason?: ReactNode;
}
export interface DataTrustMetaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, DataTrustProps {
}
/**
 * The one-line provenance footer shared by data components: reason first
 * (it explains the state), then asOf · source · refresh.
 */
export declare const DataTrustMeta: import("react").ForwardRefExoticComponent<DataTrustMetaProps & import("react").RefAttributes<HTMLDivElement>>;
/** Whether the state still shows measured data (vs. replaced by a notice). */
export declare function rendersValue(state?: DataState): boolean;
