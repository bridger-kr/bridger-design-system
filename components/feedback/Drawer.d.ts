// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Drawer.tsx
// Regenerate: pnpm generate

import type { CSSProperties, ReactNode } from 'react';
export interface DrawerProps {
    open?: boolean;
    side?: 'right' | 'left';
    title?: string;
    children?: ReactNode;
    footer?: ReactNode;
    onClose?: () => void;
    width?: number;
    style?: CSSProperties;
    'aria-label'?: string;
}
/**
 * Side sheet over a scrim for secondary flows — floats (shadow) but stays flat inside.
 * Render inside a positioned container (the panel fills its height).
 * @startingPoint section="Feedback" subtitle="Side sheet over a scrim" viewport="560x420"
 */
export declare function Drawer({ open, side, title, children, footer, onClose, width, style, 'aria-label': ariaLabel }: DrawerProps): import("react").JSX.Element;
