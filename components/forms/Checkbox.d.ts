// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Checkbox.tsx
// Regenerate: pnpm generate

import type { ComponentPropsWithRef, CSSProperties, DOMAttributes, InputHTMLAttributes, ReactNode } from 'react';
import type { SlotPropsFor } from '../lib/slot';
export type CheckboxSlotProps = SlotPropsFor<{
    root: 'label';
    label: 'span';
}> & {
    /** Extra props for the control button. Event handlers are intentionally not
     * part of this bag — use the top-level `onChange`. */
    control?: Omit<ComponentPropsWithRef<'button'>, keyof DOMAttributes<HTMLButtonElement> | 'value'> & {
        value?: string;
    };
};
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'className' | 'defaultChecked' | 'disabled' | 'id' | 'label' | 'onChange' | 'style' | 'value'> {
    label?: ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
    /** Value submitted with the form when checked. */
    value?: string;
    /** Root `<label>` class. Reach the control via `slotProps.control`. */
    className?: string;
    /** Root `<label>` style. */
    style?: CSSProperties;
    /** Prop bags for inner elements (`root` label, `control` button, `label` text). */
    slotProps?: CheckboxSlotProps;
}
/** Checkbox — persimmon fill when checked. */
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLButtonElement>>;
