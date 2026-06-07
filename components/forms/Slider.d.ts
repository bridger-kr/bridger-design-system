import * as React from 'react';

export interface SliderProps {
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
  style?: React.CSSProperties;
}

/**
 * Numeric range input — hairline track, persimmon fill, tabular value readout.
 * @startingPoint section="Forms" subtitle="Numeric range with tabular readout" viewport="420x90"
 */
export function Slider(props: SliderProps): React.JSX.Element;
