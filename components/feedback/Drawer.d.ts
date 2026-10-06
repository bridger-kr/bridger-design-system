// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Drawer.tsx
// Regenerate: pnpm generate

import type { CSSProperties, ReactNode } from 'react';
export interface DrawerProps {
    /** Controlled open state. */
    open?: boolean;
    /** Uncontrolled initial open state. */
    defaultOpen?: boolean;
    /** Called whenever the drawer requests an open-state change (Esc, backdrop, close button). */
    onOpenChange?: (open: boolean) => void;
    side?: 'right' | 'left';
    title?: string;
    children?: ReactNode;
    footer?: ReactNode;
    /** @deprecated Use `onOpenChange`. Called only when the drawer closes. Removed in v2.1. */
    onClose?: () => void;
    width?: number;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
}
/**
 * Side sheet over a scrim for secondary flows — floats (shadow) but stays flat inside.
 * Render inside a positioned container (the panel fills its height).
 * @startingPoint section="Feedback" subtitle="Side sheet over a scrim" viewport="560x420"
 */
export declare const Drawer: import("react").ForwardRefExoticComponent<DrawerProps & import("react").RefAttributes<HTMLElement>>;
