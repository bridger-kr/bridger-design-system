// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Switch.tsx
// Regenerate: pnpm generate

import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'defaultChecked' | 'disabled' | 'id' | 'onChange' | 'style'> {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: ReactNode;
    id?: string;
    style?: CSSProperties;
}
/** Toggle switch for instant on/off settings — persimmon track when on. */
export declare function Switch({ checked, defaultChecked, onChange, disabled, label, style }: SwitchProps): import("react").JSX.Element;
export interface ToggleSwitchProps {
    readonly checked: boolean;
    readonly label: string;
    readonly onChange: (next: boolean) => void;
    readonly disabled?: boolean;
    readonly className?: string;
}
export declare function ToggleSwitch({ checked, label, onChange, disabled, className, }: ToggleSwitchProps): import("react").JSX.Element;
