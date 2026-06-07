import * as React from 'react';

export interface TableColumn {
  key: string;
  header: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  nowrap?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}
export interface TableProps {
  columns: TableColumn[];
  rows: Array<Record<string, any>>;
  rowKey?: (row: any, index: number) => string | number;
  onRowClick?: (row: any) => void;
  empty?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Dense, scannable data table with hairline rows and per-column renderers. */
export function Table(props: TableProps): React.JSX.Element;
