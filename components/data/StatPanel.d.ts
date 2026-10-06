// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/StatPanel.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export interface StatPanelItem {
    readonly value: ReactNode;
    readonly label: ReactNode;
}
export interface StatPanelProps extends HTMLAttributes<HTMLDivElement> {
    items?: readonly StatPanelItem[];
    variant?: 'card' | 'list';
}
export declare const StatPanel: import("react").ForwardRefExoticComponent<StatPanelProps & import("react").RefAttributes<HTMLDivElement>>;
