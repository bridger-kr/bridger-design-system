import * as React from 'react';

export interface AlertProps {
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onDismiss?: () => void;
  style?: React.CSSProperties;
}

/** Inline alert/banner with a left accent rule — calm, recovery-oriented. */
export function Alert(props: AlertProps): React.JSX.Element;
