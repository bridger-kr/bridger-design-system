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

  return (
    <BaseCombobox.Root<ComboboxOption>
      open={open}
      onOpenChange={setOpen}
      value={selected ?? undefined}
      items={filtered}
      itemToStringLabel={(option) => option.label}
      isItemEqualToValue={(itemValue, selectedValue) => itemValue.value === selectedValue.value}
      onInputValueChange={(inputValue) => { setQuery(inputValue); }}
      onValueChange={(nextValue) => { if (nextValue) commit(nextValue); }}
    >
    <div style={{ display: 'grid', gap: 7, position: 'relative', ...style }}>
      {label ? (
        <label htmlFor={cbId} style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-muted-strong)' }}>
          {label}
        </label>
      ) : null}
      <div
        className="dt-field"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          height: 44,
          padding: '0 12px',
          boxShadow: open ? 'var(--dt-shadow-focus)' : undefined,
          background: open ? 'var(--dt-surface)' : 'var(--dt-surface-sunken)',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          style={{ color: 'var(--dt-muted)', flex: '0 0 auto' }}
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
          style={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 14,
            fontFamily: 'inherit',
            color: 'var(--dt-ink-strong)',
          }}
        />
        {selected && !open ? (
          <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)' }}>
            {selected.meta}
          </span>
        ) : null}
      </div>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner sideOffset={6}>
          <BaseCombobox.Popup
            style={{
              zIndex: 20,
              background: 'var(--dt-surface)',
              border: '1px solid var(--dt-border-strong)',
              borderRadius: 'var(--dt-radius-lg)',
              boxShadow: 'var(--dt-shadow-md)',
              maxHeight: 240,
              overflowY: 'auto',
              padding: 4,
            }}
          >
          {filtered.length === 0 ? (
            <BaseCombobox.Empty style={{ padding: '12px 12px', fontSize: 13, color: 'var(--dt-muted)' }}>{emptyText}</BaseCombobox.Empty>
          ) : (
            <BaseCombobox.List>
            {filtered.map((o) => {
              const isSel = o.value === value;
              return (
                <BaseCombobox.Item
                  key={o.value}
                  value={o}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 10px',
                    borderRadius: 'var(--dt-radius-md)',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      minWidth: 0,
                      fontSize: 13.5,
                      fontWeight: isSel ? 600 : 500,
                      color: 'var(--dt-ink-strong)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {o.label}
                  </span>
                  {o.meta ? (
                    <span
                      style={{
                        fontFamily: 'var(--dt-font-mono)',
                        fontSize: 11,
                        color: 'var(--dt-muted)',
                        flex: '0 0 auto',
                      }}
                    >
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
                      style={{ color: 'var(--dt-accent)', flex: '0 0 auto' }}
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
            <style>{`[role="option"][data-highlighted]{background:var(--dt-surface-sunken)!important}`}</style>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
      {hint ? <span style={{ fontSize: 12, color: 'var(--dt-muted)' }}>{hint}</span> : null}
    </div>
    </BaseCombobox.Root>
  );
}
