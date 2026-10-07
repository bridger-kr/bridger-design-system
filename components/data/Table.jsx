// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/Table.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
function rowActionState(action, row) {
    switch (action.kind) {
        case 'button': {
            const disabled = action.disabled?.(row) ?? false;
            const label = action.label(row);
            return {
                disabled,
                control: (<button type="button" className="dt-table-row-action" aria-label={label} disabled={disabled} onClick={() => action.onActivate(row)}>
            {label}
          </button>),
            };
        }
        case 'link': {
            const label = action.label(row);
            return {
                disabled: false,
                control: (<a className="dt-table-row-action" aria-label={label} href={action.href(row)}>
            {label}
          </a>),
            };
        }
        default: {
            const exhaustiveAction = action;
            return exhaustiveAction;
        }
    }
}
/**
 * Data table — scannable, dense, hairline-divided. Columns define header,
 * alignment, and an optional cell renderer. Built for comparison, not decoration.
 */
function TableInner({ columns = [], rows = [], rowKey, rowAction, rowActionHeader, empty, className, style, ...rest }, ref) {
    const messages = useDSMessages();
    if (!rows.length && empty)
        return <>{empty}</>;
    return (<div ref={ref} {...rest} className={cx('dt-table', className)} style={style}>
      <table className="dt-table-grid">
        <thead>
          <tr className="dt-table-thead-row">
            {columns.map((column) => (<th key={column.key} className="dt-table-th" data-align={column.align || 'left'}>
                {column.header}
              </th>))}
            {rowAction ? <th className="dt-table-row-action-header" scope="col">{rowActionHeader ?? messages.table.rowActions}</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const actionState = rowAction ? rowActionState(rowAction, row) : undefined;
            return (<tr key={rowKey ? rowKey(row, rowIndex) : rowIndex} className={cx('dt-tr', actionState && 'dt-tr-actionable')} data-disabled={actionState?.disabled ? '' : undefined}>
                {columns.map((column) => (<td key={column.key} className="dt-table-td" data-align={column.align || 'left'} data-nowrap={column.nowrap || undefined}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>))}
                {actionState ? <td className="dt-table-row-action-cell">{actionState.control}</td> : null}
              </tr>);
        })}
        </tbody>
      </table>
    </div>);
}
export const Table = forwardRef(TableInner);
Table.displayName = 'Table';
