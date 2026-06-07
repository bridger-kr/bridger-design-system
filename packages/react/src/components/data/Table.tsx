import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type TableAlign = 'left' | 'center' | 'right';
export type TableRow = Record<string, ReactNode>;

export interface TableColumn<Row extends TableRow = TableRow> {
  key: Extract<keyof Row, string>;
  header: ReactNode;
  align?: TableAlign;
  nowrap?: boolean;
  render?: (value: Row[Extract<keyof Row, string>], row: Row) => ReactNode;
}

export interface TableProps<Row extends TableRow = TableRow> extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  columns?: Array<TableColumn<Row>>;
  rows?: Row[];
  rowKey?: (row: Row, index: number) => string | number;
  onRowClick?: (row: Row) => void;
  empty?: ReactNode;
  style?: CSSProperties;
}

/**
 * Data table — scannable, dense, hairline-divided. Columns define header,
 * alignment, and an optional cell renderer. Built for comparison, not decoration.
 */
export function Table<Row extends TableRow = TableRow>({ columns = [], rows = [], rowKey, onRowClick, empty, style, ...rest }: TableProps<Row>) {
  if (!rows.length && empty) return empty;

  return (
    <div {...rest} style={{ overflowX: 'auto', borderRadius: 'var(--dt-radius-lg)', background: 'var(--dt-surface)', boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)', ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--dt-ink)' }}>
        <thead>
          <tr style={{ background: 'var(--dt-surface-muted)' }}>
            {columns.map((column) => (
              <th key={column.key} style={{
                textAlign: column.align || 'left', padding: '11px 18px',
                fontFamily: 'var(--dt-font-mono)', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--dt-muted)',
                borderBottom: '1px solid var(--dt-divider)', whiteSpace: 'nowrap',
              }}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowKey ? rowKey(row, rowIndex) : rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className="dt-tr"
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
              {columns.map((column) => (
                <td key={column.key} style={{
                  textAlign: column.align || 'left', padding: '13px 18px', fontSize: 13,
                  borderBottom: '1px solid var(--dt-divider)', whiteSpace: column.nowrap ? 'nowrap' : 'normal',
                }}>{column.render ? column.render(row[column.key], row) : row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`.dt-tr{transition:background-color 130ms}.dt-tr:hover{background:var(--dt-surface-muted)}tbody tr:last-child td{border-bottom:0}`}</style>
    </div>
  );
}
