// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Select.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
import type { SlotPropsFor } from '../lib/slot';
export interface SelectOption {
    value: string;
    label: string;
}
export type SelectSlotProps = SlotPropsFor<{
    trigger: 'button';
    label: 'label';
    hint: 'span';
}>;
export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'defaultValue' | 'onChange' | 'style'> {
    label?: string;
    hint?: string;
    options?: Array<string | SelectOption>;
    /** Controlled selected value. */
    value?: string;
    /** Uncontrolled initial value. */
    defaultValue?: string;
    /** Called with the newly selected value. */
    onValueChange?: (value: string) => void;
    /** @deprecated Use `onValueChange`. Removed in v2.1. */
    onChange?: (value: string) => void;
    /** Controlled open state of the option list. */
    open?: boolean;
    /** Uncontrolled initial open state. */
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
    name?: string;
    required?: boolean;
    /** Prop bags for inner elements (`trigger` button, `label`, `hint`). */
    slotProps?: SelectSlotProps;
    /** Root `<div>` class. */
    className?: string;
    style?: CSSProperties;
}
/** Flat select with a persimmon focus ring. */
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLButtonElement>>;
