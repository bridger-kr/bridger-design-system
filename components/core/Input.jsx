import React from 'react';

/**
 * Compact labeled input, paired with a label or table context. Supports a
 * mono variant for API paths / keys / IDs.
 */
export function Input({
  label,
  hint,
  mono = false,
  id,
  type = 'text',
  prefix = null,
  invalid = false,
  style,
  ...rest
}) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-')}` : undefined);
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {label ? (
        <label
          htmlFor={inputId}
          style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-muted-strong)' }}
        >
          {label}
        </label>
      ) : null}
      <div
        className={invalid ? 'dt-field dt-field-invalid' : 'dt-field'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 12px',
        }}
      >
        {prefix ? <span style={{ color: 'var(--dt-muted)', display: 'inline-flex' }}>{prefix}</span> : null}
        <input
          id={inputId}
          type={type}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--dt-ink-strong)',
            padding: '11px 0',
            fontFamily: mono ? 'var(--dt-font-mono)' : 'var(--dt-font-sans)',
            fontSize: mono ? 13 : 14,
            ...style,
          }}
          {...rest}
        />
      </div>
      {hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{hint}</span> : null}
    </div>
  );
}
