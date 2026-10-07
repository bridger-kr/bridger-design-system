import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { useDSMessages } from '../../locale/DSLocaleProvider';

/**
 * Shared data-confidence model (issue #29). Every data component accepts the
 * same props so console screens can answer: is this a confirmed value, when
 * was it confirmed, did only part of the request succeed?
 */
export type DataState =
  | 'loading'
  | 'ready'
  | 'empty'
  | 'partial'
  | 'stale'
  | 'error'
  | 'unauthorized';

export interface DataTrustProps {
  /** Lifecycle state — never synthesize `0`/empty silently for non-ready states. */
  state?: DataState;
  /** "기준 시각" — when the value was last confirmed (formatted or ISO). */
  asOf?: ReactNode;
  /** Data source label (e.g. the upstream preset or endpoint). */
  source?: ReactNode;
  /** Refresh affordance (usually a small Button or link). */
  refresh?: ReactNode;
  /** Why the state is not `ready` — rendered inside the meta line. */
  reason?: ReactNode;
}

export interface DataTrustMetaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, DataTrustProps {}

/**
 * The one-line provenance footer shared by data components: reason first
 * (it explains the state), then asOf · source · refresh.
 */
export const DataTrustMeta = forwardRef<HTMLDivElement, DataTrustMetaProps>(function DataTrustMeta(
  { state, asOf, source, refresh, reason, className, ...rest },
  ref,
) {
  const messages = useDSMessages();
  if (!reason && !asOf && !source && !refresh) return null;
  return (
    <div ref={ref} {...rest} className={cx('dt-data-meta', className)}>
      {reason ? <span className="dt-data-meta-reason">{reason}</span> : null}
      {asOf ? (
        <span className="dt-data-meta-item">
          <span className="dt-data-meta-key">{messages.dataTrust.asOf}</span>
          {asOf}
        </span>
      ) : null}
      {source ? (
        <span className="dt-data-meta-item">
          <span className="dt-data-meta-key">{messages.dataTrust.source}</span>
          {source}
        </span>
      ) : null}
      {refresh ? <span className="dt-data-meta-refresh">{refresh}</span> : null}
    </div>
  );
});
DataTrustMeta.displayName = 'DataTrustMeta';

/** Whether the state still shows measured data (vs. replaced by a notice). */
export function rendersValue(state?: DataState): boolean {
  return state === undefined || state === 'ready' || state === 'stale' || state === 'partial';
}
