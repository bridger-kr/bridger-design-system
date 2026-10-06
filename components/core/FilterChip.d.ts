// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/FilterChip.tsx
// Regenerate: pnpm generate

import type { CSSProperties, ReactNode } from 'react';
export interface FilterChipProps {
    label: string;
    /** Trailing count, rendered tabular-mono. */
    count?: number;
    active?: boolean;
    removable?: boolean;
    onToggle?: () => void;
    onRemove?: () => void;
    /** Accessible name for the remove button; defaults to the ambient locale. */
    removeAriaLabel?: string;
    icon?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
/**
 * FilterChip — a toggleable filter / tag for catalog facets (분야, 프로토콜, 상태).
 * Crisp small-radius tag with a hairline, NOT a rounded-full cushion. Active =
 * persimmon tint + border + bold. Optional count (mono) and a removable ✕.
 * @startingPoint section="Core" subtitle="Toggleable catalog filter" viewport="520x80"
 */
export declare const FilterChip: import("react").ForwardRefExoticComponent<FilterChipProps & import("react").RefAttributes<HTMLButtonElement | HTMLSpanElement>>;
