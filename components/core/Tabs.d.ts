// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Tabs.tsx
// Regenerate: pnpm generate

import type { CSSProperties, ReactNode } from 'react';
export interface TabItem {
    id: string;
    label: string;
    icon?: ReactNode;
    count?: number | string;
}
export type TabsVariant = 'underline' | 'segmented';
export interface TabsProps {
    tabs?: TabItem[];
    /** `underline` or `segmented`. `pill` is deprecated and maps to `segmented`. */
    variant?: TabsVariant | 'pill';
    /** Controlled active tab id. */
    value?: string;
    defaultValue?: string;
    /** Called with the newly selected tab id. */
    onValueChange?: (id: string) => void;
    /** @deprecated Use `onValueChange`. Removed in v2.1. */
    onChange?: (id: string) => void;
    className?: string;
    style?: CSSProperties;
}
/**
 * Underline-style tab bar for switching console views. Controlled via
 * `value` + `onValueChange`, or uncontrolled with `defaultValue`.
 */
export declare const Tabs: import("react").ForwardRefExoticComponent<TabsProps & import("react").RefAttributes<HTMLDivElement>>;
