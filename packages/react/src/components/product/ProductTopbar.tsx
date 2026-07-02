import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ProductTopbarProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode;
  actions: ReactNode;
  mobileActions?: ReactNode;
  mobileMenuLabel?: string;
}

export interface ProductTopbarMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  label?: string;
}

export function ProductTopbarMenu({ children, label = 'Menu', className, ...rest }: ProductTopbarMenuProps) {
  return (
    <BaseMenu.Root modal={false}>
      <div className={cx('dt-product-topbar-menu', className)} {...rest}>
        <BaseMenu.Trigger className="dt-product-topbar-menu-button" aria-label={label}>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </BaseMenu.Trigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={8} align="end">
            <BaseMenu.Popup>
              <nav className="dt-product-topbar-menu-panel" aria-label="Mobile primary">
                {children}
              </nav>
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </div>
    </BaseMenu.Root>
  );
}

export function ProductTopbar({ brand, actions, mobileActions, mobileMenuLabel = 'Menu', className, ...rest }: ProductTopbarProps) {
  return (
    <header className={cx('dt-product-topbar', className)} {...rest}>
      <div className="dt-product-topbar-brand">{brand}</div>
      <nav className="dt-product-topbar-actions" aria-label="Primary">
        {actions}
      </nav>
      <ProductTopbarMenu label={mobileMenuLabel}>{mobileActions ?? actions}</ProductTopbarMenu>
    </header>
  );
}
