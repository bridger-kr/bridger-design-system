// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/Table.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
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
export function Table({ columns = [], rows = [], rowKey, rowAction, empty, className, style, ...rest }) {
    if (!rows.length && empty)
        return empty;
    return (<div {...rest} className={cx('dt-table', className)} style={{
            overflowX: 'auto',
            borderRadius: 'var(--dt-radius-lg)',
            background: 'var(--dt-surface)',
            boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)',
            ...style,
        }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--dt-ink)' }}>
        <thead>
          <tr style={{ background: 'var(--dt-surface-muted)' }}>
            {columns.map((column) => (<th key={column.key} style={{
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
            }}>
                {column.header}
              </th>))}
            {rowAction ? <th className="dt-table-row-action-header" scope="col">행 작업</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const actionState = rowAction ? rowActionState(rowAction, row) : undefined;
            return (<tr key={rowKey ? rowKey(row, rowIndex) : rowIndex} className={cx('dt-tr', actionState && 'dt-tr-actionable')} data-disabled={actionState?.disabled ? '' : undefined}>
                {columns.map((column) => (<td key={column.key} style={{
                        textAlign: column.align || 'left',
                        padding: '13px 18px',
                        fontSize: 13,
                        borderBottom: '1px solid var(--dt-divider)',
                        whiteSpace: column.nowrap ? 'nowrap' : 'normal',
                    }}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>))}
                {actionState ? <td className="dt-table-row-action-cell">{actionState.control}</td> : null}
              </tr>);
        })}
        </tbody>
      </table>
    </div>);
}
