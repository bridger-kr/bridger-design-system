// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/CommandPalette.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export interface CommandItem {
    label: string;
    icon?: ReactNode;
    meta?: string;
    shortcut?: string;
    active?: boolean;
}
export interface CommandGroup {
    heading?: string;
    items: CommandItem[];
}
export interface CommandPaletteProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect'> {
    /** Controlled open state. */
    open?: boolean;
    /** Uncontrolled initial open state (defaults to `true`). */
    defaultOpen?: boolean;
    /** Called when the palette requests an open-state change (e.g. Escape). */
    onOpenChange?: (open: boolean) => void;
    query?: string;
    onQueryChange?: (q: string) => void;
    groups?: CommandGroup[];
    /** Accessible name for the search input (combobox). */
    inputLabel?: string;
    /** Accessible name for the results listbox. */
    listboxLabel?: string;
    footerHint?: string;
    placeholder?: string;
    onSelect?: (item: CommandItem) => void;
    style?: CSSProperties;
}
export declare const CommandPalette: import("react").ForwardRefExoticComponent<CommandPaletteProps & import("react").RefAttributes<HTMLDivElement>>;
