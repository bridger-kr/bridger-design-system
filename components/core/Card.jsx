import React from 'react';

export const CardTone = {
  Default: 'default',
  Muted: 'muted',
  Raised: 'raised',
  Panel: 'panel',
};

const VARIANT_STYLE = {
  default: { background: 'var(--dt-surface)', boxShadow: 'var(--dt-card-rest)' },
  muted:   { background: 'var(--dt-surface-sunken)' },
  raised:  { background: 'var(--dt-surface-raised)', boxShadow: 'var(--dt-card-float)' },
  panel:   { background: 'var(--dt-surface)', boxShadow: 'var(--dt-shadow-xs)' },
};

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Card({ children, variant, tone, interactive = false, padding = 20, className, style, ...rest }) {
  const selectedTone = tone ?? variant ?? CardTone.Default;
  const v = VARIANT_STYLE[selectedTone] ?? VARIANT_STYLE.default;
  return (
    <div
      className={cx(interactive && 'dt-card-interactive', className)}
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
