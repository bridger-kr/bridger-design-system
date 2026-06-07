import React from 'react';

/**
 * KeyValue — a definition list for spec metadata (auth, method, base URL, rate
 * limit…). Hairline rows; the key is muted, the value is ink and optionally mono.
 * `columns=2` lays pairs out in a two-up grid for denser panels.
 */
export function KeyValue({ items = [], columns = 1, style }) {
  return (
    <dl style={{
      margin: 0, display: 'grid',
      gridTemplateColumns: columns === 2 ? '1fr 1fr' : '1fr',
      border: '1px solid var(--dt-border-strong)', borderRadius: 'var(--dt-radius-lg)', overflow: 'hidden',
      ...style,
    }}>
      {items.map((it, i) => {
        const row = Math.floor(i / columns);
        const col = i % columns;
        const isLastRow = row === Math.floor((items.length - 1) / columns);
        return (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14,
              padding: '11px 14px',
              borderBottom: isLastRow ? 'none' : '1px solid var(--dt-border)',
              borderRight: columns === 2 && col === 0 ? '1px solid var(--dt-border)' : 'none',
            }}
          >
            <dt style={{ fontSize: 12.5, color: 'var(--dt-muted)', flex: '0 0 auto' }}>{it.key}</dt>
            <dd style={{
              margin: 0, textAlign: 'right', minWidth: 0,
              fontFamily: it.mono ? 'var(--dt-font-mono)' : 'inherit',
              fontSize: it.mono ? 12.5 : 13, fontWeight: 600,
              color: it.accent ? 'var(--dt-accent)' : 'var(--dt-ink-strong)',
              fontVariantNumeric: 'tabular-nums',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{it.value}</dd>
          </div>
        );
      })}
    </dl>
  );
}
