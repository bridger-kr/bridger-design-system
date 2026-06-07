import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export interface StatTileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  label: ReactNode;
  value: ReactNode;
  /** e.g. "+8.4%". */
  delta?: ReactNode;
  deltaTone?: 'up' | 'down' | 'neutral';
  hint?: ReactNode;
  style?: CSSProperties;
}

/**
 * Metric tile — uppercase label, large tabular value, optional delta.
 * The console's KPI unit. Compose several inside a bordered stat row.
 */
export function StatTile({ label, value, delta, deltaTone = 'neutral', hint, style, ...rest }: StatTileProps) {
  const tone = { up: 'var(--dt-success)', down: 'var(--dt-danger)', neutral: 'var(--dt-muted)' }[deltaTone];

  return (
    <div {...rest} style={{ padding: 18, minWidth: 0, ...style }}>
      <div style={{ fontSize: 11, fontWeight: 650, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--dt-muted)' }}>{label}</div>
      <div style={{ marginTop: 8, fontSize: 25, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--dt-ink-strong)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      {(delta || hint) ? (
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--dt-muted)' }}>
          {delta ? <span style={{ color: tone, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{delta}</span> : null}
          {hint ? <span>{hint}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
