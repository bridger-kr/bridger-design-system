// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Slider.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
import type { SlotPropsFor } from '../lib/slot';
export type SliderSlotProps = SlotPropsFor<{
    label: 'label';
    hint: 'span';
}>;
export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'defaultValue' | 'onChange' | 'style'> {
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    defaultValue?: number;
    /** Called with the newly selected value. */
    onValueChange?: (value: number) => void;
    /** @deprecated Use `onValueChange`. Removed in v2.1. */
    onChange?: (value: number) => void;
    /** Suffix shown after the value readout, e.g. "회/일" or "ms". */
    unit?: string;
    hint?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
    /** Prop bags for inner elements (`label`, `hint`). */
    slotProps?: SliderSlotProps;
    /** Root element class. */
    className?: string;
    style?: CSSProperties;
}
/**
 * Numeric range input — hairline track, persimmon fill, tabular value readout.
 * @startingPoint section="Forms" subtitle="Numeric range with tabular readout" viewport="420x90"
 */
export declare const Slider: import("react").ForwardRefExoticComponent<SliderProps & import("react").RefAttributes<HTMLDivElement>>;
