import * as React from 'react';

export interface UsageMeterProps {
  label?: string;
  value?: number;
  max?: number;
  /** Suffix after max, e.g. "회/일". */
  unit?: string;
  hint?: string;
  style?: React.CSSProperties;
}

/**
 * Quota / usage bar — hairline track, persimmon fill escalating to warning/danger.
 * @startingPoint section="Data" subtitle="Quota usage with tabular readout" viewport="420x80"
 */
export function UsageMeter(props: UsageMeterProps): React.JSX.Element;
