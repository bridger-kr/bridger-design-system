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
    onChange?: (value: string) => void;
    disabled?: boolean;
    style?: CSSProperties;
}
/** Radio group with optional per-option hint text. */
export declare function RadioGroup({ name, options, value, defaultValue, onChange, disabled, style }: RadioGroupProps): import("react").JSX.Element;
