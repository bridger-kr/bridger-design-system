// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/DataTrust.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
/**
 * The one-line provenance footer shared by data components: reason first
 * (it explains the state), then asOf · source · refresh.
 */
export const DataTrustMeta = forwardRef(function DataTrustMeta({ state, asOf, source, refresh, reason, className, ...rest }, ref) {
    const messages = useDSMessages();
    if (!reason && !asOf && !source && !refresh)
        return null;
    return (<div ref={ref} {...rest} className={cx('dt-data-meta', className)}>
      {reason ? <span className="dt-data-meta-reason">{reason}</span> : null}
      {asOf ? (<span className="dt-data-meta-item">
          <span className="dt-data-meta-key">{messages.dataTrust.asOf}</span>
          {asOf}
        </span>) : null}
      {source ? (<span className="dt-data-meta-item">
          <span className="dt-data-meta-key">{messages.dataTrust.source}</span>
          {source}
        </span>) : null}
      {refresh ? <span className="dt-data-meta-refresh">{refresh}</span> : null}
    </div>);
});
DataTrustMeta.displayName = 'DataTrustMeta';
/** Whether the state still shows measured data (vs. replaced by a notice). */
export function rendersValue(state) {
    return state === undefined || state === 'ready' || state === 'stale' || state === 'partial';
}
