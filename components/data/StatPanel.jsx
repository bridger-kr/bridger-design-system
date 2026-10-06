// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/StatPanel.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { StatTile } from './StatTile.jsx';
export const StatPanel = forwardRef(function StatPanel({ items = [], variant = 'card', className, ...rest }, ref) {
    return (<div ref={ref} className={cx('dt-stat-panel', `dt-stat-panel-${variant}`, className)} {...rest}>
      {items.map((item, index) => (<StatTile key={index} value={item.value} label={item.label} className="dt-stat-panel-tile"/>))}
    </div>);
});
StatPanel.displayName = 'StatPanel';
