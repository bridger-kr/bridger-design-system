import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { StatTile } from './StatTile';

export interface StatPanelItem {
  readonly value: ReactNode;
  readonly label: ReactNode;
}

export interface StatPanelProps extends HTMLAttributes<HTMLDivElement> {
  items?: readonly StatPanelItem[];
  variant?: 'card' | 'list';
}

export const StatPanel = forwardRef<HTMLDivElement, StatPanelProps>(function StatPanel(
  { items = [], variant = 'card', className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('dt-stat-panel', `dt-stat-panel-${variant}`, className)} {...rest}>
      {items.map((item, index) => (
        <StatTile key={index} value={item.value} label={item.label} className="dt-stat-panel-tile" />
      ))}
    </div>
  );
});
StatPanel.displayName = 'StatPanel';
