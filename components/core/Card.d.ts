import * as React from 'react';

export const CardTone: {
  readonly Default: 'default';
  readonly Muted: 'muted';
  readonly Raised: 'raised';
  readonly Panel: 'panel';
};

export type CardTone = (typeof CardTone)[keyof typeof CardTone];

export interface CardProps {
  children?: React.ReactNode;
  variant?: CardTone;
  tone?: CardTone;
  interactive?: boolean;
  className?: string;
  padding?: number;
  style?: React.CSSProperties;
}

export function Card(props: CardProps): React.JSX.Element;
