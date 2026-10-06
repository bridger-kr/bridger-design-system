// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/SegmentedControl.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
export interface SegmentOption {
    value: string;
    label: string;
}
export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'style'> {
    options?: Array<string | SegmentOption>;
    value?: string;
    defaultValue?: string;
    /** Called with the newly selected value. */
    onValueChange?: (value: string) => void;
    /** @deprecated Use `onValueChange`. Removed in v2.1. */
    onChange?: (value: string) => void;
    size?: 'sm' | 'md';
    style?: CSSProperties;
}
/** Inset segmented control for 2–4 short, exclusive options. */
export declare const SegmentedControl: import("react").ForwardRefExoticComponent<SegmentedControlProps & import("react").RefAttributes<HTMLDivElement>>;
