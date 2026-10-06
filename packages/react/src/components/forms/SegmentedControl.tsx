import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
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
    const pad = size === 'sm' ? '5px 11px' : '7px 14px';
    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'inline-flex',
          padding: 3,
          gap: 2,
          background: 'var(--dt-surface-sunken)',
          borderRadius: 'var(--dt-radius-control)',
          ...style,
        }}
        {...rest}
      >
        {options.map((o) => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          const on = opt.value === current;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => select(opt.value)}
              style={{
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
              }}
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
