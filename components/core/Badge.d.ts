import * as React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  /** Semantic tone. info/success/warning/danger are status-only. */
  tone?: 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
  /** Show a leading status dot in the current tone color. */
  dot?: boolean;
  style?: React.CSSProperties;
}

/** Status or classification badge — never decorative. */
export function Badge(props: BadgeProps): React.JSX.Element;
