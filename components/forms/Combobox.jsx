// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Combobox.tsx
// Regenerate: pnpm generate

import { Combobox as BaseCombobox } from '@base-ui-components/react/combobox';
import { Check, Search } from 'lucide-react';
import { forwardRef, useId } from 'react';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
import { useControllableState } from '../lib/useControllableState.jsx';
import { Icon } from '../lib/icon.jsx';
/**
 * Searchable select for large option sets (the 230+ public-data API catalog).
 * Hairline field; the listbox is a bordered plane. Filters on label + meta.
 * Controlled via `value`/`onValueChange` and `open`/`onOpenChange`, or
 * uncontrolled with `defaultValue`/`defaultOpen`.
 * @startingPoint section="Forms" subtitle="Searchable select over a large catalog" viewport="460x320"
 */
export const Combobox = forwardRef(function Combobox({ label, hint, options = [], value, defaultValue, onValueChange, onChange, open, defaultOpen, onOpenChange, placeholder = '검색…', emptyText = '결과 없음', id, slotProps, className, style, ...rest }, ref) {
    const [isOpen, setOpen] = useControllableState({
        value: open,
        defaultValue: defaultOpen ?? false,
        onChange: onOpenChange,
    });
    const [selectedValue, setSelectedValue] = useControllableState({
        value,
        defaultValue,
        onChange: (next) => {
            onValueChange?.(next);
            onChange?.(next);
        },
    });
    const [query, setQuery] = useControllableState({ defaultValue: '' });
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
    const commit = (o) => {
        setSelectedValue(o.value);
        setOpen(false);
        setQuery('');
    };
    const handleInputValueChange = (inputValue) => {
        setQuery(inputValue);
    };
    const handleValueChange = (nextValue) => {
        if (nextValue)
            commit(nextValue);
    };
    const { className: inputClassName, ...inputRest } = slotProps?.input ?? {};
    return (<BaseCombobox.Root open={isOpen} onOpenChange={setOpen} value={selected ?? undefined} items={filtered} itemToStringLabel={(option) => option.label} isItemEqualToValue={(itemValue, selectedOption) => itemValue.value === selectedOption.value} onInputValueChange={handleInputValueChange} onValueChange={handleValueChange}>
    <div className={cx('dt-combobox', className)} style={style} {...rest}>
      {label ? (<label htmlFor={cbId} className="dt-input-label" {...slotProps?.label}>
          {label}
        </label>) : null}
      <div className="dt-field dt-combobox-field">
        <Icon icon={Search} className="dt-combobox-field-icon"/>
        <BaseCombobox.Input id={cbId} ref={ref} value={isOpen ? query : selected ? selected.label : ''} placeholder={selected && !isOpen ? selected.label : placeholder} onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
        }} onFocus={() => setOpen(true)} aria-describedby={hintId} className={cx('dt-input-control', inputClassName)} {...inputRest}/>
        {selected && !isOpen ? (<span className="dt-combobox-selected-meta">
            {selected.meta}
          </span>) : null}
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner sideOffset={6}>
          <BaseCombobox.Popup className="dt-combobox-popup">
          {filtered.length === 0 ? (<BaseCombobox.Empty className="dt-combobox-empty">{emptyText}</BaseCombobox.Empty>) : (<BaseCombobox.List>
            {filtered.map((o) => {
                const isSel = o.value === selectedValue;
                return (<BaseCombobox.Item key={o.value} value={o} className="dt-combobox-option">
                  <span className="dt-combobox-option-label">
                    {o.label}
                  </span>
                  {o.meta ? (<span className="dt-combobox-option-meta">
                      {o.meta}
                    </span>) : null}
                  {isSel ? (<Icon icon={Check} className="dt-combobox-option-check"/>) : null}
                </BaseCombobox.Item>);
            })}
            </BaseCombobox.List>)}
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
      {hint ? (<span id={hintId} className="dt-input-hint" {...slotProps?.hint}>
          {hint}
        </span>) : null}
    </div>
    </BaseCombobox.Root>);
});
Combobox.displayName = 'Combobox';
