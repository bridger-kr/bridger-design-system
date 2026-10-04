// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/Sidebar.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface SidebarItem {
    label: string;
    icon?: ReactNode;
    href?: string;
    active?: boolean;
    /** Trailing count (e.g. tool count), rendered tabular-mono. */
    badge?: ReactNode;
}
export interface SidebarSection {
    heading?: string;
    items: SidebarItem[];
}
export interface SidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    /** Brand block for the header (e.g. <BrandLogo/>). */
    brand?: ReactNode;
    sections?: SidebarSection[];
    footer?: ReactNode;
    width?: number;
    style?: CSSProperties;
}
/**
 * Console primary nav — flat column, active item marked by a persimmon left bar.
 * @startingPoint section="Navigation" subtitle="Console nav rail" viewport="260x440"
 */
export declare function Sidebar({ brand, sections, footer, width, className, style, ...rest }: SidebarProps): import("react").JSX.Element;
