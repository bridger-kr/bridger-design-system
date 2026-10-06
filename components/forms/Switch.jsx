// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Switch.tsx
// Regenerate: pnpm generate

import { Switch as BaseSwitch } from '@base-ui-components/react/switch';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { useControllableState } from '../lib/useControllableState.jsx';
/** Toggle switch for instant on/off settings — persimmon track when on. */
export const Switch = forwardRef(function Switch({ checked, defaultChecked, onChange, disabled, label, id, name, uncheckedValue, required, className, style, ...rest }, ref) {
    const [isOn, setIsOn] = useControllableState({
        value: checked,
        defaultValue: defaultChecked ?? false,
        onChange,
    });
    const on = isOn === true;
    const handleCheckedChange = (nextChecked) => {
        setIsOn(nextChecked);
    };
    const sw = (<BaseSwitch.Root render={<button type="button" disabled={disabled}/>} nativeButton={true} ref={ref} id={id} name={name} uncheckedValue={uncheckedValue} required={required} checked={on} onCheckedChange={handleCheckedChange} disabled={disabled} className={cx('dt-switch-control', !label && className)} style={{
            position: 'relative',
            width: 'var(--dt-space-5)',
            height: 'var(--dt-space-5)',
            flex: '0 0 auto',
            borderRadius: 'var(--dt-radius-pill)',
            border: 'none',
            padding: 0,
            background: 'transparent',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.55 : 1,
            display: 'inline-flex',
            alignItems: 'center',
            ...(!label ? style : undefined),
        }} {...rest}>
      <span aria-hidden="true" className="dt-switch-track"/>
      <BaseSwitch.Thumb className="dt-switch-thumb" style={{
            position: 'relative',
            width: 18,
            height: 18,
            marginLeft: 3,
            borderRadius: 9999,
            background: 'var(--dt-surface)',
            transition: 'transform var(--dt-duration-fast) var(--dt-ease)',
        }}/>
    </BaseSwitch.Root>);
    if (!label)
        return sw;
    return (<label className={className} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            cursor: disabled ? 'not-allowed' : 'pointer',
            ...style,
        }}>
      {sw}
      <span style={{ fontSize: 14, color: 'var(--dt-text)' }}>{label}</span>
    </label>);
});
Switch.displayName = 'Switch';
/** @deprecated Alias of `Switch` kept for one minor cycle; prefer `Switch`. */
export const ToggleSwitch = forwardRef(function ToggleSwitch({ checked, label, onChange, disabled = false, className = '', style }, ref) {
    return (<BaseSwitch.Root render={<button type="button" disabled={disabled}/>} nativeButton={true} ref={ref} checked={checked} aria-checked={checked} aria-label={label} disabled={disabled} onClick={() => {
            if (!disabled)
                onChange(!checked);
        }} className={`relative inline-flex h-11 w-11 shrink-0 items-center rounded-full border border-transparent bg-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`} style={style}>
      <span aria-hidden className={`pointer-events-none absolute inset-x-0 h-6 rounded-full border transition-colors ${checked ? 'border-success/40 bg-success/80' : 'border-line-strong bg-raised'}`}/>
      <BaseSwitch.Thumb aria-hidden className={`relative inline-block h-4 w-4 transform rounded-full bg-surface shadow-dtSubtle transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}/>
    </BaseSwitch.Root>);
});
ToggleSwitch.displayName = 'ToggleSwitch';
