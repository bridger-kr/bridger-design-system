// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/FilterChip.tsx
// Regenerate: pnpm generate

import { X } from 'lucide-react';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
/**
 * FilterChip — a toggleable filter / tag for catalog facets (분야, 프로토콜, 상태).
 * Crisp small-radius tag with a hairline, NOT a rounded-full cushion. Active =
 * persimmon tint + border + bold. Optional count (mono) and a removable ✕.
 * @startingPoint section="Core" subtitle="Toggleable catalog filter" viewport="520x80"
 */
export const FilterChip = forwardRef(function FilterChip({ label, count, active = false, removable = false, onToggle, onRemove, removeAriaLabel, icon, className, style }, ref) {
    const messages = useDSMessages();
    const toggle = (<button type="button" ref={removable ? undefined : ref} className={cx('dt-filter-chip', active && 'dt-filter-chip-active', !removable && className)} onClick={onToggle} aria-pressed={active} style={removable ? undefined : style}>
        {icon ? <span style={{ display: 'inline-flex', color: active ? 'var(--dt-accent-text)' : 'var(--dt-text-muted)' }} aria-hidden="true">{icon}</span> : null}
        <span>{label}</span>
        {count != null ? (<span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, fontWeight: 600, color: active ? 'var(--dt-accent-text)' : 'var(--dt-text-muted)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>) : null}
      </button>);
    if (!removable)
        return toggle;
    return (<span ref={ref} className={cx('dt-filter-chip-group', className)} data-active={active ? '' : undefined} style={style}>
        {toggle}
        <button type="button" className="dt-filter-chip-remove" aria-label={removeAriaLabel ?? messages.filterChip.removeAriaLabel(label)} onClick={onRemove} style={{ color: active ? 'var(--dt-accent-text)' : 'var(--dt-text-muted)' }}>
          <Icon icon={X} size="sm"/>
        </button>
      </span>);
});
FilterChip.displayName = 'FilterChip';
