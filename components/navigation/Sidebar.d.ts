// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/Sidebar.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, MouseEvent, ReactNode } from 'react';
export interface SidebarItem {
    label: string;
    icon?: ReactNode;
    href?: string;
    active?: boolean;
    /** Trailing count (e.g. tool count), rendered tabular-mono. */
    badge?: ReactNode;
    /** Opens in a new tab with noreferrer semantics (e.g. a sibling console host). */
    external?: boolean;
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
    /**
     * Icon-only rail: labels stay in the accessibility tree and each item gets
     * a native `title` tooltip so the collapsed rail still names destinations.
     */
    collapsed?: boolean;
    /**
     * Called when an item is activated. Apps with client-side routers use this
     * to intercept plain clicks (modifier/middle clicks still open natively).
     */
    onNavigate?: (event: MouseEvent<HTMLAnchorElement>, item: SidebarItem) => void;
    style?: CSSProperties;
}
/**
 * Console primary nav — flat column, active item marked by a sunken row.
 * @startingPoint section="Navigation" subtitle="Console nav rail" viewport="260x440"
 */
export declare const Sidebar: import("react").ForwardRefExoticComponent<SidebarProps & import("react").RefAttributes<HTMLElement>>;
