import * as React from 'react';

export interface CommandItem {
  label: string;
  icon?: React.ReactNode;
  /** Inline mono meta after the label (e.g. an API path). */
  meta?: string;
  /** Keyboard shortcut hint shown right-aligned. */
  shortcut?: string;
  active?: boolean;
}
export interface CommandGroup {
  heading?: string;
  items: CommandItem[];
}
export interface CommandPaletteProps {
  open?: boolean;
  query?: string;
  onQueryChange?: (q: string) => void;
  groups: CommandGroup[];
  footerHint?: string;
  onSelect?: (item: CommandItem) => void;
  style?: React.CSSProperties;
}

/**
 * ⌘K command palette — bordered floating plane, search + grouped results + shortcuts.
 * @startingPoint section="Navigation" subtitle="⌘K command palette" viewport="560x380"
 */
export function CommandPalette(props: CommandPaletteProps): React.JSX.Element;
