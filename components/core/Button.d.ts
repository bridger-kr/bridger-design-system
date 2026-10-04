// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Button.tsx
// Regenerate: pnpm generate

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
export declare const BUTTON_VARIANT: {
    readonly Primary: "primary";
    readonly Secondary: "secondary";
    readonly Ghost: "ghost";
    readonly Danger: "danger";
};
export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];
export declare const BUTTON_SIZE: {
    readonly Small: "sm";
    readonly Medium: "md";
    readonly Large: "lg";
};
export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    children?: ReactNode;
    /** primary = strongest action; secondary = regular; ghost = low emphasis; danger = destructive action. */
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Lucide icon element placed before the label. */
    icon?: ReactNode;
    /** Lucide icon element placed after the label. */
    iconRight?: ReactNode;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    style?: CSSProperties;
}
/**
 * Bridger button. Primary is the single strongest action per screen;
 * secondary for regular actions; ghost for low-emphasis commands; danger for destructive actions.
 *
 * The one strongest action per screen uses the ink-filled primary variant.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost / danger actions" viewport="700x140"
 */
export declare function Button({ children, variant, size, icon, iconRight, disabled, type, onClick, className, style, ...rest }: ButtonProps): import("react").JSX.Element;
