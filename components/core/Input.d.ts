import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'style'> {
  label?: string;
  hint?: string;
  /** Render the value in JetBrains Mono — for API paths, keys, IDs. */
  mono?: boolean;
  /** Leading adornment (icon or short text). */
  prefix?: React.ReactNode;
  invalid?: boolean;
  style?: React.CSSProperties;
}

/** Compact labeled input; focus ring uses the accent. */
export function Input(props: InputProps): React.JSX.Element;
