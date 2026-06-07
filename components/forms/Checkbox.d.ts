import * as React from 'react';

export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

/** Checkbox — persimmon fill when checked. */
export function Checkbox(props: CheckboxProps): React.JSX.Element;
