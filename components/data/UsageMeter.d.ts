// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/UsageMeter.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { DataTrustProps } from './DataTrust';
export interface UsageMeterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'>, DataTrustProps {
    label?: ReactNode;
    /**
     * Confirmed usage. Pass `undefined` (or `NaN`) for unknown — the meter
     * never renders unknown as `0`.
     */
    value?: number;
    max?: number;
    /** Suffix after max, e.g. "req/day". */
    unit?: string;
    /** Where the limit comes from (plan name, policy id). */
    limitSource?: ReactNode;
    hint?: ReactNode;
    style?: CSSProperties;
}
/**
 * Quota / usage bar — hairline track, persimmon fill escalating to warning/danger.
 * `role="meter"` with an accessible value text; unknown values render `—`, not 0.
 * @startingPoint section="Data" subtitle="Quota usage with tabular readout" viewport="420x80"
 */
export declare const UsageMeter: import("react").ForwardRefExoticComponent<UsageMeterProps & import("react").RefAttributes<HTMLDivElement>>;
