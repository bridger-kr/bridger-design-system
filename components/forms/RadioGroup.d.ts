// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/RadioGroup.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
export interface RadioOption {
    value: string;
    label: string;
    hint?: string;
}
export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'style'> {
    name?: string;
    options?: Array<string | RadioOption>;
    value?: string;
    defaultValue?: string;
    /** Called with the newly selected value. */
    onValueChange?: (value: string) => void;
    /** @deprecated Use `onValueChange`. Removed in v2.1. */
    onChange?: (value: string) => void;
    disabled?: boolean;
    style?: CSSProperties;
}
/** Radio group with optional per-option hint text. */
export declare const RadioGroup: import("react").ForwardRefExoticComponent<RadioGroupProps & import("react").RefAttributes<HTMLDivElement>>;
