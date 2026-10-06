// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Heading.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
import type { TextTone } from './Text';
/**
 * Display-range type scale (DESIGN.md §4.3). `level` is the semantic heading
 * rank; `size` is the visual step. Omit `size` to take the step paired with
 * the level — decoupling exists for documented exceptions only, never to skip
 * heading levels for a visual size (§8).
 */
export declare const HEADING_SIZE: {
    readonly H1: 36;
    readonly H2: 28;
    readonly H3: 20;
};
export type HeadingSize = (typeof HEADING_SIZE)[keyof typeof HEADING_SIZE];
export type HeadingLevel = 1 | 2 | 3 | 4;
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children?: ReactNode;
    /** Semantic rank (`<h1>`–`<h4>`). Required so the choice is deliberate. */
    level: HeadingLevel;
    /** Visual scale step. Defaults to the step paired with `level`. */
    size?: HeadingSize;
    /** Text color role. Defaults to the strong heading ink. */
    tone?: TextTone;
}
/**
 * Real heading on the fixed display scale. Weight stays at 600 (the v2
 * display cap); negative tracking applies only to the H1/H2 steps.
 */
export declare const Heading: import("react").ForwardRefExoticComponent<HeadingProps & import("react").RefAttributes<HTMLHeadingElement>>;
