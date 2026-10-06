import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { Check } from 'lucide-react';
import { forwardRef, useId } from 'react';
import type { ComponentProps, ComponentPropsWithRef, CSSProperties, DOMAttributes, InputHTMLAttributes, ReactNode, Ref } from 'react';
import { cx } from '../../lib/cx';
import type { SlotPropsFor } from '../../lib/slot';

export type CheckboxSlotProps = SlotPropsFor<{
  root: 'label';
  label: 'span';
}> & {
  /** Extra props for the control button. Event handlers are intentionally not
   * part of this bag — use the top-level `onChange`. */
  control?: Omit<ComponentPropsWithRef<'button'>, keyof DOMAttributes<HTMLButtonElement> | 'value'> & {
    value?: string;
  };
};

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'className' | 'defaultChecked' | 'disabled' | 'id' | 'label' | 'onChange' | 'style' | 'value'
  > {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  /** Value submitted with the form when checked. */
  value?: string;
  /** Root `<label>` class. Reach the control via `slotProps.control`. */
  className?: string;
  /** Root `<label>` style. */
  style?: CSSProperties;
  /** Prop bags for inner elements (`root` label, `control` button, `label` text). */
  slotProps?: CheckboxSlotProps;
}

/** Checkbox — persimmon fill when checked. */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { label, checked, defaultChecked, onChange, disabled, id, className, style, slotProps, ...rest },
  ref,
) {
  const autoId = useId();
  const cbId = id ?? autoId;
  const handleCheckedChange = (nextChecked: boolean) => {
    onChange?.(nextChecked);
  };
  const { className: controlClassName, style: controlStyle, ...controlRest } = slotProps?.control ?? {};
  const { className: rootClassName, style: rootStyle, ...rootRest } = slotProps?.root ?? {};

  return (
    <label
      htmlFor={cbId}
      className={cx(className, rootClassName)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1,
        ...style,
        ...rootStyle,
      }}
      {...rootRest}
    >
      <BaseCheckbox.Root
        render={<button type="button" />}
        nativeButton={true}
        ref={ref as Ref<HTMLButtonElement>}
        id={cbId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        className={cx('dt-checkbox-control', controlClassName)}
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
          ...controlStyle,
        }}
        {...(rest as ComponentProps<typeof BaseCheckbox.Root>)}
        {...(controlRest as ComponentProps<typeof BaseCheckbox.Root>)}
      >
        <span className="dt-checkbox-box">
          <BaseCheckbox.Indicator>
            {/* 12px box needs a heavier stroke than the 1.75 icon canon. */}
            <Check size={12} strokeWidth={2.5} color="var(--dt-accent-ink)" aria-hidden="true" />
          </BaseCheckbox.Indicator>
        </span>
      </BaseCheckbox.Root>
      {label ? (
        <span style={{ fontSize: 14, color: 'var(--dt-text)' }} {...slotProps?.label}>
          {label}
        </span>
      ) : null}
    </label>
  );
});
Checkbox.displayName = 'Checkbox';
