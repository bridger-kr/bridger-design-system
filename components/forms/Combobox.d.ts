// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Combobox.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
import type { SlotPropsFor } from '../lib/slot';
export interface ComboboxOption {
    value: string;
    label: string;
    meta?: string;
}
export type ComboboxSlotProps = SlotPropsFor<{
    input: 'input';
    label: 'label';
    hint: 'span';
}>;
export interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'id' | 'onChange' | 'style'> {
    label?: string;
    hint?: string;
    options?: ComboboxOption[];
    /** Controlled selected option value. */
    value?: string;
    /** Uncontrolled initial selected option value. */
    defaultValue?: string;
    /** Called with the selected option's value. */
    onValueChange?: (value: string) => void;
    /** @deprecated Use `onValueChange`. Removed in v2.1. */
    onChange?: (value: string) => void;
    /** Controlled open state of the option list. */
    open?: boolean;
    /** Uncontrolled initial open state. */
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    emptyText?: string;
    id?: string;
    /** Prop bags for inner elements (`input`, `label`, `hint`). */
    slotProps?: ComboboxSlotProps;
    style?: CSSProperties;
}
/**
 * Searchable select for large option sets (the 230+ public-data API catalog).
 * Hairline field; the listbox is a bordered plane. Filters on label + meta.
 * Controlled via `value`/`onValueChange` and `open`/`onOpenChange`, or
 * uncontrolled with `defaultValue`/`defaultOpen`.
 * @startingPoint section="Forms" subtitle="Searchable select over a large catalog" viewport="460x320"
 */
export declare const Combobox: import("react").ForwardRefExoticComponent<ComboboxProps & import("react").RefAttributes<HTMLInputElement>>;
