import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type TableAlign = 'left' | 'center' | 'right';
export type TableRow = Record<string, ReactNode>;

export interface TableColumn<Row extends TableRow = TableRow> {
  readonly key: Extract<keyof Row, string>;
  readonly header: ReactNode;
  readonly align?: TableAlign;
  readonly nowrap?: boolean;
  readonly render?: (value: Row[Extract<keyof Row, string>], row: Row) => ReactNode;
}

export interface TableButtonRowAction<Row extends TableRow> {
  readonly kind: 'button';
  readonly label: (row: Row) => string;
  readonly onActivate: (row: Row) => void;
  readonly disabled?: (row: Row) => boolean;
}

export interface TableLinkRowAction<Row extends TableRow> {
  readonly kind: 'link';
  readonly label: (row: Row) => string;
  readonly href: (row: Row) => string;
}

export type TableRowAction<Row extends TableRow> = TableButtonRowAction<Row> | TableLinkRowAction<Row>;

export interface TableProps<Row extends TableRow = TableRow> extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  readonly columns?: readonly TableColumn<Row>[];
  readonly rows?: readonly Row[];
  readonly rowKey?: (row: Row, index: number) => string | number;
  /**
   * Semantic whole-row action. Replaces `onRowClick`; every action requires an
   * accessible label and renders as a native button or link in a valid cell.
   * Actionable rows must not contain nested interactive controls.
   */
  readonly rowAction?: TableRowAction<Row>;
  readonly empty?: ReactNode;
  readonly style?: CSSProperties;
}

interface RowActionState {
  readonly control: ReactNode;
  readonly disabled: boolean;
}

function rowActionState<Row extends TableRow>(action: TableRowAction<Row>, row: Row): RowActionState {
  switch (action.kind) {
    case 'button': {
      const disabled = action.disabled?.(row) ?? false;
      const label = action.label(row);
      return {
        disabled,
        control: (
          <button
            type="button"
            className="dt-table-row-action"
            aria-label={label}
            disabled={disabled}
            onClick={() => action.onActivate(row)}
          >
            {label}
          </button>
        ),
      };
    }
    case 'link': {
      const label = action.label(row);
      return {
        disabled: false,
        control: (
          <a
            className="dt-table-row-action"
            aria-label={label}
            href={action.href(row)}
          >
            {label}
          </a>
        ),
      };
    }
    default: {
      const exhaustiveAction: never = action;
      return exhaustiveAction;
    }
  }
}

/**
 * Data table — scannable, dense, hairline-divided. Columns define header,
 * alignment, and an optional cell renderer. Built for comparison, not decoration.
 */
export function Table<Row extends TableRow = TableRow>({
  columns = [],
  rows = [],
  rowKey,
  rowAction,
  empty,
  className,
  style,
  ...rest
}: TableProps<Row>) {
  if (!rows.length && empty) return empty;

  return (
    <div
      {...rest}
      className={cx('dt-table', className)}
      style={{
        overflowX: 'auto',
        borderRadius: 'var(--dt-radius-lg)',
        background: 'var(--dt-surface)',
        boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)',
        ...style,
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--dt-ink)' }}>
        <thead>
          <tr style={{ background: 'var(--dt-surface-muted)' }}>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  textAlign: column.align || 'left',
                  padding: '11px 18px',
                  fontFamily: 'var(--dt-font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--dt-muted)',
                  borderBottom: '1px solid var(--dt-divider)',
                  whiteSpace: 'nowrap',
                }}
              >
                {column.header}
              </th>
            ))}
            {rowAction ? <th className="dt-table-row-action-header" scope="col">행 작업</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const actionState = rowAction ? rowActionState(rowAction, row) : undefined;
            return (
              <tr
                key={rowKey ? rowKey(row, rowIndex) : rowIndex}
                className={cx('dt-tr', actionState && 'dt-tr-actionable')}
                data-disabled={actionState?.disabled ? '' : undefined}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{
                      textAlign: column.align || 'left',
                      padding: '13px 18px',
                      fontSize: 13,
                      borderBottom: '1px solid var(--dt-divider)',
                      whiteSpace: column.nowrap ? 'nowrap' : 'normal',
                    }}
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {actionState ? <td className="dt-table-row-action-cell">{actionState.control}</td> : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
