import type { CSSProperties, SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    'defaultValue' | 'disabled' | 'id' | 'onChange' | 'style' | 'value'
  > {
  label?: string;
  hint?: string;
  options?: Array<string | SelectOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  style?: CSSProperties;
}

/** Flat native-backed select with a persimmon focus ring. */
export function Select({ label, hint, options = [], value, defaultValue, onChange, placeholder, disabled, id, style }: SelectProps) {
  const selId = id || (label ? `sel-${label.replace(/\s+/g, '-')}` : undefined);
  return (
    <div style={{ display: 'grid', gap: 7 }}>
      {label ? (
        <label htmlFor={selId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-muted-strong)' }}>
          {label}
        </label>
      ) : null}
      <div style={{ position: 'relative', display: 'flex' }}>
        <select
          id={selId}
          className="dt-field"
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            width: '100%',
            padding: '10px 36px 10px 13px',
            fontSize: 14,
            fontFamily: 'inherit',
            color: 'var(--dt-ink-strong)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.55 : 1,
            ...style,
          }}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 11,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: 'var(--dt-muted)',
          }}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{hint}</span> : null}
    </div>
  );
}
