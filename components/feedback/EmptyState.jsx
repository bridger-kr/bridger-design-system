// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/EmptyState.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
/** Empty state for lists/tables — quiet icon, title, guidance, action. */
export const EmptyState = forwardRef(function EmptyState({ icon, title, description, action, className, style, ...rest }, ref) {
    return (<div ref={ref} className={className} style={{
            display: 'grid', placeItems: 'center', gap: 10, textAlign: 'center',
            padding: '40px 24px', borderRadius: 'var(--dt-radius-card)',
            background: 'var(--dt-surface-sunken)', ...style,
        }} {...rest}>
      {icon ? (<span style={{
                display: 'inline-flex', width: 44, height: 44, alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--dt-radius-control)', background: 'var(--dt-surface)', color: 'var(--dt-text-muted)',
                border: '1px solid var(--dt-border)',
            }}>{icon}</span>) : null}
      {title ? <div style={{ fontSize: 15, fontWeight: 650, color: 'var(--dt-text-strong)' }}>{title}</div> : null}
      {description ? <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--dt-text-muted)', maxWidth: 320 }}>{description}</div> : null}
      {action ? <div style={{ marginTop: 6 }}>{action}</div> : null}
    </div>);
});
EmptyState.displayName = 'EmptyState';
