import * as React from 'react';

export interface RadioOption { value: string; label: string; hint?: string; }
export interface RadioGroupProps {
  name?: string;
  options: Array<string | RadioOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Radio group with optional per-option hint text. */
export function RadioGroup(props: RadioGroupProps): React.JSX.Element;
