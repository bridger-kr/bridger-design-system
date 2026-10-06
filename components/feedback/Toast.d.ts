// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Toast.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
declare const DOT: {
    info: string;
    success: string;
    warning: string;
    danger: string;
};
export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    tone?: keyof typeof DOT;
    title?: ReactNode;
    message?: ReactNode;
    action?: ReactNode;
    onDismiss?: () => void;
    style?: CSSProperties;
}
export declare const Toast: import("react").ForwardRefExoticComponent<ToastProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
