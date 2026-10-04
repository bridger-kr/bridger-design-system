// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/StatTile.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface StatTileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
    label: ReactNode;
    value: ReactNode;
    /** e.g. "+8.4%". */
    delta?: ReactNode;
    deltaTone?: 'up' | 'down' | 'neutral';
    hint?: ReactNode;
    style?: CSSProperties;
}
/**
 * Metric tile — uppercase label, large tabular value, optional delta.
 * The console's KPI unit. Compose several inside a bordered stat row.
 */
export declare function StatTile({ label, value, delta, deltaTone, hint, style, ...rest }: StatTileProps): import("react").JSX.Element;
