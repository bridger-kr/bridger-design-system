import * as React from 'react';

export interface DrawerProps {
  open?: boolean;
  side?: 'right' | 'left';
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: number;
  style?: React.CSSProperties;
}

/**
 * Side sheet over a scrim for secondary flows — floats (shadow) but stays flat inside.
 * Render inside a positioned container (the panel fills its height).
 * @startingPoint section="Feedback" subtitle="Side sheet over a scrim" viewport="560x420"
 */
export function Drawer(props: DrawerProps): React.JSX.Element;
