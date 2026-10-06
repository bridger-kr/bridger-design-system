import { forwardRef } from 'react';
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

export const ProductShell = forwardRef<HTMLDivElement, ProductShellProps>(function ProductShell(
  { tone = PRODUCT_SHELL_TONE.Cinematic, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('dt-product-shell', SHELL_TONE_CLASS[tone], className)} {...rest}>
      {children}
    </div>
  );
});
ProductShell.displayName = 'ProductShell';

export interface ProductCinematicBackdropProps extends HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
}

export const ProductCinematicBackdrop = forwardRef<HTMLDivElement, ProductCinematicBackdropProps>(
  function ProductCinematicBackdrop({ animated = true, className, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={cx('dt-product-cinematic-backdrop', animated && 'dt-product-cinematic-backdrop-animated', className)}
      aria-hidden="true"
      {...rest}
    >
      <div className="dt-product-cinematic-wash" />
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
});
ProductCinematicBackdrop.displayName = 'ProductCinematicBackdrop';

export interface ProductMotionFieldProps extends HTMLAttributes<HTMLDivElement> {
  gridSrc?: string;
  label?: string;
}

export const ProductMotionField = forwardRef<HTMLDivElement, ProductMotionFieldProps>(function ProductMotionField(
  { gridSrc, label = 'Live API routing motion', className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('dt-product-motion-field', className)} aria-label={label} {...rest}>
      {gridSrc ? <img className="dt-product-motion-grid" src={gridSrc} alt="" aria-hidden="true" loading="lazy" /> : null}
      <span className="dt-product-motion-orbit dt-product-motion-orbit-a" aria-hidden="true">
        <span className="dt-product-motion-node" />
      </span>
      <span className="dt-product-motion-orbit dt-product-motion-orbit-b" aria-hidden="true">
        <span className="dt-product-motion-node" />
      </span>
      <span className="dt-product-motion-axis" aria-hidden="true" />
      <span className="dt-product-motion-copy">API</span>
    </div>
  );
});
ProductMotionField.displayName = 'ProductMotionField';

export interface ProductSideRailItem {
  key: string;
  href: string;
  label: ReactNode;
}

export interface ProductSideRailProps extends HTMLAttributes<HTMLElement> {
  items: readonly ProductSideRailItem[];
  label: string;
}

export const ProductSideRail = forwardRef<HTMLElement, ProductSideRailProps>(function ProductSideRail(
  { items, label, className, ...rest },
  ref,
) {
  return (
    <aside ref={ref} className={cx('dt-product-side-rail', className)} aria-label={label} {...rest}>
      {items.map((item) => (
        <a key={item.key} href={item.href}>
          {item.label}
        </a>
      ))}
    </aside>
  );
});
ProductSideRail.displayName = 'ProductSideRail';
