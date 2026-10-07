import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';

export type StatusPillTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

const TONE_CLASS: Record<StatusPillTone, string> = {
  neutral: 'dt-status-pill',
  accent: 'dt-status-pill dt-status-pill-accent',
  success: 'dt-status-pill dt-status-pill-success',
  warning: 'dt-status-pill dt-status-pill-warning',
  danger: 'dt-status-pill dt-status-pill-danger',
  info: 'dt-status-pill dt-status-pill-info',
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
  { tone, label, children, status, pulse, className, style, ...rest },
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
  const shouldPulse = pulse ?? (status === 'connected' || status === 'reconnecting');
  return (
    <span ref={ref} className={cx(TONE_CLASS[resolvedTone], className)} style={style} {...rest}>
      {shouldPulse ? (
        <span className="dt-status-pulse dt-status-pill-dot" aria-hidden="true" />
      ) : null}
      {label ?? children}
    </span>
  );
});
StatusPill.displayName = 'StatusPill';
