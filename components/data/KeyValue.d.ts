import * as React from 'react';

export interface KeyValueItem {
  key: string;
  value: React.ReactNode;
  /** Render the value in JetBrains Mono (paths, IDs, methods). */
  mono?: boolean;
  /** Tint the value persimmon (highlighted field). */
  accent?: boolean;
}
export interface KeyValueProps {
  items: KeyValueItem[];
  /** 1 = stacked rows, 2 = two-up grid. */
  columns?: 1 | 2;
  style?: React.CSSProperties;
}

/**
 * Definition list for spec metadata — hairline rows, muted key, ink value.
 * @startingPoint section="Data" subtitle="Spec metadata as a definition list" viewport="460x220"
 */
export function KeyValue(props: KeyValueProps): React.JSX.Element;
