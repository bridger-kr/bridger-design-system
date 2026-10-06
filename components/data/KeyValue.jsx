// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/KeyValue.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
/**
 * Definition list for spec metadata — hairline rows, muted key, ink value.
 * @startingPoint section="Data" subtitle="Spec metadata as a definition list" viewport="460x220"
 */
export const KeyValue = forwardRef(function KeyValue({ items = [], columns = 1, style, ...rest }, ref) {
    return (<dl ref={ref} {...rest} style={{
            margin: 0, display: 'grid',
            gridTemplateColumns: columns === 2 ? '1fr 1fr' : '1fr',
            border: '1px solid var(--dt-border-strong)', borderRadius: 'var(--dt-radius-card)', overflow: 'hidden',
            ...style,
        }}>
      {items.map((item, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;
            const isLastRow = row === Math.floor((items.length - 1) / columns);
            return (<div key={index} style={{
                    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14,
                    padding: '11px 14px',
                    borderBottom: isLastRow ? 'none' : '1px solid var(--dt-border)',
                    borderRight: columns === 2 && col === 0 ? '1px solid var(--dt-border)' : 'none',
                }}>
            <dt style={{ fontSize: 12.5, color: 'var(--dt-text-muted)', flex: '0 0 auto' }}>{item.key}</dt>
            <dd style={{
                    margin: 0, textAlign: 'right', minWidth: 0,
                    fontFamily: item.mono ? 'var(--dt-font-mono)' : 'inherit',
                    fontSize: item.mono ? 12 : 13, fontWeight: 600,
                    color: item.accent ? 'var(--dt-accent)' : 'var(--dt-text-strong)',
                    fontVariantNumeric: 'tabular-nums',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{item.value}</dd>
          </div>);
        })}
    </dl>);
});
KeyValue.displayName = 'KeyValue';
