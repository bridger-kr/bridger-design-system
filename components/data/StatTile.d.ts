// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/StatTile.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import type { DataTrustProps } from './DataTrust';
export type StatDeltaDirection = 'up' | 'down' | 'flat';
export type StatDeltaValence = 'positive' | 'negative' | 'neutral';
export interface StatTileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'>, DataTrustProps {
    label: ReactNode;
    value: ReactNode;
    /** e.g. "+8.4%". */
    delta?: ReactNode;
    /**
     * @deprecated Split into `deltaDirection` + `deltaValence`. `deltaTone`
     * maps `up`→positive-up, `down`→negative-down, `neutral`→neutral-flat.
     */
    deltaTone?: 'up' | 'down' | 'neutral';
    /** Numeric direction of the delta — renders the arrow glyph. */
    deltaDirection?: StatDeltaDirection;
    /** Business valence of the delta — renders the color. Independent of direction. */
    deltaValence?: StatDeltaValence;
    hint?: ReactNode;
    style?: CSSProperties;
}
/**
 * Metric tile — caption-size label, large tabular value, optional delta.
 * Numeric direction (arrow) and business valence (color) are separate props:
 * a value going down can be good news.
 */
export declare const StatTile: import("react").ForwardRefExoticComponent<StatTileProps & import("react").RefAttributes<HTMLDivElement>>;
