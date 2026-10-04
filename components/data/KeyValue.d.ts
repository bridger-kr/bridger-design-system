// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/KeyValue.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface KeyValueItem {
    key: string;
    value: ReactNode;
    /** Render the value in JetBrains Mono (paths, IDs, methods). */
    mono?: boolean;
    /** Tint the value persimmon (highlighted field). */
    accent?: boolean;
}
export interface KeyValueProps extends Omit<HTMLAttributes<HTMLDListElement>, 'children' | 'style'> {
    items?: KeyValueItem[];
    /** 1 = stacked rows, 2 = two-up grid. */
    columns?: 1 | 2;
    style?: CSSProperties;
}
/**
 * Definition list for spec metadata — hairline rows, muted key, ink value.
 * @startingPoint section="Data" subtitle="Spec metadata as a definition list" viewport="460x220"
 */
export declare function KeyValue({ items, columns, style, ...rest }: KeyValueProps): import("react").JSX.Element;
