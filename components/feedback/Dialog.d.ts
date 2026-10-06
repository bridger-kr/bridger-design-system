// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Dialog.tsx
// Regenerate: pnpm generate

import type { CSSProperties, ReactNode } from 'react';
export interface DialogProps {
    /** Controlled open state. */
    open?: boolean;
    /** Uncontrolled initial open state. */
    defaultOpen?: boolean;
    /** Called whenever the dialog requests an open-state change (Esc, backdrop, close button). */
    onOpenChange?: (open: boolean) => void;
    /** @deprecated Use `onOpenChange`. Called only when the dialog closes. Removed in v2.1. */
    onClose?: () => void;
    title?: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    'aria-label'?: string;
    width?: number;
    className?: string;
    style?: CSSProperties;
}
/** Modal dialog with overlay, Esc/backdrop close, and a footer action bar. */
export declare const Dialog: import("react").ForwardRefExoticComponent<DialogProps & import("react").RefAttributes<HTMLDivElement>>;
