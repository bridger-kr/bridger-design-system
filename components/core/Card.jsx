import React from 'react';

export const CardTone = {
  Default: 'default',
  Muted: 'muted',
  Raised: 'raised',
  Panel: 'panel',
};

const VARIANT_STYLE = {
  default: { background: 'var(--dt-surface)', boxShadow: '0 0 0 1px var(--dt-border)' },
  muted:   { background: 'var(--dt-surface-sunken)' },
  raised:  { background: 'var(--dt-surface-raised)', boxShadow: '0 0 0 1px var(--dt-border)' },
  panel:   { background: 'var(--dt-surface)', boxShadow: 'none' },
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
        borderRadius: 'var(--dt-radius-card)',
        color: 'var(--dt-ink)',
        padding,
        transition: 'box-shadow var(--dt-duration-base) var(--dt-ease), background-color var(--dt-duration-base) var(--dt-ease)',
        ...v,
        ...style,
      }}
      {...rest}
    >
      {children}
      {interactive ? (
        <style>{'.dt-card-interactive:hover{box-shadow:0 0 0 1px var(--dt-border-strong)}'}</style>
      ) : null}
    </div>
  );
}
