import * as React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = the one strongest action; secondary = regular; ghost = low-emphasis. */
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon element placed before the label. */
  icon?: React.ReactNode;
  /** Lucide icon element placed after the label. */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

/**
 * The one strongest action per screen uses variant="primary" (persimmon).
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost actions" viewport="700x140"
 */
export function Button(props: ButtonProps): React.JSX.Element;
