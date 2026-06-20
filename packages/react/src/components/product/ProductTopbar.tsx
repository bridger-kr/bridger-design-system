import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ProductTopbarProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode;
  actions: ReactNode;
}

export function ProductTopbar({ brand, actions, className, ...rest }: ProductTopbarProps) {
  return (
    <header className={cx('dt-product-topbar', className)} {...rest}>
      <div className="dt-product-topbar-brand">{brand}</div>
      <nav className="dt-product-topbar-actions" aria-label="Primary">
        {actions}
      </nav>
    </header>
  );
}
