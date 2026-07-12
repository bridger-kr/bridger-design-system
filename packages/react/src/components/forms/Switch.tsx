import { Switch as BaseSwitch } from '@base-ui-components/react/switch';
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
  const handleCheckedChange = (nextChecked: boolean) => {
    if (checked === undefined) setInternal(nextChecked);
    onChange?.(nextChecked);
  };

  const sw = (
    <BaseSwitch.Root
      render={<button type="button" disabled={disabled} />}
      nativeButton={true}
      checked={isOn}
      onClick={() => {
        if (!disabled) handleCheckedChange(!isOn);
      }}
      disabled={disabled}
      style={{
        width: 38,
        height: 22,
        flex: '0 0 auto',
        borderRadius: 9999,
        border: 'none',
        padding: 2,
        background: 'var(--dt-border-strong)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        transition: 'background-color 160ms var(--dt-ease)',
        display: 'inline-flex',
      }}
    >
      <BaseSwitch.Thumb
        style={{
          width: 18,
          height: 18,
          borderRadius: 9999,
          background: 'var(--dt-surface)',
          transition: 'transform 160ms var(--dt-ease)',
        }}
      />
      <style>{`[role="switch"][data-checked]{background:var(--dt-accent)!important}[role="switch"] span{transform:translateX(0);box-shadow:0 1px 2px color-mix(in srgb, var(--dt-ink-strong) 25%, transparent)}[role="switch"][data-checked] span{transform:translateX(16px)}`}</style>
    </BaseSwitch.Root>
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
    <BaseSwitch.Root
      render={<button type="button" disabled={disabled} />}
      nativeButton={true}
      checked={checked}
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => {
        if (!disabled) onChange(!checked);
      }}
      className={`relative inline-flex h-11 w-11 shrink-0 items-center rounded-full border border-transparent bg-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 h-6 rounded-full border transition-colors ${
          checked ? 'border-success/40 bg-success/80' : 'border-line-strong bg-raised'
        }`}
      />
      <BaseSwitch.Thumb
        aria-hidden
        className={`relative inline-block h-4 w-4 transform rounded-full bg-surface shadow-dtSubtle transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </BaseSwitch.Root>
  );
}
