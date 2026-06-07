import { useState } from 'react';
import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

export interface SwitchProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'defaultChecked' | 'disabled' | 'id' | 'onChange' | 'style'
  > {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  id?: string;
  style?: CSSProperties;
}

/** Toggle switch for instant on/off settings — persimmon track when on. */
export function Switch({ checked, defaultChecked, onChange, disabled, label, style }: SwitchProps) {
  const [internal, setInternal] = useState(defaultChecked ?? false);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal((v) => !v);
    onChange?.(!isOn);
  };
  const sw = (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={toggle}
      style={{
        width: 38,
        height: 22,
        flex: '0 0 auto',
        borderRadius: 9999,
        border: 'none',
        padding: 2,
        background: isOn ? 'var(--dt-accent)' : 'var(--dt-border-strong)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'background-color 160ms var(--dt-ease)',
        display: 'inline-flex',
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 9999,
          background: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
          transform: isOn ? 'translateX(16px)' : 'translateX(0)',
          transition: 'transform 160ms var(--dt-ease)',
        }}
      />
    </button>
  );
  if (!label) return sw;
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
    >
      {sw}
      <span style={{ fontSize: 14, color: 'var(--dt-ink)' }}>{label}</span>
    </label>
  );
}
