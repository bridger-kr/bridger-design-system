// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/EmptyState.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
/** Empty state for lists/tables — quiet icon, title, guidance, action. */
export const EmptyState = forwardRef(function EmptyState({ icon, title, description, action, className, style, ...rest }, ref) {
    return (<div ref={ref} className={cx('dt-empty-state', className)} style={style} {...rest}>
      {icon ? <span className="dt-empty-state-icon">{icon}</span> : null}
      {title ? <div className="dt-empty-state-title">{title}</div> : null}
      {description ? <div className="dt-empty-state-desc">{description}</div> : null}
      {action ? <div className="dt-empty-state-action">{action}</div> : null}
    </div>);
});
EmptyState.displayName = 'EmptyState';
