// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/SegmentedControl.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
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
    return (<div ref={ref} className={cx('dt-segmented', className)} data-size={size} style={style} {...rest}>
        {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            const on = opt.value === current;
            return (<button key={opt.value} type="button" onClick={() => select(opt.value)} className="dt-segmented-item" data-active={on ? '' : undefined}>
              {opt.label}
            </button>);
        })}
      </div>);
});
SegmentedControl.displayName = 'SegmentedControl';
