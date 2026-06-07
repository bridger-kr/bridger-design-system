import React from 'react';

/** Multi-line text field. Flat hairline; persimmon focus ring. */
export function Textarea({ label, hint, rows = 4, mono = false, id, style, ...rest }) {
  const taId = id || (label ? `ta-${label.replace(/\s+/g, '-')}` : undefined);
  return (
    <div style={{ display: 'grid', gap: 7 }}>
      {label ? <label htmlFor={taId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-muted-strong)' }}>{label}</label> : null}
      <textarea
        id={taId} rows={rows}
        className="dt-field"
        style={{
          width: '100%', resize: 'vertical', padding: '11px 13px', fontSize: mono ? 13 : 14,
          fontFamily: mono ? 'var(--dt-font-mono)' : 'inherit', lineHeight: 1.55,
          color: 'var(--dt-ink-strong)', ...style,
        }}
        {...rest}
      />
      {hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{hint}</span> : null}
    </div>
  );
}
