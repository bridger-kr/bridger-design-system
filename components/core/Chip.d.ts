// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Chip.tsx
// Regenerate: pnpm generate

import type { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
export type ChipTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
/** @deprecated Use `ChipTone` — `variant` on Chip is now `tone`. Removed in v2.1. */
export type ChipVariant = ChipTone;
export type ChipSize = 'sm' | 'md';
interface ChipVisualProps {
    /** Semantic color of the chip. */
    readonly tone?: ChipTone;
    /** @deprecated Use `tone`. Removed in v2.1. */
    readonly variant?: ChipVariant;
    readonly size?: ChipSize;
    readonly children?: ReactNode;
}
export interface StaticChipProps extends ChipVisualProps, Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'onClick'> {
    readonly onClick?: never;
    readonly disabled?: never;
}
export interface ActionChipProps extends ChipVisualProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> {
    readonly onClick: MouseEventHandler<HTMLButtonElement>;
    readonly type?: 'button' | 'submit' | 'reset';
}
export type ChipProps = StaticChipProps | ActionChipProps;
/**
 * Compact classification tag. Supplying `onClick` creates a native button with
 * keyboard, focus, and disabled behavior; omit it for a non-actionable span.
 */
export declare const Chip: import("react").ForwardRefExoticComponent<ChipProps & import("react").RefAttributes<HTMLSpanElement | HTMLButtonElement>>;
export {};
