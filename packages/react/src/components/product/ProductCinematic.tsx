import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export const PRODUCT_SHELL_TONE = {
  Cinematic: 'cinematic',
  Console: 'console',
} as const;

export type ProductShellTone = (typeof PRODUCT_SHELL_TONE)[keyof typeof PRODUCT_SHELL_TONE];

const SHELL_TONE_CLASS: Record<ProductShellTone, string> = {
  [PRODUCT_SHELL_TONE.Cinematic]: 'dt-product-shell-cinematic',
  [PRODUCT_SHELL_TONE.Console]: 'dt-product-shell-console',
};

export interface ProductShellProps extends HTMLAttributes<HTMLDivElement> {
  tone?: ProductShellTone;
}

export function ProductShell({ tone = PRODUCT_SHELL_TONE.Cinematic, className, children, ...rest }: ProductShellProps) {
  return (
    <div className={cx('dt-product-shell', SHELL_TONE_CLASS[tone], className)} {...rest}>
      {children}
    </div>
  );
}

export interface ProductCinematicBackdropProps extends HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
}

export function ProductCinematicBackdrop({
  animated = true,
  className,
  ...rest
}: ProductCinematicBackdropProps) {
  return (
    <div
      className={cx('dt-product-cinematic-backdrop', animated && 'dt-product-cinematic-backdrop-animated', className)}
      aria-hidden="true"
      {...rest}
    >
      <div className="dt-product-cinematic-wash" />
      <div className="dt-product-cinematic-dots" />
      <svg className="dt-product-cinematic-lines" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice">
        <path className="dt-product-cinematic-track" d="M-60 248 H520 C690 248 710 168 884 168 H1500" />
        <path className="dt-product-cinematic-track" d="M-60 430 H510 C660 430 692 542 872 542 H1500" />
        <path className="dt-product-cinematic-track" d="M-60 338 H610 C748 338 770 326 930 326 H1500" />
        <path className="dt-product-cinematic-flow dt-product-cinematic-flow-a" d="M-60 248 H520 C690 248 710 168 884 168 H1500" />
        <path className="dt-product-cinematic-flow dt-product-cinematic-flow-b" d="M-60 430 H510 C660 430 692 542 872 542 H1500" />
        <path className="dt-product-cinematic-flow dt-product-cinematic-flow-c" d="M-60 338 H610 C748 338 770 326 930 326 H1500" />
      </svg>
    </div>
  );
}

export interface ProductSideRailItem {
  key: string;
  href: string;
  label: ReactNode;
}

export interface ProductSideRailProps extends HTMLAttributes<HTMLElement> {
  items: readonly ProductSideRailItem[];
  label: string;
}

export function ProductSideRail({ items, label, className, ...rest }: ProductSideRailProps) {
  return (
    <aside className={cx('dt-product-side-rail', className)} aria-label={label} {...rest}>
      {items.map((item) => (
        <a key={item.key} href={item.href}>
          {item.label}
        </a>
      ))}
    </aside>
  );
}
