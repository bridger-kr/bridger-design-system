// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Checkbox.tsx
// Regenerate: pnpm generate

import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox';
import { Check } from 'lucide-react';
import { forwardRef, useId } from 'react';
import { cx } from '../lib/cx.jsx';
/** Checkbox — persimmon fill when checked. */
export const Checkbox = forwardRef(function Checkbox({ label, checked, defaultChecked, onChange, disabled, id, className, style, slotProps, ...rest }, ref) {
    const autoId = useId();
    const cbId = id ?? autoId;
    const labelId = label ? `${cbId}-label` : undefined;
    const handleCheckedChange = (nextChecked) => {
        onChange?.(nextChecked);
    };
    const { className: controlClassName, style: controlStyle, ...controlRest } = slotProps?.control ?? {};
    const { className: rootClassName, style: rootStyle, ...rootRest } = slotProps?.root ?? {};
    return (<label htmlFor={cbId} className={cx(className, rootClassName)} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.55 : 1,
            ...style,
            ...rootStyle,
        }} {...rootRest}>
      <BaseCheckbox.Root render={<button type="button"/>} nativeButton={true} ref={ref} id={cbId} checked={checked} defaultChecked={defaultChecked} onCheckedChange={handleCheckedChange} disabled={disabled} className={cx('dt-checkbox-control', controlClassName)} style={{
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
        }} aria-labelledby={labelId} {...rest} {...controlRest}>
        <span className="dt-checkbox-box">
          <BaseCheckbox.Indicator>
            {/* 12px box needs a heavier stroke than the 1.75 icon canon. */}
            <Check size={12} strokeWidth={2.5} color="var(--dt-accent-ink)" aria-hidden="true"/>
          </BaseCheckbox.Indicator>
        </span>
      </BaseCheckbox.Root>
      {label ? (<span id={labelId} style={{ fontSize: 14, color: 'var(--dt-text)' }} {...slotProps?.label}>
          {label}
        </span>) : null}
    </label>);
});
Checkbox.displayName = 'Checkbox';
