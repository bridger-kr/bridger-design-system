import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../../lib/icon';
import { useDSMessages } from '../../locale/DSLocaleProvider';
import { DataTrustMeta, rendersValue } from './DataTrust';
import type { DataTrustProps } from './DataTrust';
import type { LucideIcon } from 'lucide-react';

export type StatDeltaDirection = 'up' | 'down' | 'flat';
export type StatDeltaValence = 'positive' | 'negative' | 'neutral';

const DIRECTION_ICON: Record<StatDeltaDirection, LucideIcon> = {
  up: ArrowUp,
  down: ArrowDown,
  flat: Minus,
};

export interface StatTileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'>, DataTrustProps {
  label: ReactNode;
  value: ReactNode;
  /** e.g. "+8.4%". */
  delta?: ReactNode;
  /**
   * @deprecated Split into `deltaDirection` + `deltaValence`. `deltaTone`
   * maps `up`→positive-up, `down`→negative-down, `neutral`→neutral-flat.
   */
  deltaTone?: 'up' | 'down' | 'neutral';
  /** Numeric direction of the delta — renders the arrow glyph. */
  deltaDirection?: StatDeltaDirection;
  /** Business valence of the delta — renders the color. Independent of direction. */
  deltaValence?: StatDeltaValence;
  hint?: ReactNode;
  style?: CSSProperties;
}

/**
 * Metric tile — caption-size label, large tabular value, optional delta.
 * Numeric direction (arrow) and business valence (color) are separate props:
 * a value going down can be good news.
 */
export const StatTile = forwardRef<HTMLDivElement, StatTileProps>(function StatTile(
  { label, value, delta, deltaTone, deltaDirection, deltaValence, hint, state, asOf, source, refresh, reason, className, style, ...rest },
  ref,
) {
  const messages = useDSMessages();
  const direction: StatDeltaDirection =
    deltaDirection ?? (deltaTone === 'neutral' || deltaTone === undefined ? 'flat' : deltaTone);
  const valence: StatDeltaValence =
    deltaValence ?? (deltaTone === 'up' ? 'positive' : deltaTone === 'down' ? 'negative' : 'neutral');
  const showValue = rendersValue(state);
  const hasMeta = Boolean(state || asOf || source || refresh || reason);

  return (
    <div ref={ref} {...rest} className={cx('dt-stat-tile', className)} style={style}>
      <div className="dt-stat-tile-label">{label}</div>
      <div className="dt-stat-tile-value">
        {showValue ? value : <span className="dt-stat-tile-unknown">{messages.dataTrust.unknown}</span>}
      </div>
      {(delta || hint) && showValue ? (
        <div className="dt-stat-tile-foot">
          {delta ? (
            <span className={`dt-stat-tile-delta dt-stat-tile-delta-${valence}`} data-direction={direction}>
              <Icon icon={DIRECTION_ICON[direction]} />
              {delta}
            </span>
          ) : null}
          {hint ? <span>{hint}</span> : null}
        </div>
      ) : null}
      {hasMeta ? (
        <DataTrustMeta state={state} asOf={asOf} source={source} refresh={refresh} reason={reason} />
      ) : null}
    </div>
  );
});
StatTile.displayName = 'StatTile';
