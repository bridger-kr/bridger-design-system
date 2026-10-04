// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Chip.tsx
// Regenerate: pnpm generate

import type { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactElement, ReactNode } from 'react';
export type ChipVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
export type ChipSize = 'sm' | 'md';
interface ChipVisualProps {
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
export declare function Chip(props: ChipProps): ReactElement;
export {};
