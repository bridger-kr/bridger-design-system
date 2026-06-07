import * as React from 'react';

export interface ComboboxOption { value: string; label: string; meta?: string; }
export interface ComboboxProps {
  label?: string;
  hint?: string;
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Searchable select for large option sets (the 230+ public-data API catalog).
 * Hairline field; the listbox is a bordered plane. Filters on label + meta.
 * @startingPoint section="Forms" subtitle="Searchable select over a large catalog" viewport="460x320"
 */
export function Combobox(props: ComboboxProps): React.JSX.Element;
