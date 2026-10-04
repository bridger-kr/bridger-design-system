// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ActionList.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
export function actionListClassName(className) {
    return cx('dt-action-list', className);
}
export function actionListItemClassName({ interactive = false, className } = {}) {
    return cx('dt-action-list-item', interactive && 'dt-action-list-item-interactive', className);
}
export function ActionList({ children, className, ...rest }) {
    return (<div {...rest} className={actionListClassName(className)}>
      {children}
    </div>);
}
export function ActionListIndex({ children, className, ...rest }) {
    return (<span {...rest} className={cx('dt-action-list-index', className)}>
      {children}
    </span>);
}
