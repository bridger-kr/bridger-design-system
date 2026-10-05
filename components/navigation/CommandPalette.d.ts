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
    open?: boolean;
    query?: string;
    onQueryChange?: (q: string) => void;
    groups?: CommandGroup[];
    footerHint?: string;
    onSelect?: (item: CommandItem) => void;
    style?: CSSProperties;
}
export declare function CommandPalette({ open, query, onQueryChange, groups, footerHint, onSelect, style, className, ...rest }: CommandPaletteProps): import("react").JSX.Element | null;
