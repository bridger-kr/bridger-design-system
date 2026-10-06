// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Textarea.tsx
// Regenerate: pnpm generate

import type { CSSProperties, TextareaHTMLAttributes } from 'react';
import type { SlotPropsFor } from '../lib/slot';
export type TextareaSlotProps = SlotPropsFor<{
    textarea: 'textarea';
    label: 'label';
    hint: 'span';
}>;
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'style'> {
    label?: string;
    hint?: string;
    rows?: number;
    /** Render in the mono stack (ASCII: JSON, payloads). */
    mono?: boolean;
    /** Root `<div>` class. Style the inner `<textarea>` via `slotProps.textarea`. */
    className?: string;
    /** Root `<div>` style. */
    style?: CSSProperties;
    /** Prop bags for inner elements (`textarea`, `label`, `hint`). */
    slotProps?: TextareaSlotProps;
}
/** Multi-line text field with a persimmon focus ring. */
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
