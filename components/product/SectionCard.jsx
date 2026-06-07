import React from 'react';

/**
 * Console section panel: title + optional description and right-side
 * action, framing a body of content. The dashboard's primary content wrapper.
 */
export function SectionCard({ title, description, action, children, style }) {
  return (
    <section
      style={{
        borderRadius: 'var(--dt-radius-lg)',
        background: 'var(--dt-surface)',
        boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)',
        padding: 'var(--dt-space-4)',
        ...style,
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--dt-space-3)',
          marginBottom: children ? 'var(--dt-space-3)' : 0,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: 18, fontWeight: 650, letterSpacing: '-0.01em', color: 'var(--dt-ink-strong)' }}>
            {title}
          </h3>
          {description ? (
            <p style={{ marginTop: 6, fontSize: 13, lineHeight: 1.55, color: 'var(--dt-muted-strong)', maxWidth: 560 }}>
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div style={{ flex: '0 0 auto' }}>{action}</div> : null}
      </header>
      {children}
    </section>
  );
}
