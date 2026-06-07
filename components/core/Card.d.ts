import * as React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  /** default = surface + subtle shadow; muted = sunken well; raised = elevated; panel = flat console panel. */
  variant?: 'default' | 'muted' | 'raised' | 'panel';
  /** Strengthen border + lift surface on hover (for clickable rows/cards). */
  interactive?: boolean;
  padding?: number;
  style?: React.CSSProperties;
}

/** Framed surface for repeated items, modals, and tools. */
export function Card(props: CardProps): React.JSX.Element;
