// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ProductShell.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
export function ProductShell({ className, children, ...rest }) {
    return (<div className={cx('dt-product-shell', className)} {...rest}>
      {children}
    </div>);
}
export function ProductSideRail({ items, label, className, ...rest }) {
    return (<aside className={cx('dt-product-side-rail', className)} aria-label={label} {...rest}>
      {items.map((item) => (<a key={item.key} href={item.href}>
          {item.label}
        </a>))}
    </aside>);
}
