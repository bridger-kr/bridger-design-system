import React from 'react';

const VARIANT_STYLE = {
  default: { background: 'var(--dt-surface)', boxShadow: 'var(--dt-card-rest)' },
  muted:   { background: 'var(--dt-surface-sunken)' },
  raised:  { background: 'var(--dt-surface-raised)', boxShadow: 'var(--dt-card-float)' },
  panel:   { background: 'var(--dt-surface)', boxShadow: 'var(--dt-shadow-xs)' },
};

/**
 * Surface container. Use for repeated items, modals, and genuinely framed
 * tools — not as a decorative wrapper. `panel` is the flatter console variant.
 */
export function Card({ children, variant = 'default', interactive = false, padding = 20, style, ...rest }) {
  const v = VARIANT_STYLE[variant] ?? VARIANT_STYLE.default;
  return (
    <div
      className={interactive ? 'dt-card-interactive' : undefined}
      style={{
        borderRadius: 'var(--dt-radius-lg)',
        color: 'var(--dt-ink)',
        padding,
        transition: 'box-shadow var(--dt-motion), background-color var(--dt-motion)',
        ...v,
        ...style,
      }}
      {...rest}
    >
      {children}
      {interactive ? (
        <style>{'.dt-card-interactive:hover{box-shadow:var(--dt-card-hover)}'}</style>
      ) : null}
    </div>
  );
}
