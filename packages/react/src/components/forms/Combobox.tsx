import { Combobox as BaseCombobox } from '@base-ui-components/react/combobox';
import { useState } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';

export interface ComboboxOption {
  value: string;
  label: string;
  meta?: string;
}

export interface ComboboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'onChange' | 'style'> {
  label?: string;
  hint?: string;
  options?: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  id?: string;
  style?: CSSProperties;
}

/**
 * Searchable select for large option sets (the 230+ public-data API catalog).
 * Hairline field; the listbox is a bordered plane. Filters on label + meta.
 * @startingPoint section="Forms" subtitle="Searchable select over a large catalog" viewport="460x320"
 */
export function Combobox({
  label,
  hint,
  options = [],
  value,
  onChange,
  placeholder = '검색…',
  emptyText = '결과 없음',
  id,
  style,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const cbId = id || (label ? `cb-${label.replace(/\s+/g, '-')}` : undefined);

  const selected = options.find((o) => o.value === value) || null;
  const q = query.trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => (o.label + ' ' + (o.meta || '')).toLowerCase().includes(q))
    : options;

  const commit = (o: ComboboxOption) => {
    onChange?.(o.value);
    setOpen(false);
    setQuery('');
  };

  const handleInputValueChange = (inputValue: string) => {
    setQuery(inputValue);
  };

  const handleValueChange = (nextValue: ComboboxOption | null) => {
    if (nextValue) commit(nextValue);
  };

  return (
    <BaseCombobox.Root<ComboboxOption>
      open={open}
      onOpenChange={setOpen}
      value={selected ?? undefined}
      items={filtered}
      itemToStringLabel={(option) => option.label}
      isItemEqualToValue={(itemValue, selectedValue) => itemValue.value === selectedValue.value}
      onInputValueChange={handleInputValueChange}
      onValueChange={handleValueChange}
    >
    <div className="dt-combobox" style={style}>
      {label ? (
        <label htmlFor={cbId} className="dt-input-label">
          {label}
        </label>
      ) : null}
      <div className="dt-field dt-combobox-field">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="dt-combobox-field-icon"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <BaseCombobox.Input
          id={cbId}
          value={open ? query : selected ? selected.label : ''}
          placeholder={selected && !open ? selected.label : placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="dt-input-control"
        />
        {selected && !open ? (
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
              const isSel = o.value === value;
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
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="dt-combobox-option-check"
                    >
                      <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </BaseCombobox.Item>
              );
            })}
            </BaseCombobox.List>
          )}
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
      {hint ? <span className="dt-input-hint">{hint}</span> : null}
    </div>
    </BaseCombobox.Root>
  );
}
