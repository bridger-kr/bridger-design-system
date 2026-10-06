import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ProductShellProps extends HTMLAttributes<HTMLDivElement> {}

export function ProductShell({ className, children, ...rest }: ProductShellProps) {
  return (
    <div className={cx('dt-product-shell', className)} {...rest}>
      {children}
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
