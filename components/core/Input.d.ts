// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Input.tsx
// Regenerate: pnpm generate

import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
import type { SlotPropsFor } from '../lib/slot';
export type InputSlotProps = SlotPropsFor<{
    input: 'input';
    label: 'label';
    hint: 'span';
    prefix: 'span';
}>;
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'prefix' | 'style'> {
    label?: string;
    hint?: string;
    /** Render the value in the mono stack (ASCII: API paths, keys, IDs). */
    mono?: boolean;
    /** Leading adornment (icon or short text). */
    prefix?: ReactNode;
    invalid?: boolean;
    /** Root `<div>` class. Style the inner control via `slotProps.input`. */
    className?: string;
    /** Root `<div>` style. Style the inner control via `slotProps.input`. */
    style?: CSSProperties;
    /** Prop bags for inner elements (`input`, `label`, `hint`, `prefix`). */
    slotProps?: InputSlotProps;
}
/**
 * Compact labeled input, paired with a label or table context. Supports a
 * mono variant for API paths / keys / IDs.
 *
 * `className`/`style` apply to the root wrapper; reach the inner `<input>`
 * through `slotProps.input`. The control id defaults to `useId()` so repeated
 * labels never collide.
 */
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
