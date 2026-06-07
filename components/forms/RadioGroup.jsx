import React from 'react';

/**
 * Radio group. One persimmon-filled selection. Pass options as strings or
 * { value, label, hint }. Controlled (value) or uncontrolled (defaultValue).
 */
export function RadioGroup({ name, options = [], value, defaultValue, onChange, disabled, style }) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const groupName = name || React.useId();
  const select = (v) => {
    if (disabled) return;
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };
  return (
    <div role="radiogroup" style={{ display: 'grid', gap: 10, ...style }}>
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        const on = opt.value === current;
        return (
          <label key={opt.value} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1 }}>
            <input type="radio" name={groupName} checked={on} onChange={() => select(opt.value)} disabled={disabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
            <span style={{
              width: 18, height: 18, marginTop: 1, flex: '0 0 auto', borderRadius: 9999, display: 'grid', placeItems: 'center',
              background: 'var(--dt-surface)', border: `1.5px solid ${on ? 'var(--dt-accent)' : 'var(--dt-border-strong)'}`,
              transition: 'border-color 130ms',
            }}>
              {on ? <span style={{ width: 9, height: 9, borderRadius: 9999, background: 'var(--dt-accent)' }} /> : null}
            </span>
            <span style={{ display: 'grid', gap: 2 }}>
              <span style={{ fontSize: 14, color: 'var(--dt-ink)', lineHeight: 1.3 }}>{opt.label}</span>
              {opt.hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{opt.hint}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
