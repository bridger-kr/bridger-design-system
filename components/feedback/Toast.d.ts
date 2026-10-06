// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Toast.tsx
// Regenerate: pnpm generate

import { Toast as BaseToast } from '@base-ui/react/toast';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
declare const DOT: {
    info: string;
    success: string;
    warning: string;
    danger: string;
};
export type ToastTone = keyof typeof DOT;
export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    tone?: ToastTone;
    title?: ReactNode;
    message?: ReactNode;
    action?: ReactNode;
    onDismiss?: () => void;
    /** Accessible name for the dismiss button; defaults to the ambient locale. */
    closeLabel?: string;
    style?: CSSProperties;
}
export declare const Toast: import("react").ForwardRefExoticComponent<ToastProps & import("react").RefAttributes<HTMLDivElement>>;
interface ToastData {
    action?: ReactNode;
}
export interface ToastPushOptions {
    /** Re-adding an existing id updates the toast and resets its timer. */
    id?: string;
    tone?: ToastTone;
    title?: ReactNode;
    message?: ReactNode;
    /** Auto-dismiss delay in ms; 0 pins the toast. Defaults to the provider timeout. */
    timeout?: number;
    /** 'high' announces urgently; 'low' (default) announces politely. */
    priority?: 'low' | 'high';
    action?: ReactNode;
    onClose?: () => void;
}
export interface UseToastReturn {
    toasts: BaseToast.Root.ToastObject<ToastData>[];
    push: (options: ToastPushOptions | string) => string;
    dismiss: (toastId?: string) => void;
}
/**
 * Queued toast API. Must be called inside `<ToastProvider>`.
 * `push` returns the toast id; `dismiss()` without an id closes the newest.
 */
export declare function useToast(): UseToastReturn;
export interface ToastProviderProps {
    children?: ReactNode;
    /** Auto-dismiss delay in ms. Default 5000; 0 disables auto-dismiss. */
    timeout?: number;
    /** Maximum toasts shown at once; older toasts queue. Default 3. */
    limit?: number;
}
/**
 * Toast host — owns the queue, the 5s auto-dismiss timer, and the fixed
 * viewport at `--dt-z-index-toast`. Queued toasts are announced through Base
 * UI's live region; mount once near the app root.
 */
export declare function ToastProvider({ children, timeout, limit }: ToastProviderProps): import("react").JSX.Element;
export {};
