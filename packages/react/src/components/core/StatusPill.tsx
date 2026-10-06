import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { warnOnce } from '../../lib/deprecate';

export type StatusPillTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

const TONE_STYLE: Record<StatusPillTone, { bg: string; fg: string }> = {
  neutral: { bg: 'var(--dt-tint-text)', fg: 'var(--dt-text-subtle)' },
  accent: { bg: 'var(--dt-tint-accent)', fg: 'var(--dt-accent-text)' },
  success: { bg: 'var(--dt-tint-success)', fg: 'var(--dt-success)' },
  warning: { bg: 'var(--dt-tint-warning)', fg: 'var(--dt-warning)' },
  danger: { bg: 'var(--dt-tint-danger)', fg: 'var(--dt-danger)' },
  info: { bg: 'var(--dt-tint-cobalt)', fg: 'var(--dt-info)' },
};

/** @deprecated v1 connection states — use `tone`. Removed in v2.1. */
export type StatusPillStatus =
  | 'connected'
  | 'success'
  | 'reconnecting'
  | 'warning'
  | 'disconnected'
  | 'danger'
  | 'info'
  | 'idle';

const LEGACY_STATUS_MAP: Record<StatusPillStatus, StatusPillTone> = {
  connected: 'success',
  success: 'success',
  reconnecting: 'warning',
  warning: 'warning',
  disconnected: 'danger',
  danger: 'danger',
  info: 'info',
  idle: 'neutral',
};

export interface StatusPillProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
  /** Semantic tone — drives the dot and label color. */
  tone?: StatusPillTone;
  /** Visible label. Equivalent to `children`; use one or the other. */
  label?: ReactNode;
  children?: ReactNode;
  /**
   * @deprecated Use `tone` — `connected`→`success`, `reconnecting`→`warning`,
   * `disconnected`→`danger`, `idle`→`neutral`. Removed in v2.1.
   */
  status?: StatusPillStatus;
  /** Pulse the dot (transient states like reconnecting). */
  pulse?: boolean;
  style?: CSSProperties;
}

/**
 * Compact status pill: a tinted fill carrying a colored label — the console's
 * most-used status affordance (gateway / stream state). Live states pulse by
 * default; pass `pulse={false}` when a steady marker is more appropriate.
 */
export const StatusPill = forwardRef<HTMLSpanElement, StatusPillProps>(function StatusPill(
  { tone, label, children, status, pulse, style, ...rest },
  ref,
) {
  let resolvedTone: StatusPillTone = tone ?? 'neutral';
  if (status !== undefined) {
    warnOnce(
      `status-pill-status-${status}`,
      `StatusPill: status="${status}" is deprecated — use tone="${LEGACY_STATUS_MAP[status]}". Removed in v2.1.`,
    );
    if (tone === undefined) resolvedTone = LEGACY_STATUS_MAP[status];
  }
  const toneStyle = TONE_STYLE[resolvedTone];
  const shouldPulse = pulse ?? (status === 'connected' || status === 'reconnecting');
  return (
    <span
      ref={ref}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 'var(--dt-radius-pill)',
        background: toneStyle.bg,
        padding: '4px 10px',
        fontSize: 12,
        fontWeight: 600,
        color: toneStyle.fg,
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
            borderRadius: 'var(--dt-radius-pill)',
            background: toneStyle.fg,
          }}
        />
      ) : null}
      {label ?? children}
    </span>
  );
});
StatusPill.displayName = 'StatusPill';
