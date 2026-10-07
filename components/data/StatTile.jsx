// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/StatTile.tsx
// Regenerate: pnpm generate

import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
import { DataTrustMeta, rendersValue } from './DataTrust.jsx';
const DIRECTION_ICON = {
    up: ArrowUp,
    down: ArrowDown,
    flat: Minus,
};
/**
 * Metric tile — caption-size label, large tabular value, optional delta.
 * Numeric direction (arrow) and business valence (color) are separate props:
 * a value going down can be good news.
 */
export const StatTile = forwardRef(function StatTile({ label, value, delta, deltaTone, deltaDirection, deltaValence, hint, state, asOf, source, refresh, reason, className, style, ...rest }, ref) {
    const messages = useDSMessages();
    const direction = deltaDirection ?? (deltaTone === 'neutral' || deltaTone === undefined ? 'flat' : deltaTone);
    const valence = deltaValence ?? (deltaTone === 'up' ? 'positive' : deltaTone === 'down' ? 'negative' : 'neutral');
    const showValue = rendersValue(state);
    const hasMeta = Boolean(state || asOf || source || refresh || reason);
    return (<div ref={ref} {...rest} className={cx('dt-stat-tile', className)} style={style}>
      <div className="dt-stat-tile-label">{label}</div>
      <div className="dt-stat-tile-value">
        {showValue ? value : <span className="dt-stat-tile-unknown">{messages.dataTrust.unknown}</span>}
      </div>
      {(delta || hint) && showValue ? (<div className="dt-stat-tile-foot">
          {delta ? (<span className={`dt-stat-tile-delta dt-stat-tile-delta-${valence}`} data-direction={direction}>
              <Icon icon={DIRECTION_ICON[direction]}/>
              {delta}
            </span>) : null}
          {hint ? <span>{hint}</span> : null}
        </div>) : null}
      {hasMeta ? (<DataTrustMeta state={state} asOf={asOf} source={source} refresh={refresh} reason={reason}/>) : null}
    </div>);
});
StatTile.displayName = 'StatTile';
