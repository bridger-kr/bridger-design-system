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
export interface TabsProps {
    tabs?: TabItem[];
    variant?: 'underline' | 'pill';
    /** Controlled active tab id. */
    value?: string;
    defaultValue?: string;
    onChange?: (id: string) => void;
    style?: CSSProperties;
}
/**
 * Underline-style tab bar for switching console views. Controlled via
 * `value` + `onChange`, or uncontrolled with `defaultValue`.
 */
export declare function Tabs({ tabs, variant, value, defaultValue, onChange, style }: TabsProps): import("react").JSX.Element;
