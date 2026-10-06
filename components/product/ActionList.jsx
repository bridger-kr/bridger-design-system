// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ActionList.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
export function actionListClassName(className) {
    return cx('dt-action-list', className);
}
export function actionListItemClassName({ interactive = false, className } = {}) {
    return cx('dt-action-list-item', interactive && 'dt-action-list-item-interactive', className);
}
export const ActionList = forwardRef(function ActionList({ children, className, ...rest }, ref) {
    return (<div ref={ref} {...rest} className={actionListClassName(className)}>
      {children}
    </div>);
});
ActionList.displayName = 'ActionList';
export const ActionListIndex = forwardRef(function ActionListIndex({ children, className, ...rest }, ref) {
    return (<span ref={ref} {...rest} className={cx('dt-action-list-index', className)}>
      {children}
    </span>);
});
ActionListIndex.displayName = 'ActionListIndex';
