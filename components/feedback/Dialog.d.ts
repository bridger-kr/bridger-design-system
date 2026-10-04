// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Dialog.tsx
// Regenerate: pnpm generate

import type { ReactNode } from 'react';
export interface DialogProps {
    open: boolean;
    onClose?: () => void;
    title?: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    'aria-label'?: string;
    width?: number;
}
/** Modal dialog with overlay, Esc/backdrop close, and a footer action bar. */
export declare function Dialog({ open, onClose, title, description, children, footer, 'aria-label': ariaLabel, width }: DialogProps): import("react").JSX.Element;
