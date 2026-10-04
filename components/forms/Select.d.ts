// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Select.tsx
// Regenerate: pnpm generate

import type { CSSProperties, SelectHTMLAttributes } from 'react';
export interface SelectOption {
    value: string;
    label: string;
}
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'defaultValue' | 'disabled' | 'id' | 'onChange' | 'style' | 'value'> {
    label?: string;
    hint?: string;
    options?: Array<string | SelectOption>;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
    style?: CSSProperties;
}
/** Flat native-backed select with a persimmon focus ring. */
export declare function Select({ label, hint, options, value, defaultValue, onChange, placeholder, disabled, id, style }: SelectProps): import("react").JSX.Element;
