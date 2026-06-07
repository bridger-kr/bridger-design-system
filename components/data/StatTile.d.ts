import * as React from 'react';

export interface StatTileProps {
  label: React.ReactNode;
  value: React.ReactNode;
  /** e.g. "+8.4%". */
  delta?: React.ReactNode;
  deltaTone?: 'up' | 'down' | 'neutral';
  hint?: React.ReactNode;
  style?: React.CSSProperties;
}

/** KPI metric tile — label, tabular value, optional delta. */
export function StatTile(props: StatTileProps): React.JSX.Element;
