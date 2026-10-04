// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Slider.tsx
// Regenerate: pnpm generate

import type { CSSProperties, InputHTMLAttributes } from 'react';
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'id' | 'max' | 'min' | 'onChange' | 'step' | 'style' | 'value'> {
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** Suffix shown after the value readout, e.g. "회/일" or "ms". */
    unit?: string;
    hint?: string;
    id?: string;
    style?: CSSProperties;
}
/**
 * Numeric range input — hairline track, persimmon fill, tabular value readout.
 * @startingPoint section="Forms" subtitle="Numeric range with tabular readout" viewport="420x90"
 */
export declare function Slider({ label, min, max, step, value, defaultValue, onChange, unit, hint, id, style, }: SliderProps): import("react").JSX.Element;
