// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/StatTile.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
/**
 * Metric tile — uppercase label, large tabular value, optional delta.
 * The console's KPI unit. Compose several inside a bordered stat row.
 */
export const StatTile = forwardRef(function StatTile({ label, value, delta, deltaTone = 'neutral', hint, style, ...rest }, ref) {
    const tone = { up: 'var(--dt-success)', down: 'var(--dt-danger)', neutral: 'var(--dt-text-muted)' }[deltaTone];
    return (<div ref={ref} {...rest} style={{ padding: 18, minWidth: 0, ...style }}>
      <div style={{ fontSize: 11, fontWeight: 650, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--dt-text-muted)' }}>{label}</div>
      <div style={{ marginTop: 8, fontSize: 25, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--dt-stat-tile-value-color, var(--dt-text-strong))', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      {(delta || hint) ? (<div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--dt-text-muted)' }}>
          {delta ? <span style={{ color: tone, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{delta}</span> : null}
          {hint ? <span>{hint}</span> : null}
        </div>) : null}
    </div>);
});
StatTile.displayName = 'StatTile';
