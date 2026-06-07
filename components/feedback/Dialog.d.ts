import * as React from 'react';

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Footer actions (right-aligned), usually Buttons. */
  footer?: React.ReactNode;
  width?: number;
}

/** Modal dialog with overlay, Esc/backdrop close, and a footer action bar. */
export function Dialog(props: DialogProps): React.JSX.Element | null;
