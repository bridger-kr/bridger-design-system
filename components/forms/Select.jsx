// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Select.tsx
// Regenerate: pnpm generate

import { Select as BaseSelect } from '@base-ui/react/select';
import { ChevronDown } from 'lucide-react';
import { forwardRef, useId } from 'react';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
import { Icon } from '../lib/icon.jsx';
/** Flat select with a persimmon focus ring. */
export const Select = forwardRef(function Select({ label, hint, options = [], value, defaultValue, onValueChange, onChange, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby, 'aria-invalid': ariaInvalid, 'aria-required': ariaRequired, open, defaultOpen, onOpenChange, placeholder, disabled, id, name, required, slotProps, className, style, ...rest }, ref) {
    const autoId = useId();
    const selId = id ?? autoId;
    const hintId = hint ? `${selId}-hint` : undefined;
    const normalizedOptions = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
    const selectedOption = normalizedOptions.find((option) => option.value === value);
    if (onChange !== undefined) {
        warnOnce('select-onchange', 'Select: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
    }
    const handleValueChange = (nextValue) => {
        if (nextValue !== null) {
            onValueChange?.(nextValue);
            onChange?.(nextValue);
        }
    };
    const { className: triggerClassName, ...triggerRest } = slotProps?.trigger ?? {};
    return (<div className={cx('dt-select', className)} style={style} {...rest}>
      {label ? (<label htmlFor={selId} className="dt-input-label" {...slotProps?.label}>
          {label}
        </label>) : null}
      <div className="dt-select-box">
        <BaseSelect.Root value={value} defaultValue={defaultValue} disabled={disabled} name={name} required={required} open={open} defaultOpen={defaultOpen} onOpenChange={(nextOpen) => onOpenChange?.(nextOpen)} onValueChange={handleValueChange}>
          <BaseSelect.Trigger id={selId} ref={ref} className={cx('dt-field dt-select-trigger', triggerClassName)} aria-label={ariaLabel} aria-labelledby={ariaLabelledby} aria-describedby={ariaDescribedby ?? hintId} aria-invalid={ariaInvalid} aria-required={ariaRequired ?? (required ? true : undefined)} {...triggerRest}>
            <BaseSelect.Value>{selectedOption?.label ?? placeholder ?? ''}</BaseSelect.Value>
          </BaseSelect.Trigger>
          <BaseSelect.Portal>
            {/* z-index lives on the positioner — it is the positioned element; a
            z-index on the static popup is ignored and loses to app stacking
            contexts (e.g. `.dashboard-page { z-index: 1 }`). */}
            <BaseSelect.Positioner sideOffset={6} alignItemWithTrigger={false} style={{ zIndex: 'var(--dt-z-index-popover)' }}>
              <BaseSelect.Popup className="dt-select-popup">
                <BaseSelect.List>
                  {normalizedOptions.map((opt) => (<BaseSelect.Item key={opt.value} value={opt.value} className="dt-select-option">
                      <BaseSelect.ItemText>{opt.label}</BaseSelect.ItemText>
                    </BaseSelect.Item>))}
                </BaseSelect.List>
              </BaseSelect.Popup>
            </BaseSelect.Positioner>
          </BaseSelect.Portal>
        </BaseSelect.Root>
        <Icon icon={ChevronDown} className="dt-select-chevron"/>
      </div>
      {hint ? (<span id={hintId} className="dt-input-hint" {...slotProps?.hint}>
          {hint}
        </span>) : null}
    </div>);
});
Select.displayName = 'Select';
