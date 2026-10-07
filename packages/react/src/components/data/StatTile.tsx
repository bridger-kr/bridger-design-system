import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface StatTileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  label: ReactNode;
  value: ReactNode;
  /** e.g. "+8.4%". */
  delta?: ReactNode;
  deltaTone?: 'up' | 'down' | 'neutral';
  hint?: ReactNode;
  style?: CSSProperties;
}

/**
 * Metric tile — caption-size label, large tabular value, optional delta.
 * The console's KPI unit. Compose several inside a bordered stat row.
 */
export const StatTile = forwardRef<HTMLDivElement, StatTileProps>(function StatTile(
  { label, value, delta, deltaTone = 'neutral', hint, className, style, ...rest },
  ref,
) {
  return (
    <div ref={ref} {...rest} className={cx('dt-stat-tile', className)} style={style}>
      <div className="dt-stat-tile-label">{label}</div>
      <div className="dt-stat-tile-value">{value}</div>
      {(delta || hint) ? (
        <div className="dt-stat-tile-foot">
          {delta ? <span className={`dt-stat-tile-delta dt-stat-tile-delta-${deltaTone}`}>{delta}</span> : null}
          {hint ? <span>{hint}</span> : null}
        </div>
      ) : null}
    </div>
  );
});
StatTile.displayName = 'StatTile';
