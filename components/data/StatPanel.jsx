// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/StatPanel.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
import { StatTile } from './StatTile.jsx';
export function StatPanel({ items = [], variant = 'card', className, ...rest }) {
    return (<div className={cx('dt-stat-panel', `dt-stat-panel-${variant}`, className)} {...rest}>
      {items.map((item, index) => (<StatTile key={index} value={item.value} label={item.label} className="dt-stat-panel-tile"/>))}
    </div>);
}
