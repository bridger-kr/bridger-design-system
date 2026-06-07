import * as React from 'react';

export interface TooltipProps {
  label: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

/** Hover/focus tooltip — dark label, wraps a single trigger. */
export function Tooltip(props: TooltipProps): React.JSX.Element;
