// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Switch.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface SwitchProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'className' | 'defaultChecked' | 'onChange' | 'style'> {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: ReactNode;
    id?: string;
    name?: string;
    /** Value submitted with the form when the switch is off. */
    uncheckedValue?: string;
    required?: boolean;
    /** Root `<label>`/`<button>` class. */
    className?: string;
    style?: CSSProperties;
}
/** Toggle switch for instant on/off settings — persimmon track when on. */
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface ToggleSwitchProps {
    readonly checked: boolean;
    readonly label: string;
    readonly onChange: (next: boolean) => void;
    readonly disabled?: boolean;
    readonly className?: string;
    readonly style?: CSSProperties;
}
/** @deprecated Alias of `Switch` kept for one minor cycle; prefer `Switch`. */
export declare const ToggleSwitch: import("react").ForwardRefExoticComponent<ToggleSwitchProps & import("react").RefAttributes<HTMLButtonElement>>;
