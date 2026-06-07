import * as React from 'react';

export interface ToastProps {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  message?: React.ReactNode;
  action?: React.ReactNode;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

/** Floating toast card with a status dot. Place in a fixed corner stack. */
export function Toast(props: ToastProps): React.JSX.Element;
