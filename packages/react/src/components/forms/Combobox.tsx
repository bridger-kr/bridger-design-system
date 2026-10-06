import { Combobox as BaseCombobox } from '@base-ui-components/react/combobox';
import { Check, Search } from 'lucide-react';
import { forwardRef, useId, useState } from 'react';
import type { CSSProperties, HTMLAttributes, Ref } from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';
import { useControllableState } from '../../lib/useControllableState';
import { Icon } from '../../lib/icon';
import type { SlotPropsFor } from '../../lib/slot';

export interface ComboboxOption {
  value: string;
  label: string;
  meta?: string;
}

export type ComboboxSlotProps = SlotPropsFor<{
  input: 'input';
  label: 'label';
  hint: 'span';
}>;

export interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'id' | 'onChange' | 'style'> {
  label?: string;
  hint?: string;
  options?: ComboboxOption[];
  /** Controlled selected option value. */
  value?: string;
  /** Uncontrolled initial selected option value. */
  defaultValue?: string;
  /** Called with the selected option's value. */
  onValueChange?: (value: string) => void;
  /** @deprecated Use `onValueChange`. Removed in v2.1. */
  onChange?: (value: string) => void;
  /** Controlled open state of the option list. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyText?: string;
  id?: string;
  /** Prop bags for inner elements (`input`, `label`, `hint`). */
  slotProps?: ComboboxSlotProps;
  style?: CSSProperties;
}

/**
 * Searchable select for large option sets (the 230+ public-data API catalog).
 * Hairline field; the listbox is a bordered plane. Filters on label + meta.
 * Controlled via `value`/`onValueChange` and `open`/`onOpenChange`, or
 * uncontrolled with `defaultValue`/`defaultOpen`.
 * @startingPoint section="Forms" subtitle="Searchable select over a large catalog" viewport="460x320"
 */
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  {
    label,
    hint,
    options = [],
    value,
    defaultValue,
    onValueChange,
    onChange,
    open,
    defaultOpen,
    onOpenChange,
    placeholder = '검색…',
    emptyText = '결과 없음',
    id,
    slotProps,
    className,
    style,
    ...rest
  },
  ref,
) {
  const [isOpen, setOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  });
  const [selectedValue, setSelectedValue] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: (next) => {
      onValueChange?.(next as string);
      onChange?.(next as string);
    },
  });
  const [query, setQuery] = useControllableState<string>({ defaultValue: '' });
  const autoId = useId();
  const cbId = id ?? autoId;
  const hintId = hint ? `${cbId}-hint` : undefined;

  if (onChange !== undefined) {
    warnOnce('combobox-onchange', 'Combobox: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
  }

  const selected = options.find((o) => o.value === selectedValue) || null;
  const q = (query ?? '').trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => (o.label + ' ' + (o.meta || '')).toLowerCase().includes(q))
    : options;

  const commit = (o: ComboboxOption) => {
    setSelectedValue(o.value);
    setOpen(false);
    setQuery('');
  };

  const handleInputValueChange = (inputValue: string) => {
    setQuery(inputValue);
  };

  const handleValueChange = (nextValue: ComboboxOption | null) => {
    if (nextValue) commit(nextValue);
  };

  const { className: inputClassName, ...inputRest } = slotProps?.input ?? {};

  return (
    <BaseCombobox.Root<ComboboxOption>
      open={isOpen}
      onOpenChange={setOpen}
      value={selected ?? undefined}
      items={filtered}
      itemToStringLabel={(option) => option.label}
      isItemEqualToValue={(itemValue, selectedOption) => itemValue.value === selectedOption.value}
      onInputValueChange={handleInputValueChange}
      onValueChange={handleValueChange}
    >
    <div className={cx('dt-combobox', className)} style={style} {...rest}>
      {label ? (
        <label htmlFor={cbId} className="dt-input-label" {...slotProps?.label}>
          {label}
        </label>
      ) : null}
      <div className="dt-field dt-combobox-field">
        <Icon icon={Search} className="dt-combobox-field-icon" />
        <BaseCombobox.Input
          id={cbId}
          ref={ref as Ref<HTMLInputElement>}
          value={isOpen ? query : selected ? selected.label : ''}
          placeholder={selected && !isOpen ? selected.label : placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          aria-describedby={hintId}
          className={cx('dt-input-control', inputClassName)}
          {...inputRest}
        />
        {selected && !isOpen ? (
          <span className="dt-combobox-selected-meta">
            {selected.meta}
          </span>
        ) : null}
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner sideOffset={6}>
          <BaseCombobox.Popup className="dt-combobox-popup">
          {filtered.length === 0 ? (
            <BaseCombobox.Empty className="dt-combobox-empty">{emptyText}</BaseCombobox.Empty>
          ) : (
            <BaseCombobox.List>
            {filtered.map((o) => {
              const isSel = o.value === selectedValue;
              return (
                <BaseCombobox.Item
                  key={o.value}
                  value={o}
                  className="dt-combobox-option"
                >
                  <span className="dt-combobox-option-label">
                    {o.label}
                  </span>
                  {o.meta ? (
                    <span className="dt-combobox-option-meta">
                      {o.meta}
                    </span>
                  ) : null}
                  {isSel ? (
                    <Icon icon={Check} className="dt-combobox-option-check" />
                  ) : null}
                </BaseCombobox.Item>
              );
            })}
            </BaseCombobox.List>
          )}
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
      {hint ? (
        <span id={hintId} className="dt-input-hint" {...slotProps?.hint}>
          {hint}
        </span>
      ) : null}
    </div>
    </BaseCombobox.Root>
  );
});
Combobox.displayName = 'Combobox';
