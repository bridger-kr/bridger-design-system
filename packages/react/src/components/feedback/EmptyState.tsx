import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  style?: CSSProperties;
}

/** Empty state for lists/tables — quiet icon, title, guidance, action. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { icon, title, description, action, className, style, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('dt-empty-state', className)}
      style={style}
      {...rest}
    >
      {icon ? <span className="dt-empty-state-icon">{icon}</span> : null}
      {title ? <div className="dt-empty-state-title">{title}</div> : null}
      {description ? <div className="dt-empty-state-desc">{description}</div> : null}
      {action ? <div className="dt-empty-state-action">{action}</div> : null}
    </div>
  );
});
EmptyState.displayName = 'EmptyState';
