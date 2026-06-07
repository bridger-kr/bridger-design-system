import type { ReactNode, HTMLAttributes } from 'react';

export interface SectionCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned action (usually a ghost Button). */
  action?: ReactNode;
  children?: ReactNode;
}

/**
 * Console section panel — title, description, action, body. No eyebrow kicker:
 * the title is a plain noun-phrase heading, the section's own content does the
 * rest. Lay items flat inside; never card-in-card.
 */
export function SectionCard({ title, description, action, children, style, ...rest }: SectionCardProps) {
  return (
    <section
      {...rest}
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
