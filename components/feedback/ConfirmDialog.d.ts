// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/ConfirmDialog.tsx
// Regenerate: pnpm generate

import type { ReactNode } from 'react';
export interface ConfirmDialogProps {
    open: boolean;
    /** Called on cancel, escape, or scrim click. */
    onClose?: () => void;
    /** Called when the confirm action activates; the dialog then closes. */
    onConfirm?: () => void;
    /** Question or command naming the action, e.g. "Delete this key?". */
    title?: ReactNode;
    /** The resource acted on — rendered in mono so the target is unmistakable. */
    target?: ReactNode;
    /** What happens on confirm; pair with `target` for destructive actions. */
    impact?: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
    /** Destructive variant: persimmon → danger confirm button, Delete default. */
    danger?: boolean;
    /**
     * Async-confirm in progress: the confirm button shows a spinner, ignores
     * repeat activations, and the dialog stays open until the consumer flips
     * `pending` back (and closes it) or the user cancels — cancel stays safe.
     */
    pending?: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    width?: number;
}
/**
 * Confirmation dialog built on Base UI AlertDialog — flat translucent scrim,
 * bordered popup with a single overlay shadow (Kumo elevation), focus held
 * inside until the user answers. For destructive actions pass `danger` plus
 * `target`/`impact` so the consequence is named before the button.
 */
export declare function ConfirmDialog({ open, onClose, onConfirm, title, target, impact, description, children, danger, pending, confirmLabel, cancelLabel, width, }: ConfirmDialogProps): import("react").JSX.Element;
