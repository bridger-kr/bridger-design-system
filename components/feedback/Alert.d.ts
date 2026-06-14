import * as React from 'react';

export interface AlertProps {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  motion?: 'none' | 'subtle' | 'pulse';
  className?: string;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

export function Alert(props: AlertProps): React.JSX.Element;
