// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/UsageMeter.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface UsageMeterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
    label?: ReactNode;
    value?: number;
    max?: number;
    /** Suffix after max, e.g. "회/일". */
    unit?: string;
    hint?: ReactNode;
    style?: CSSProperties;
}
/**
 * Quota / usage bar — hairline track, persimmon fill escalating to warning/danger.
 * @startingPoint section="Data" subtitle="Quota usage with tabular readout" viewport="420x80"
 */
export declare function UsageMeter({ label, value, max, unit, hint, style, ...rest }: UsageMeterProps): import("react").JSX.Element;
