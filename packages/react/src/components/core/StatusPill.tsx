import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

const STATUS = {
  connected: { bg: 'var(--dt-tint-success)', fg: 'var(--dt-success)' },
  success: { bg: 'var(--dt-tint-success)', fg: 'var(--dt-success)' },
  reconnecting: { bg: 'var(--dt-tint-warning)', fg: 'var(--dt-warning)' },
  warning: { bg: 'var(--dt-tint-warning)', fg: 'var(--dt-warning)' },
  disconnected: { bg: 'var(--dt-tint-danger)', fg: 'var(--dt-danger)' },
  danger: { bg: 'var(--dt-tint-danger)', fg: 'var(--dt-danger)' },
  info: { bg: 'var(--dt-tint-cobalt)', fg: 'var(--dt-info)' },
  idle: { bg: 'var(--dt-tint-muted)', fg: 'var(--dt-muted-strong)' },
};

export interface StatusPillProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
  /** Semantic state — drives the dot color. */
  status?: 'connected' | 'success' | 'reconnecting' | 'warning' | 'disconnected' | 'danger' | 'info' | 'idle';
  children?: ReactNode;
  /** Pulse the dot (use for transient states like reconnecting). */
  pulse?: boolean;
  style?: CSSProperties;
}

/**
 * Compact status pill: a tinted fill carrying a colored label — the console's
 * most-used status affordance (gateway / stream state). Live states pulse by
 * default; pass `pulse={false}` when a steady marker is more appropriate.
 */
export function StatusPill({ status = 'idle', children, pulse, style, ...rest }: StatusPillProps) {
  const tone = STATUS[status] ?? STATUS.idle;
  const shouldPulse = pulse ?? (status === 'connected' || status === 'reconnecting');
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 'var(--dt-radius-full)',
        background: tone.bg,
        padding: '4px 10px',
        fontSize: 12,
        fontWeight: 600,
        color: tone.fg,
        ...style,
      }}
      {...rest}
    >
      {shouldPulse ? (
        <span
          className="dt-status-pulse"
          aria-hidden="true"
          style={{
            width: 7,
            height: 7,
            borderRadius: 'var(--dt-radius-full)',
            background: tone.fg,
          }}
        />
      ) : null}
      {children}
    </span>
  );
}
