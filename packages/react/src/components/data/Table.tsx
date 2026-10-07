import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';
import { cx } from '../../lib/cx';
import { useDSMessages } from '../../locale/DSLocaleProvider';
import { DataTrustMeta } from './DataTrust';
import type { DataTrustProps } from './DataTrust';

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

export interface TableProps<Row extends TableRow = TableRow> extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'>, DataTrustProps {
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
  /** Header cell for the row-action column; defaults to the ambient locale. */
  readonly rowActionHeader?: ReactNode;
  readonly style?: CSSProperties;
}

/** Data-trust fields are mixed into TableProps so callers pass one object. */
export interface TableTrustProps extends TableProps<TableRow>, DataTrustProps {}

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
function TableInner<Row extends TableRow = TableRow>(
  {
    columns = [],
    rows = [],
    rowKey,
    rowAction,
    rowActionHeader,
    empty,
    state,
    asOf,
    source,
    refresh,
    reason,
    className,
    style,
    ...rest
  }: TableProps<Row>,
  ref: Ref<HTMLDivElement>,
) {
  const messages = useDSMessages();
  const colSpan = columns.length + (rowAction ? 1 : 0);
  const stateRow =
    state && state !== 'ready' ? (
      <tr className={cx('dt-table-state-row', (state === 'error' || state === 'unauthorized') && 'dt-table-state-error')}>
        <td colSpan={colSpan} role={state === 'error' || state === 'unauthorized' ? 'alert' : 'status'}>
          {reason ?? messages.dataTrust.state[state]}
        </td>
      </tr>
    ) : null;
  const hasMeta = Boolean(asOf || source || refresh || reason);

  if (!rows.length && empty && (!state || state === 'empty')) return <>{empty}</>;

  return (
    <div
      ref={ref}
      {...rest}
      className={cx('dt-table', className)}
      style={style}
    >
      <table className="dt-table-grid">
        <thead>
          <tr className="dt-table-thead-row">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="dt-table-th"
                data-align={column.align || 'left'}
              >
                {column.header}
              </th>
            ))}
            {rowAction ? <th className="dt-table-row-action-header" scope="col">{rowActionHeader ?? messages.table.rowActions}</th> : null}
          </tr>
        </thead>
        <tbody>
          {stateRow}
          {state === 'loading' || state === 'error' || state === 'unauthorized'
            ? null
            : rows.map((row, rowIndex) => {
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
                    className="dt-table-td"
                    data-align={column.align || 'left'}
                    data-nowrap={column.nowrap || undefined}
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
      {hasMeta ? <DataTrustMeta state={state} asOf={asOf} source={source} refresh={refresh} reason={reason} /> : null}
    </div>
  );
}

export const Table = forwardRef(TableInner) as <Row extends TableRow = TableRow>(
  props: TableProps<Row> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
(Table as { displayName?: string }).displayName = 'Table';
