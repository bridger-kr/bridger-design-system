import React from 'react';

/**
 * UsageMeter — a labeled progress bar for quota / usage (e.g. free tier 100회/일).
 * Hairline track, persimmon fill that shifts to warning/danger as it nears the cap.
 * Shows value / max with tabular figures. Flat — no glow, no gradient.
 */
export function UsageMeter({ label, value = 0, max = 100, unit = '', hint, style }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fill = pct >= 90 ? 'var(--dt-danger)' : pct >= 75 ? 'var(--dt-warning)' : 'var(--dt-accent)';

  return (
    <div style={{ display: 'grid', gap: 8, ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        {label ? <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-muted-strong)' }}>{label}</span> : <span />}
        <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 12.5, color: 'var(--dt-ink-strong)', fontVariantNumeric: 'tabular-nums' }}>
          <b style={{ fontWeight: 700 }}>{value.toLocaleString()}</b>
          <span style={{ color: 'var(--dt-muted)' }}> / {max.toLocaleString()}{unit}</span>
        </span>
      </div>
      <div style={{ position: 'relative', height: 8, borderRadius: 'var(--dt-radius-sm)', background: 'var(--dt-surface-sunken)', boxShadow: 'inset 0 0 0 1px var(--dt-border-strong)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: fill, borderRadius: 'var(--dt-radius-sm)', transition: 'width var(--dt-motion)' }} />
      </div>
      {hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{hint}</span> : null}
    </div>
  );
}
