// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Button.tsx
// Regenerate: pnpm generate

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { useRender } from '@base-ui/react/use-render';
export declare const BUTTON_VARIANT: {
    readonly Solid: "solid";
    readonly Outline: "outline";
    readonly Ghost: "ghost";
    /** @deprecated Use `BUTTON_VARIANT.Solid`. Removed in v2.1. */
    readonly Primary: "primary";
    /** @deprecated Use `BUTTON_VARIANT.Outline`. Removed in v2.1. */
    readonly Secondary: "secondary";
    /** @deprecated Use `variant={BUTTON_VARIANT.Solid}` + `tone="danger"`. Removed in v2.1. */
    readonly Danger: "danger";
};
export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];
export declare const BUTTON_TONE: {
    readonly Neutral: "neutral";
    readonly Danger: "danger";
};
export type ButtonTone = (typeof BUTTON_TONE)[keyof typeof BUTTON_TONE];
export declare const BUTTON_SIZE: {
    readonly Small: "sm";
    readonly Medium: "md";
    readonly Large: "lg";
};
export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];
type ButtonBase = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    /**
     * Visual shape/emphasis. `solid` = strongest action, `outline` = regular,
     * `ghost` = low emphasis. `primary`/`secondary`/`danger` are deprecated
     * aliases and will be removed in v2.1.
     */
    variant?: ButtonVariant;
    /** Semantic color intent. `danger` marks destructive actions. */
    tone?: ButtonTone;
    size?: ButtonSize;
    disabled?: boolean;
    /**
     * Processing state: label stays rendered (width preserved), a centered
     * spinner overlays it, `aria-busy` is set, and the button ignores
     * activations so a mutation cannot be submitted twice.
     */
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    /**
     * Replace the rendered element (base-ui `useRender` contract), e.g.
     * `<Button render={<a href="/pricing" />}>요금</Button>`.
     */
    render?: useRender.RenderProp;
    style?: CSSProperties;
};
/**
 * Labeled button, or an icon-only button. An icon-only button has no visible
 * text, so `aria-label` is required at the type level (DESIGN.md §6/§8).
 */
export type ButtonProps = (ButtonBase & {
    children: ReactNode;
    /** Lucide icon element placed before the label. */
    icon?: ReactNode;
    /** Lucide icon element placed after the label. */
    iconRight?: ReactNode;
}) | (ButtonBase & {
    children?: never;
    'aria-label': string;
} & ({
    icon: ReactNode;
    iconRight?: ReactNode;
} | {
    icon?: ReactNode;
    iconRight: ReactNode;
}));
/**
 * Bridger button. `solid` is the single strongest action per surface;
 * `outline` for regular actions; `ghost` for low-emphasis commands;
 * `tone="danger"` marks a destructive action.
 * @startingPoint section="Core" subtitle="Solid / outline / ghost, neutral / danger" viewport="700x140"
 */
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export {};
