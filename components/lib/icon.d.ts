// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/lib/icon.tsx
// Regenerate: pnpm generate

import type { LucideIcon, LucideProps } from 'lucide-react';
/**
 * Internal icon contract (DESIGN.md §6): Lucide line icons only, three sizes
 * that mirror `--dt-icon-sm/md/lg`, fixed `--dt-icon-stroke` (1.75 — CSS vars
 * cannot reach the SVG `stroke-width` attribute, so it is a code constant),
 * `currentColor`. Pass `label` for a meaningful icon (role="img" +
 * aria-label); omit it and the icon is decorative (`aria-hidden`).
 */
export declare const ICON_SIZE: {
    readonly sm: 14;
    readonly md: 16;
    readonly lg: 20;
};
export type IconSize = keyof typeof ICON_SIZE;
export type IconProps = Omit<LucideProps, 'size' | 'strokeWidth' | 'color' | 'aria-label' | 'aria-hidden'> & {
    icon: LucideIcon;
    size?: IconSize;
    /** Accessible name. Set it when the icon carries meaning on its own. */
    label?: string;
};
export declare function Icon({ icon: Glyph, size, label, ...rest }: IconProps): import("react").JSX.Element;
