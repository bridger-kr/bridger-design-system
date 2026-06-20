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

export function ActionList({ children, className, ...rest }: ActionListProps) {
  return (
    <div {...rest} className={actionListClassName(className)}>
      {children}
    </div>
  );
}

export function ActionListIndex({ children, className, ...rest }: ActionListIndexProps) {
  return (
    <span {...rest} className={cx('dt-action-list-index', className)}>
      {children}
    </span>
  );
}
