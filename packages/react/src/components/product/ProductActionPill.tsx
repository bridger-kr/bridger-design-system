import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export const PRODUCT_ACTION_PILL_VARIANT = {
  Default: 'default',
  Accent: 'accent',
  Outline: 'outline',
} as const;

export const PRODUCT_ACTION_PILL_SIZE = {
  Compact: 'compact',
  Hero: 'hero',
} as const;

export type ProductActionPillVariant = (typeof PRODUCT_ACTION_PILL_VARIANT)[keyof typeof PRODUCT_ACTION_PILL_VARIANT];
export type ProductActionPillSize = (typeof PRODUCT_ACTION_PILL_SIZE)[keyof typeof PRODUCT_ACTION_PILL_SIZE];

const VARIANT_CLASS: Record<ProductActionPillVariant, string> = {
  [PRODUCT_ACTION_PILL_VARIANT.Default]: 'dt-product-action-pill-default',
  [PRODUCT_ACTION_PILL_VARIANT.Accent]: 'dt-product-action-pill-accent',
  [PRODUCT_ACTION_PILL_VARIANT.Outline]: 'dt-product-action-pill-outline',
};

const SIZE_CLASS: Record<ProductActionPillSize, string> = {
  [PRODUCT_ACTION_PILL_SIZE.Compact]: 'dt-product-action-pill-compact',
  [PRODUCT_ACTION_PILL_SIZE.Hero]: 'dt-product-action-pill-hero',
};

export type ProductActionPillProps<T extends ElementType = 'a'> = {
  as?: T;
  variant?: ProductActionPillVariant;
  size?: ProductActionPillSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function productActionPillClassName({
  variant = PRODUCT_ACTION_PILL_VARIANT.Default,
  size = PRODUCT_ACTION_PILL_SIZE.Compact,
  iconOnly = false,
  className,
}: {
  variant?: ProductActionPillVariant;
  size?: ProductActionPillSize;
  iconOnly?: boolean;
  className?: string;
} = {}) {
  return cx('dt-product-action-pill', VARIANT_CLASS[variant], SIZE_CLASS[size], iconOnly && 'dt-product-action-pill-icon-only', className);
}

export function ProductActionPill<T extends ElementType = 'a'>({
  as,
  variant = PRODUCT_ACTION_PILL_VARIANT.Default,
  size = PRODUCT_ACTION_PILL_SIZE.Compact,
  leadingIcon,
  trailingIcon,
  children,
  className,
  ...rest
}: ProductActionPillProps<T>) {
  const Component = as ?? 'a';
  const iconOnly = Boolean(!children && (leadingIcon || trailingIcon));

  return (
    <Component className={productActionPillClassName({ variant, size, iconOnly, className })} {...rest}>
      {leadingIcon ? <span className="dt-product-action-pill-icon">{leadingIcon}</span> : null}
      {children ? <span className="dt-product-action-pill-label">{children}</span> : null}
      {trailingIcon ? <span className="dt-product-action-pill-icon">{trailingIcon}</span> : null}
    </Component>
  );
}
