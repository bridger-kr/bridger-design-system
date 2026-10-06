import type { LucideIcon, LucideProps } from 'lucide-react';

/**
 * Internal icon contract (DESIGN.md §6): Lucide line icons only, three sizes
 * that mirror `--dt-icon-sm/md/lg`, fixed `--dt-icon-stroke` (1.75 — CSS vars
 * cannot reach the SVG `stroke-width` attribute, so it is a code constant),
 * `currentColor`. Pass `label` for a meaningful icon (role="img" +
 * aria-label); omit it and the icon is decorative (`aria-hidden`).
 */

export const ICON_SIZE = {
  sm: 14,
  md: 16,
  lg: 20,
} as const;

export type IconSize = keyof typeof ICON_SIZE;

const ICON_STROKE = 1.75;

export type IconProps = Omit<LucideProps, 'size' | 'strokeWidth' | 'color' | 'aria-label' | 'aria-hidden'> & {
  icon: LucideIcon;
  size?: IconSize;
  /** Accessible name. Set it when the icon carries meaning on its own. */
  label?: string;
};

export function Icon({ icon: Glyph, size = 'md', label, ...rest }: IconProps) {
  return (
    <Glyph
      size={ICON_SIZE[size]}
      strokeWidth={ICON_STROKE}
      color="currentColor"
      {...(label
        ? { role: 'img', 'aria-label': label }
        : { 'aria-hidden': true, focusable: false })}
      {...rest}
    />
  );
}
