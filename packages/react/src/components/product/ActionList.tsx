import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ActionListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface ActionListItemClassNameOptions {
  interactive?: boolean;
  className?: string;
}

export interface ActionListIndexProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export function actionListClassName(className?: string): string {
  return cx('dt-action-list', className);
}

export function actionListItemClassName({ interactive = false, className }: ActionListItemClassNameOptions = {}): string {
  return cx('dt-action-list-item', interactive && 'dt-action-list-item-interactive', className);
}

export const ActionList = forwardRef<HTMLDivElement, ActionListProps>(function ActionList(
  { children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} {...rest} className={actionListClassName(className)}>
      {children}
    </div>
  );
});
ActionList.displayName = 'ActionList';

export const ActionListIndex = forwardRef<HTMLSpanElement, ActionListIndexProps>(function ActionListIndex(
  { children, className, ...rest },
  ref,
) {
  return (
    <span ref={ref} {...rest} className={cx('dt-action-list-index', className)}>
      {children}
    </span>
  );
});
ActionListIndex.displayName = 'ActionListIndex';
