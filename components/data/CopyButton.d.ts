// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/CopyButton.tsx
// Regenerate: pnpm generate

import type { ButtonHTMLAttributes, ReactNode } from 'react';
export type CopyButtonState = 'idle' | 'copied' | 'failed';
export type CopyButtonResult = Exclude<CopyButtonState, 'idle'>;
type CopyButtonBase = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onCopy' | 'type' | 'value'> & {
    /** Text to write to the clipboard. A function is evaluated on click. */
    value: string | (() => string);
    /** Idle-state label. */
    label?: ReactNode;
    /** Label after a successful copy; also announced via the live region. */
    copiedLabel?: ReactNode;
    /** Label after a failed copy; also announced via the live region. */
    failedLabel?: ReactNode;
    /** Called with the copy outcome after every activation. */
    onCopy?: (result: CopyButtonResult) => void;
};
/**
 * Copy-to-clipboard button with an announced result state. The outcome is
 * reported three ways — icon swap, label text, and a `role="status"` live
 * region — so success or failure never depends on color or icon alone
 * (DESIGN.md §8). An icon-only button has no visible text, so `aria-label`
 * is required at the type level.
 */
export type CopyButtonProps = CopyButtonBase & ({
    iconOnly?: false;
    'aria-label'?: string;
} | {
    iconOnly: true;
    'aria-label': string;
});
export declare const CopyButton: import("react").ForwardRefExoticComponent<CopyButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export {};
