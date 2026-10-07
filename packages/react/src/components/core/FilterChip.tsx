import { X } from 'lucide-react';
import { forwardRef } from 'react';
import type { CSSProperties, ReactNode, Ref } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../../lib/icon';
import { useDSMessages } from '../../locale/DSLocaleProvider';

export interface FilterChipProps {
  label: string;
  /** Trailing count, rendered tabular-mono. */
  count?: number;
  active?: boolean;
  removable?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  /** Accessible name for the remove button; defaults to the ambient locale. */
  removeAriaLabel?: string;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * FilterChip — a toggleable filter / tag for catalog facets (분야, 프로토콜, 상태).
 * Crisp small-radius tag with a hairline, NOT a rounded-full cushion. Active =
 * persimmon tint + border + bold. Optional count (mono) and a removable ✕.
 * @startingPoint section="Core" subtitle="Toggleable catalog filter" viewport="520x80"
 */
export const FilterChip = forwardRef<HTMLSpanElement | HTMLButtonElement, FilterChipProps>(
  function FilterChip({ label, count, active = false, removable = false, onToggle, onRemove,
    removeAriaLabel, icon, className, style }, ref) {
  const messages = useDSMessages();
    const toggle = (
      <button
        type="button"
        ref={removable ? undefined : (ref as Ref<HTMLButtonElement>)}
        className={cx('dt-filter-chip', active && 'dt-filter-chip-active', !removable && className)}
        onClick={onToggle}
        aria-pressed={active}
        style={removable ? undefined : style}
      >
        {icon ? <span className="dt-filter-chip-icon" aria-hidden="true">{icon}</span> : null}
        <span>{label}</span>
        {count != null ? (
          <span className="dt-filter-chip-count">{count}</span>
        ) : null}
      </button>
    );

    if (!removable) return toggle;

    return (
      <span
        ref={ref as Ref<HTMLSpanElement>}
        className={cx('dt-filter-chip-group', className)}
        data-active={active ? '' : undefined}
        style={style}
      >
        {toggle}
        <button
          type="button"
          className="dt-filter-chip-remove"
          aria-label={removeAriaLabel ?? messages.filterChip.removeAriaLabel(label)}
          onClick={onRemove}
        >
          <Icon icon={X} size="sm" />
        </button>
      </span>
    );
  },
);
FilterChip.displayName = 'FilterChip';
