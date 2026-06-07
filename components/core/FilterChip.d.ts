import * as React from 'react';

export interface FilterChipProps {
  label: string;
  /** Trailing count, rendered tabular-mono. */
  count?: number;
  active?: boolean;
  removable?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Toggleable catalog filter — crisp hairline tag, persimmon tint when active.
 * @startingPoint section="Core" subtitle="Toggleable catalog filter" viewport="520x80"
 */
export function FilterChip(props: FilterChipProps): React.JSX.Element;
