import React from 'react';

/**
 * Data table — scannable, dense, hairline-divided. Columns define header,
 * alignment, and an optional cell renderer. Built for comparison, not decoration.
 */
export function Table({ columns = [], rows = [], rowKey, onRowClick, empty, style }) {
  if (!rows.length && empty) return empty;
  return (
    <div style={{ overflowX: 'auto', borderRadius: 'var(--dt-radius-lg)', background: 'var(--dt-surface)', boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)', ...style }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--dt-ink)' }}>
        <thead>
          <tr style={{ background: 'var(--dt-surface-muted)' }}>
            {columns.map((c) => (
              <th key={c.key} style={{
                textAlign: c.align || 'left', padding: '11px 18px',
                fontFamily: 'var(--dt-font-mono)', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--dt-muted)',
                borderBottom: '1px solid var(--dt-divider)', whiteSpace: 'nowrap',
              }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={rowKey ? rowKey(row, ri) : ri}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className="dt-tr"
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}>
              {columns.map((c) => (
                <td key={c.key} style={{
                  textAlign: c.align || 'left', padding: '13px 18px', fontSize: 13,
                  borderBottom: '1px solid var(--dt-divider)', whiteSpace: c.nowrap ? 'nowrap' : 'normal',
                }}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`.dt-tr{transition:background-color 130ms}.dt-tr:hover{background:var(--dt-surface-muted)}tbody tr:last-child td{border-bottom:0}`}</style>
    </div>
  );
}
