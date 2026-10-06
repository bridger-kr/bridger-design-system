// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/SectionCard.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
/**
 * Console section panel — title, description, action, body. No eyebrow kicker:
 * the title is a plain noun-phrase heading, the section's own content does the
 * rest. Lay items flat inside; never card-in-card.
 */
export const SectionCard = forwardRef(function SectionCard({ eyebrow, title, description, action, children, contentClassName, slotProps, style, ...rest }, ref) {
    const hasHeader = Boolean(eyebrow || title || description || action);
    if (contentClassName !== undefined) {
        warnOnce('sectioncard-contentclassname', 'SectionCard: `contentClassName` is deprecated — use `slotProps.content.className`. Removed in v2.1.');
    }
    return (<section ref={ref} {...rest} style={{
            borderRadius: 'var(--dt-radius-card)',
            background: 'var(--dt-surface)',
            border: '1px solid var(--dt-border)',
            padding: 'var(--dt-space-4)',
            ...style,
        }}>
      {hasHeader ? (<header style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 'var(--dt-space-3)',
                marginBottom: children ? 'var(--dt-space-3)' : 0,
            }}>
          <div style={{ minWidth: 0 }}>
            {eyebrow ? (<p style={{
                    marginBottom: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--dt-text-muted)',
                }}>
                {eyebrow}
              </p>) : null}
            {title ? (<h3 style={{ fontSize: 18, fontWeight: 650, letterSpacing: '-0.01em', color: 'var(--dt-text-strong)' }}>
                {title}
              </h3>) : null}
            {description ? (<p style={{ marginTop: 6, fontSize: 13, lineHeight: 1.55, color: 'var(--dt-text-subtle)', maxWidth: 560 }}>
                {description}
              </p>) : null}
          </div>
          {action ? <div style={{ flex: '0 0 auto' }}>{action}</div> : null}
        </header>) : null}
      <div {...slotProps?.content} className={cx(slotProps?.content?.className, contentClassName)}>{children}</div>
    </section>);
});
SectionCard.displayName = 'SectionCard';
