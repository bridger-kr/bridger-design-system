import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox';
import { Check } from 'lucide-react';
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
        gap: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        ...style,
      }}
    >
      <BaseCheckbox.Root
        render={<button type="button" />}
        nativeButton={true}
        id={cbId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        className="dt-checkbox-control"
        style={{
          width: 'var(--dt-space-5)',
          height: 'var(--dt-space-5)',
          flex: '0 0 auto',
          display: 'grid',
          placeItems: 'center',
          border: 0,
          background: 'transparent',
          padding: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        <span
          className="dt-checkbox-box"
          style={{
            width: 18,
            height: 18,
            borderRadius: 'var(--dt-radius-control)',
            display: 'grid',
            placeItems: 'center',
            background: 'var(--dt-surface)',
            border: '1.5px solid var(--dt-border-strong)',
            transition: 'background-color var(--dt-duration-fast) var(--dt-ease), border-color var(--dt-duration-fast) var(--dt-ease)',
          }}
        >
          <BaseCheckbox.Indicator>
            {/* 12px box needs a heavier stroke than the 1.75 icon canon. */}
            <Check size={12} strokeWidth={2.5} color="var(--dt-accent-ink)" aria-hidden="true" />
          </BaseCheckbox.Indicator>
        </span>
      </BaseCheckbox.Root>
      {label ? <span style={{ fontSize: 14, color: 'var(--dt-text)' }}>{label}</span> : null}
    </label>
  );
}
