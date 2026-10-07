// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/ConsoleShell.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import type { SidebarItem, SidebarSection } from './Sidebar';
export interface ConsoleShellBanner {
    /** Banner body — keep to a single line plus an optional action. */
    content: ReactNode;
    /**
     * Severity controls stacking order (critical first) and live-region
     * semantics: critical announces assertively, the rest politely.
     */
    tone?: 'critical' | 'warning' | 'info';
}
export type ConsoleWorkspaceStatus = 'idle' | 'pending' | 'success' | 'error';
export interface ConsoleShellProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Console name rendered beside the logo and used as the drawer title. */
    productName: string;
    logo?: ReactNode;
    navigation?: SidebarSection[];
    /**
     * Active route id — matched against each nav item's `href`. A change after
     * mount moves focus to the main heading so route transitions announce.
     */
    activeRoute?: string;
    accountMenu?: ReactNode;
    workspaceSwitcher?: ReactNode;
    /** Workspace-switch lifecycle; renders the localized status line and keeps
     * the previous context visible on error. */
    workspaceStatus?: ConsoleWorkspaceStatus;
    /** Extra workspace slot (retry button, scope note) beside the status line. */
    workspaceNotice?: ReactNode;
    globalActions?: ReactNode;
    help?: ReactNode;
    /**
     * Status banners stacked above the content column, ordered by `tone`
     * (critical → warning → info) regardless of array order.
     */
    banners?: ConsoleShellBanner[];
    /** px width under which the rail is replaced by a modal drawer. Default 768. */
    mobileBreakpoint?: number;
    /** Intercept nav clicks for client-side routers; modifier clicks pass through. */
    onNavigate?: (event: MouseEvent<HTMLAnchorElement>, item: SidebarItem) => void;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    /** Show the desktop collapse toggle in the rail footer. Default true. */
    collapsible?: boolean;
    /** id on the content <main>; also the skip-link target. */
    mainId?: string;
    /** Landmark label for the navigation rail/drawer. */
    navLabel?: string;
    /** Marks the content region while a route is resolving (≤140ms opacity). */
    routePending?: boolean;
    children?: ReactNode;
}
/**
 * Console application frame — navigation rail (or modal drawer on narrow
 * screens), topbar slots, status banners, skip link, and the content region.
 * Route consumers only supply slots; the shell owns focus order, drawer
 * dismissal on route select, and landmark semantics.
 * @startingPoint section="Navigation" subtitle="Console app shell" viewport="960x540"
 */
export declare const ConsoleShell: import("react").ForwardRefExoticComponent<ConsoleShellProps & import("react").RefAttributes<HTMLDivElement>>;
