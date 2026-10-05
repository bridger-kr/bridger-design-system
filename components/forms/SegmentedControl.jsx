// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/SegmentedControl.tsx
// Regenerate: pnpm generate

import { useState } from 'react';
/** Inset segmented control for 2–4 short, exclusive options. */
export function SegmentedControl({ options = [], value, defaultValue, onChange, size = 'md', style, }) {
    const firstOption = typeof options[0] === 'string' ? options[0] : options[0]?.value;
    const [internal, setInternal] = useState(defaultValue ?? firstOption);
    const current = value !== undefined ? value : internal;
    const select = (v) => {
        if (value === undefined)
            setInternal(v);
        onChange?.(v);
    };
    const pad = size === 'sm' ? '5px 11px' : '7px 14px';
    return (<div style={{
            display: 'inline-flex',
            padding: 3,
            gap: 2,
            background: 'var(--dt-surface-sunken)',
            borderRadius: 'var(--dt-radius-control)',
            ...style,
        }}>
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
}
