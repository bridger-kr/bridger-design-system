import React from 'react';

export const CardTone = {
  Default: 'default',
  Muted: 'muted',
  Raised: 'raised',
  Panel: 'panel',
};

const VARIANT_STYLE = {
  default: { background: 'var(--dt-surface)' },
  muted:   { background: 'var(--dt-surface-sunken)' },
  raised:  { background: 'var(--dt-surface-raised)', borderColor: 'var(--dt-border-strong)' },
  panel:   { background: 'var(--dt-surface)' },
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
        border: '1px solid var(--dt-border)',
        transition: 'border-color var(--dt-motion-fast), background-color var(--dt-motion-fast)',
        ...v,
        ...style,
      }}
      {...rest}
    >
      {children}
      {interactive ? (
        <style>{'.dt-card-interactive:hover{border-color:var(--dt-border-strong)}'}</style>
      ) : null}
    </div>
  );
}
