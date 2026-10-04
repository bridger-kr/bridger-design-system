// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Checkbox.tsx
// Regenerate: pnpm generate

import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'defaultChecked' | 'disabled' | 'id' | 'label' | 'onChange' | 'style'> {
    label?: ReactNode;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    id?: string;
    style?: CSSProperties;
}
/** Checkbox — persimmon fill when checked. */
export declare function Checkbox({ label, checked, defaultChecked, onChange, disabled, id, style }: CheckboxProps): import("react").JSX.Element;
