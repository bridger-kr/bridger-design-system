import * as React from 'react';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}

/** Toggle switch for instant on/off settings — persimmon track when on. */
export function Switch(props: SwitchProps): React.JSX.Element;
