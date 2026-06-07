import * as React from 'react';

export interface SpinnerProps {
  size?: number;
  stroke?: number;
  color?: string;
  style?: React.CSSProperties;
}

/** Indeterminate spinner — persimmon arc on a faint track. */
export function Spinner(props: SpinnerProps): React.JSX.Element;
