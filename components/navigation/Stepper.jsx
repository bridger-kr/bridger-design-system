import React from 'react';

/**
 * Stepper — onboarding / multi-step progress (e.g. API 등록 → 키 연결 → 도구 노출).
 * Done steps show a check, the current step is persimmon, upcoming are muted.
 * Connectors are hairlines that fill persimmon up to the current step. Vertical
 * or horizontal. Step indices are squared (radius-sm), not bubbly circles.
 */
export function Stepper({ steps = [], current = 0, orientation = 'horizontal', style }) {
  const vertical = orientation === 'vertical';
  return (
    <div style={{
      display: 'flex', flexDirection: vertical ? 'column' : 'row',
      alignItems: vertical ? 'stretch' : 'flex-start', gap: 0, ...style,
    }}>
      {steps.map((s, i) => {
        const done = i < current, active = i === current;
        const accent = done || active;
        return (
          <div key={i} style={{ display: 'flex', flexDirection: vertical ? 'row' : 'column', alignItems: vertical ? 'flex-start' : 'stretch', flex: vertical ? 'none' : 1, minWidth: 0, gap: vertical ? 12 : 0 }}>
            {/* marker + connector */}
            <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', alignItems: 'center', gap: vertical ? 6 : 10, ...(vertical ? {} : { width: '100%' }) }}>
              <span style={{
                flex: '0 0 auto', width: 26, height: 26, display: 'grid', placeItems: 'center',
                borderRadius: 'var(--dt-radius-sm)', fontFamily: 'var(--dt-font-mono)', fontSize: 12, fontWeight: 700,
                background: done ? 'var(--dt-accent)' : active ? 'var(--dt-tint-accent)' : 'var(--dt-surface-sunken)',
                color: done ? '#fff' : active ? 'var(--dt-accent)' : 'var(--dt-muted)',
                boxShadow: active ? 'inset 0 0 0 1.5px var(--dt-accent)' : done ? 'none' : 'inset 0 0 0 1px var(--dt-border-strong)',
              }}>
                {done ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg> : i + 1}
              </span>
              {i < steps.length - 1 ? (
                <span style={{
                  background: done ? 'var(--dt-accent)' : 'var(--dt-border-strong)',
                  ...(vertical ? { width: 2, minHeight: 22, flex: 1, marginTop: 2 } : { height: 2, flex: 1 }),
                }} />
              ) : null}
            </div>
            {/* label */}
            <div style={{ padding: vertical ? '2px 0 16px' : '10px 14px 0 0' }}>
              <div style={{ fontSize: 13.5, fontWeight: accent ? 650 : 500, color: accent ? 'var(--dt-ink-strong)' : 'var(--dt-muted)' }}>{s.label}</div>
              {s.description ? <div style={{ fontSize: 12, color: 'var(--dt-muted)', marginTop: 3, lineHeight: 1.45 }}>{s.description}</div> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
