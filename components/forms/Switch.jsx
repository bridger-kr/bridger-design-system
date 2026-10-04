// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Switch.tsx
// Regenerate: pnpm generate

import { Switch as BaseSwitch } from '@base-ui-components/react/switch';
import { useState } from 'react';
/** Toggle switch for instant on/off settings — persimmon track when on. */
export function Switch({ checked, defaultChecked, onChange, disabled, label, style }) {
    const [internal, setInternal] = useState(defaultChecked ?? false);
    const isOn = checked !== undefined ? checked : internal;
    const handleCheckedChange = (nextChecked) => {
        if (checked === undefined)
            setInternal(nextChecked);
        onChange?.(nextChecked);
    };
    const sw = (<BaseSwitch.Root render={<button type="button" disabled={disabled}/>} nativeButton={true} checked={isOn} onClick={() => {
            if (!disabled)
                handleCheckedChange(!isOn);
        }} disabled={disabled} className="dt-switch-control" style={{
            position: 'relative',
            width: 'var(--dt-space-5)',
            height: 'var(--dt-space-5)',
            flex: '0 0 auto',
            borderRadius: 9999,
            border: 'none',
            padding: 0,
            background: 'transparent',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.55 : 1,
            display: 'inline-flex',
            alignItems: 'center',
        }}>
      <span aria-hidden="true" className="dt-switch-track" style={{
            position: 'absolute',
            left: 1,
            width: 38,
            height: 22,
            borderRadius: 9999,
            background: 'var(--dt-border-strong)',
            transition: 'background-color var(--dt-motion-fast)',
        }}/>
      <BaseSwitch.Thumb className="dt-switch-thumb" style={{
            position: 'relative',
            width: 18,
            height: 18,
            marginLeft: 3,
            borderRadius: 9999,
            background: 'var(--dt-surface)',
            transition: 'transform var(--dt-motion-fast)',
        }}/>
    </BaseSwitch.Root>);
    if (!label)
        return sw;
    return (<label style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            cursor: disabled ? 'not-allowed' : 'pointer',
            ...style,
        }}>
      {sw}
      <span style={{ fontSize: 14, color: 'var(--dt-ink)' }}>{label}</span>
    </label>);
}
export function ToggleSwitch({ checked, label, onChange, disabled = false, className = '', }) {
    return (<BaseSwitch.Root render={<button type="button" disabled={disabled}/>} nativeButton={true} checked={checked} aria-checked={checked} aria-label={label} disabled={disabled} onClick={() => {
            if (!disabled)
                onChange(!checked);
        }} className={`relative inline-flex h-11 w-11 shrink-0 items-center rounded-full border border-transparent bg-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`}>
      <span aria-hidden className={`pointer-events-none absolute inset-x-0 h-6 rounded-full border transition-colors ${checked ? 'border-success/40 bg-success/80' : 'border-line-strong bg-raised'}`}/>
      <BaseSwitch.Thumb aria-hidden className={`relative inline-block h-4 w-4 transform rounded-full bg-surface shadow-dtSubtle transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}/>
    </BaseSwitch.Root>);
}
