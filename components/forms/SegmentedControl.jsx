// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/SegmentedControl.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { warnOnce } from '../lib/deprecate.jsx';
import { useControllableState } from '../lib/useControllableState.jsx';
/** Inset segmented control for 2–4 short, exclusive options. */
export const SegmentedControl = forwardRef(function SegmentedControl({ options = [], value, defaultValue, onValueChange, onChange, size = 'md', className, style, ...rest }, ref) {
    const firstOption = typeof options[0] === 'string' ? options[0] : options[0]?.value;
    if (onChange !== undefined) {
        warnOnce('segmented-onchange', 'SegmentedControl: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
    }
    const [current, select] = useControllableState({
        value,
        defaultValue: defaultValue ?? firstOption,
        onChange: (next) => {
            onValueChange?.(next);
            onChange?.(next);
        },
    });
    const pad = size === 'sm' ? '5px 11px' : '7px 14px';
    return (<div ref={ref} className={className} style={{
            display: 'inline-flex',
            padding: 3,
            gap: 2,
            background: 'var(--dt-surface-sunken)',
            borderRadius: 'var(--dt-radius-control)',
            ...style,
        }} {...rest}>
        {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            const on = opt.value === current;
            return (<button key={opt.value} type="button" onClick={() => select(opt.value)} style={{
                    border: on ? '1px solid var(--dt-border)' : '1px solid transparent',
                    cursor: 'pointer',
                    padding: pad,
                    borderRadius: 'var(--dt-radius-chip)',
                    fontSize: size === 'sm' ? 12 : 13,
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    color: on ? 'var(--dt-text-strong)' : 'var(--dt-text-muted)',
                    background: on ? 'var(--dt-surface)' : 'transparent',
                    transition: 'color var(--dt-duration-fast) var(--dt-ease), background-color var(--dt-duration-fast) var(--dt-ease)',
                }}>
              {opt.label}
            </button>);
        })}
      </div>);
});
SegmentedControl.displayName = 'SegmentedControl';
