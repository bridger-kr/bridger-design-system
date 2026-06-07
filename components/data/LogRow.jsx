import React from 'react';

const LEVEL = {
  ok:    { dot: 'var(--dt-success)', text: 'var(--dt-success)', label: 'OK' },
  warn:  { dot: 'var(--dt-warning)', text: 'var(--dt-warning)', label: 'WARN' },
  error: { dot: 'var(--dt-danger)',  text: 'var(--dt-danger)',  label: 'ERR' },
  info:  { dot: 'var(--dt-muted)',   text: 'var(--dt-muted-strong)', label: 'INFO' },
};

/**
 * LogRow stream — a dense, tabular execution log. Each entry is a hairline row:
 * timestamp · status dot · tool · message · latency, all mono and tabular so
 * columns align. This is the console's most-used surface; keep it flat.
 */
export function LogRow({ entries = [], style }) {
  return (
    <div style={{
      border: '1px solid var(--dt-border-strong)', borderRadius: 'var(--dt-radius-lg)', overflow: 'hidden',
      background: 'var(--dt-surface)', fontVariantNumeric: 'tabular-nums', ...style,
    }}>
      {entries.map((e, i) => {
        const lv = LEVEL[e.level] || LEVEL.info;
        return (
          <div
            key={i}
            style={{
              display: 'grid', gridTemplateColumns: 'auto 14px 1fr auto', alignItems: 'center', gap: 12,
              padding: '9px 14px', borderTop: i === 0 ? 'none' : '1px solid var(--dt-border)',
              fontFamily: 'var(--dt-font-mono)', fontSize: 12,
            }}
          >
            <span style={{ color: 'var(--dt-muted)' }}>{e.time}</span>
            <span style={{ width: 7, height: 7, borderRadius: 9999, background: lv.dot, justifySelf: 'center' }} />
            <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--dt-ink-strong)', fontWeight: 600 }}>{e.tool}</span>
              {e.message ? <span style={{ color: 'var(--dt-muted-strong)' }}>{'  '}{e.message}</span> : null}
            </span>
            <span style={{ color: e.latency ? 'var(--dt-muted-strong)' : lv.text, fontWeight: 600 }}>
              {e.latency || lv.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
