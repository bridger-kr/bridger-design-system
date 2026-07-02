import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox';
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
  const handleCheckedChange = (nextChecked: boolean) => {
    onChange?.(nextChecked);
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
      <BaseCheckbox.Root
        render={<button type="button" />}
        id={cbId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        style={{
          width: 18,
          height: 18,
          flex: '0 0 auto',
          borderRadius: 5,
          display: 'grid',
          placeItems: 'center',
          background: 'var(--dt-surface)',
          border: '1.5px solid var(--dt-border-strong)',
          transition: 'background-color 130ms, border-color 130ms',
        }}
      >
        <BaseCheckbox.Indicator>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12l4.5 4.5L19 7"
              stroke="var(--dt-accent-ink)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <style>{`[role="checkbox"][data-checked]{background:var(--dt-accent)!important;border-color:var(--dt-accent)!important}`}</style>
      {label ? <span style={{ fontSize: 14, color: 'var(--dt-ink)' }}>{label}</span> : null}
    </label>
  );
}
