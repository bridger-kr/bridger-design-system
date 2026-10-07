import { Select as BaseSelect } from '@base-ui/react/select';
import { ChevronDown } from 'lucide-react';
import { forwardRef, useId } from 'react';
import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';
import type { SlotPropsFor } from '../../lib/slot';
import { Icon } from '../../lib/icon';

export interface SelectOption {
  value: string;
  label: string;
}

export type SelectSlotProps = SlotPropsFor<{
  trigger: 'button';
  label: 'label';
  hint: 'span';
}>;

export interface SelectProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    'className' | 'defaultValue' | 'onChange' | 'style'
  > {
  label?: string;
  hint?: string;
  options?: Array<string | SelectOption>;
  /** Controlled selected value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Called with the newly selected value. */
  onValueChange?: (value: string) => void;
  /** @deprecated Use `onValueChange`. Removed in v2.1. */
  onChange?: (value: string) => void;
  /** Controlled open state of the option list. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  required?: boolean;
  /** Prop bags for inner elements (`trigger` button, `label`, `hint`). */
  slotProps?: SelectSlotProps;
  /** Root `<div>` class. */
  className?: string;
  style?: CSSProperties;
}

/** Flat select with a persimmon focus ring. */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    label,
    hint,
    options = [],
    value,
    defaultValue,
    onValueChange,
    onChange,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-invalid': ariaInvalid,
    'aria-required': ariaRequired,
    open,
    defaultOpen,
    onOpenChange,
    placeholder,
    disabled,
    id,
    name,
    required,
    slotProps,
    className,
    style,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const selId = id ?? autoId;
  const hintId = hint ? `${selId}-hint` : undefined;
  const normalizedOptions = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const selectedOption = normalizedOptions.find((option) => option.value === value);

  if (onChange !== undefined) {
    warnOnce('select-onchange', 'Select: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
  }
  const handleValueChange = (nextValue: string | null) => {
    if (nextValue !== null) {
      onValueChange?.(nextValue);
      onChange?.(nextValue);
    }
  };
  const { className: triggerClassName, ...triggerRest } = slotProps?.trigger ?? {};

  return (
    <div className={cx('dt-select', className)} style={style} {...rest}>
      {label ? (
        <label htmlFor={selId} className="dt-input-label" {...slotProps?.label}>
          {label}
        </label>
      ) : null}
      <div className="dt-select-box">
        <BaseSelect.Root<string>
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          name={name}
          required={required}
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)}
          onValueChange={handleValueChange}
        >
          <BaseSelect.Trigger
            id={selId}
            ref={ref as Ref<HTMLButtonElement>}
            className={cx('dt-field dt-select-trigger', triggerClassName)}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedby ?? hintId}
            aria-invalid={ariaInvalid}
            aria-required={ariaRequired ?? (required ? true : undefined)}
            {...triggerRest}
          >
            <BaseSelect.Value>{selectedOption?.label ?? placeholder ?? ''}</BaseSelect.Value>
          </BaseSelect.Trigger>
          <BaseSelect.Portal>
            {/* z-index lives on the positioner — it is the positioned element; a
                z-index on the static popup is ignored and loses to app stacking
                contexts (e.g. `.dashboard-page { z-index: 1 }`). */}
            <BaseSelect.Positioner sideOffset={6} alignItemWithTrigger={false} className="dt-select-positioner">
              <BaseSelect.Popup className="dt-select-popup">
                <BaseSelect.List>
                  {normalizedOptions.map((opt) => (
                    <BaseSelect.Item
                      key={opt.value}
                      value={opt.value}
                      className="dt-select-option"
                    >
                      <BaseSelect.ItemText>{opt.label}</BaseSelect.ItemText>
                    </BaseSelect.Item>
                  ))}
                </BaseSelect.List>
              </BaseSelect.Popup>
            </BaseSelect.Positioner>
          </BaseSelect.Portal>
        </BaseSelect.Root>
        <Icon icon={ChevronDown} className="dt-select-chevron" />
      </div>
      {hint ? (
        <span id={hintId} className="dt-input-hint" {...slotProps?.hint}>
          {hint}
        </span>
      ) : null}
    </div>
  );
});
Select.displayName = 'Select';
