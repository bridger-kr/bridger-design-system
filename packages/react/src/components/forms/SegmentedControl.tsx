import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';
import { useControllableState } from '../../lib/useControllableState';

export interface SegmentOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'style'> {
  options?: Array<string | SegmentOption>;
  value?: string;
  defaultValue?: string;
  /** Called with the newly selected value. */
  onValueChange?: (value: string) => void;
  /** @deprecated Use `onValueChange`. Removed in v2.1. */
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  style?: CSSProperties;
}

/** Inset segmented control for 2–4 short, exclusive options. */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(
    { options = [], value, defaultValue, onValueChange, onChange, size = 'md', className, style, ...rest },
    ref,
  ) {
    const firstOption = typeof options[0] === 'string' ? options[0] : options[0]?.value;
    if (onChange !== undefined) {
      warnOnce('segmented-onchange', 'SegmentedControl: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
    }
    const [current, select] = useControllableState<string>({
      value,
      defaultValue: defaultValue ?? firstOption,
      onChange: (next) => {
        onValueChange?.(next);
        onChange?.(next);
      },
    });
    return (
      <div
        ref={ref}
        role="group"
        className={cx('dt-segmented', className)}
        data-size={size}
        style={style}
        {...rest}
      >
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          const on = opt.value === current;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={on}
              onClick={() => select(opt.value)}
              className="dt-segmented-item"
              data-active={on ? '' : undefined}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  },
);
SegmentedControl.displayName = 'SegmentedControl';
