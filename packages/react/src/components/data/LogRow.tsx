import type { CSSProperties, HTMLAttributes } from 'react';

export type LogLevel = 'ok' | 'warn' | 'error' | 'info';

const LEVEL: Record<LogLevel, { dot: string; text: string; label: string }> = {
  ok:    { dot: 'var(--dt-success)', text: 'var(--dt-success)', label: 'OK' },
  warn:  { dot: 'var(--dt-warning)', text: 'var(--dt-warning)', label: 'WARN' },
  error: { dot: 'var(--dt-danger)',  text: 'var(--dt-danger)',  label: 'ERR' },
  info:  { dot: 'var(--dt-muted)',   text: 'var(--dt-muted-strong)', label: 'INFO' },
};

export interface LogEntry {
  time: string;
  level: LogLevel;
  tool: string;
  message?: string;
  /** Latency string (e.g. "142ms"). When absent, the level label shows instead. */
  latency?: string;
}

export interface LogRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  entries?: LogEntry[];
  style?: CSSProperties;
}

/**
 * Dense tabular execution-log stream — hairline rows, status dots, mono columns.
 * @startingPoint section="Data" subtitle="Execution-log stream" viewport="560x200"
 */
export function LogRow({ entries = [], style, ...rest }: LogRowProps) {
  return (
    <div {...rest} style={{
      border: '1px solid var(--dt-border-strong)', borderRadius: 'var(--dt-radius-lg)', overflow: 'hidden',
      background: 'var(--dt-surface)', fontVariantNumeric: 'tabular-nums', ...style,
    }}>
      {entries.map((entry, index) => {
        const level = LEVEL[entry.level] || LEVEL.info;

        return (
          <div
            key={index}
            style={{
              display: 'grid', gridTemplateColumns: 'auto 14px 1fr auto', alignItems: 'center', gap: 12,
              padding: '9px 14px', borderTop: index === 0 ? 'none' : '1px solid var(--dt-border)',
              fontFamily: 'var(--dt-font-mono)', fontSize: 12,
            }}
          >
            <span style={{ color: 'var(--dt-muted)' }}>{entry.time}</span>
            <span style={{ width: 7, height: 7, borderRadius: 9999, background: level.dot, justifySelf: 'center' }} />
            <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span style={{ color: 'var(--dt-ink-strong)', fontWeight: 600 }}>{entry.tool}</span>
              {entry.message ? <span style={{ color: 'var(--dt-muted-strong)' }}>{'  '}{entry.message}</span> : null}
            </span>
            <span style={{ color: entry.latency ? 'var(--dt-muted-strong)' : level.text, fontWeight: 600 }}>
              {entry.latency || level.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
