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
 * most-used status affordance (gateway / stream state). No outline, no dot;
 * an optional pulse marker appears only for live (`pulse`) states.
 */
export function StatusPill({ status = 'idle', children, pulse = false, style, ...rest }: StatusPillProps) {
  const tone = STATUS[status] ?? STATUS.idle;
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
      {pulse ? (
        <span
          aria-hidden="true"
          style={{
            width: 7,
            height: 7,
            borderRadius: '9999px',
            background: tone.fg,
            animation: 'dt-status-pulse 1.6s var(--dt-ease) infinite',
          }}
        />
      ) : null}
      {children}
      <style>{'@keyframes dt-status-pulse{0%,100%{opacity:1}50%{opacity:.35}}'}</style>
    </span>
  );
}
