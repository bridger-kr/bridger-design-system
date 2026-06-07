import type { CSSProperties, ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  style?: CSSProperties;
}

/** Empty state for lists/tables — quiet icon, title, guidance, action. */
export function EmptyState({ icon, title, description, action, style }: EmptyStateProps) {
  return (
    <div style={{
      display: 'grid', placeItems: 'center', gap: 10, textAlign: 'center',
      padding: '40px 24px', borderRadius: 'var(--dt-radius-lg)',
      background: 'var(--dt-surface-sunken)', ...style,
    }}>
      {icon ? (
        <span style={{
          display: 'inline-flex', width: 44, height: 44, alignItems: 'center', justifyContent: 'center',
          borderRadius: 'var(--dt-radius-md)', background: 'var(--dt-surface)', color: 'var(--dt-muted)',
          boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)',
        }}>{icon}</span>
      ) : null}
      {title ? <div style={{ fontSize: 15, fontWeight: 650, color: 'var(--dt-ink-strong)' }}>{title}</div> : null}
      {description ? <div style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--dt-muted)', maxWidth: 320 }}>{description}</div> : null}
      {action ? <div style={{ marginTop: 6 }}>{action}</div> : null}
    </div>
  );
}
