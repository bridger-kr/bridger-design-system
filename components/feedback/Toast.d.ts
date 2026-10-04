// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Toast.tsx
// Regenerate: pnpm generate

import type { CSSProperties, ReactNode } from 'react';
declare const DOT: {
    info: string;
    success: string;
    warning: string;
    danger: string;
};
export interface ToastProps {
    tone?: keyof typeof DOT;
    title?: ReactNode;
    message?: ReactNode;
    action?: ReactNode;
    onDismiss?: () => void;
    style?: CSSProperties;
}
export declare function Toast({ tone, title, message, action, onDismiss, style }: ToastProps): import("react").JSX.Element;
export {};
