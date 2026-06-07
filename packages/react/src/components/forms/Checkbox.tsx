import { useState } from 'react';
import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'defaultChecked' | 'disabled' | 'id' | 'label' | 'onChange' | 'style'
  > {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  style?: CSSProperties;
}

/** Checkbox — persimmon fill when checked. */
export function Checkbox({ label, checked, defaultChecked, onChange, disabled, id, style }: CheckboxProps) {
  const cbId = id || (label ? `cb-${String(label).replace(/\s+/g, '-')}` : undefined);
  const [internal, setInternal] = useState(defaultChecked ?? false);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal((v) => !v);
    onChange?.(!isOn);
  };
  return (
    <label
      htmlFor={cbId}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
    >
      <input
        id={cbId}
        type="checkbox"
        checked={isOn}
        onChange={toggle}
        disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          width: 18,
          height: 18,
          flex: '0 0 auto',
          borderRadius: 5,
          display: 'grid',
          placeItems: 'center',
          background: isOn ? 'var(--dt-accent)' : 'var(--dt-surface)',
          border: `1.5px solid ${isOn ? 'var(--dt-accent)' : 'var(--dt-border-strong)'}`,
          transition: 'background-color 130ms, border-color 130ms',
        }}
      >
        {isOn ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12l4.5 4.5L19 7"
              stroke="var(--dt-accent-ink)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      {label ? <span style={{ fontSize: 14, color: 'var(--dt-ink)' }}>{label}</span> : null}
    </label>
  );
}
