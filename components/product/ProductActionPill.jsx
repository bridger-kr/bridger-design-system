// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ProductActionPill.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
export const PRODUCT_ACTION_PILL_VARIANT = {
    Default: 'default',
    Accent: 'accent',
    Outline: 'outline',
};
export const PRODUCT_ACTION_PILL_SIZE = {
    Compact: 'compact',
    Hero: 'hero',
};
const VARIANT_CLASS = {
    [PRODUCT_ACTION_PILL_VARIANT.Default]: 'dt-product-action-pill-default',
    [PRODUCT_ACTION_PILL_VARIANT.Accent]: 'dt-product-action-pill-accent',
    [PRODUCT_ACTION_PILL_VARIANT.Outline]: 'dt-product-action-pill-outline',
};
const SIZE_CLASS = {
    [PRODUCT_ACTION_PILL_SIZE.Compact]: 'dt-product-action-pill-compact',
    [PRODUCT_ACTION_PILL_SIZE.Hero]: 'dt-product-action-pill-hero',
};
export function productActionPillClassName({ variant = PRODUCT_ACTION_PILL_VARIANT.Default, size = PRODUCT_ACTION_PILL_SIZE.Compact, iconOnly = false, className, } = {}) {
    return cx('dt-product-action-pill', VARIANT_CLASS[variant], SIZE_CLASS[size], iconOnly && 'dt-product-action-pill-icon-only', className);
}
export function ProductActionPill({ as, variant = PRODUCT_ACTION_PILL_VARIANT.Default, size = PRODUCT_ACTION_PILL_SIZE.Compact, leadingIcon, trailingIcon, children, className, ...rest }) {
    const Component = as ?? 'a';
    const iconOnly = Boolean(!children && (leadingIcon || trailingIcon));
    return (<Component className={productActionPillClassName({ variant, size, iconOnly, className })} {...rest}>
      {leadingIcon ? <span className="dt-product-action-pill-icon">{leadingIcon}</span> : null}
      {children ? <span className="dt-product-action-pill-label">{children}</span> : null}
      {trailingIcon ? <span className="dt-product-action-pill-icon">{trailingIcon}</span> : null}
    </Component>);
}
