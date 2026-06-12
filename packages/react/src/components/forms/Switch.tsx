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

export interface ToggleSwitchProps {
  readonly checked: boolean;
  readonly label: string;
  readonly onChange: (next: boolean) => void;
  readonly disabled?: boolean;
  readonly className?: string;
}

export function ToggleSwitch({
  checked,
  label,
  onChange,
  disabled = false,
  className = '',
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? 'border-success/40 bg-success/80' : 'border-line-strong bg-raised'
      } ${className}`}
    >
      <span
        aria-hidden
        className={`inline-block h-4 w-4 transform rounded-full bg-surface shadow-dtSubtle transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
