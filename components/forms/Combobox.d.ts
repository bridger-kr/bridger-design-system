// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Combobox.tsx
// Regenerate: pnpm generate

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
export declare function Combobox({ label, hint, options, value, onChange, placeholder, emptyText, id, style, }: ComboboxProps): import("react").JSX.Element;
