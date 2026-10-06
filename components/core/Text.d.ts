// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Text.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
/**
 * Fixed v2 type scale for body-range text (DESIGN.md §4.3): no size outside
 * these four steps is permitted. `Heading` owns the 20/28/36 display steps.
 */
export declare const TEXT_SIZE: {
    readonly Caption: 12;
    readonly Small: 13;
    readonly Label: 14;
    readonly Body: 16;
};
export type TextSize = (typeof TEXT_SIZE)[keyof typeof TEXT_SIZE];
export declare const TEXT_TONE: {
    readonly Default: "default";
    readonly Muted: "muted";
    readonly Accent: "accent";
    readonly Danger: "danger";
};
export type TextTone = (typeof TEXT_TONE)[keyof typeof TEXT_TONE];
export declare const TEXT_WEIGHT: {
    readonly Regular: 400;
    readonly Medium: 500;
    readonly Semibold: 600;
};
export type TextWeight = (typeof TEXT_WEIGHT)[keyof typeof TEXT_WEIGHT];
export interface TextProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    /** Type-scale step. Defaults to the 16px body step. */
    size?: TextSize;
    weight?: TextWeight;
    /** Text color role. `accent`/`danger` are status-only, never decorative. */
    tone?: TextTone;
    /** Rendered element. `span` keeps the text valid inside controls. */
    as?: 'p' | 'span' | 'div';
}
/**
 * Scale-locked body text. Enforces the 12/13/14/16 scale and the four text
 * roles so app code cannot reintroduce off-scale sizes or one-off colors
 * (EDD-231). Use `Heading` for real headings — this primitive never renders
 * a heading element.
 */
export declare const Text: import("react").ForwardRefExoticComponent<TextProps & import("react").RefAttributes<HTMLElement>>;
