// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ProductCinematic.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
export const PRODUCT_SHELL_TONE = {
    Cinematic: 'cinematic',
    Console: 'console',
};
const SHELL_TONE_CLASS = {
    [PRODUCT_SHELL_TONE.Cinematic]: 'dt-product-shell-cinematic',
    [PRODUCT_SHELL_TONE.Console]: 'dt-product-shell-console',
};
export const ProductShell = forwardRef(function ProductShell({ tone = PRODUCT_SHELL_TONE.Cinematic, className, children, ...rest }, ref) {
    return (<div ref={ref} className={cx('dt-product-shell', SHELL_TONE_CLASS[tone], className)} {...rest}>
      {children}
    </div>);
});
ProductShell.displayName = 'ProductShell';
export const ProductCinematicBackdrop = forwardRef(function ProductCinematicBackdrop({ animated = true, className, ...rest }, ref) {
    return (<div ref={ref} className={cx('dt-product-cinematic-backdrop', animated && 'dt-product-cinematic-backdrop-animated', className)} aria-hidden="true" {...rest}>
      <div className="dt-product-cinematic-wash"/>
    </div>);
});
ProductCinematicBackdrop.displayName = 'ProductCinematicBackdrop';
export const ProductMotionField = forwardRef(function ProductMotionField({ gridSrc, label = 'Live API routing motion', className, ...rest }, ref) {
    return (<div ref={ref} className={cx('dt-product-motion-field', className)} aria-label={label} {...rest}>
      {gridSrc ? <img className="dt-product-motion-grid" src={gridSrc} alt="" aria-hidden="true" loading="lazy"/> : null}
      <span className="dt-product-motion-orbit dt-product-motion-orbit-a" aria-hidden="true">
        <span className="dt-product-motion-node"/>
      </span>
      <span className="dt-product-motion-orbit dt-product-motion-orbit-b" aria-hidden="true">
        <span className="dt-product-motion-node"/>
      </span>
      <span className="dt-product-motion-axis" aria-hidden="true"/>
      <span className="dt-product-motion-copy">API</span>
    </div>);
});
ProductMotionField.displayName = 'ProductMotionField';
export const ProductSideRail = forwardRef(function ProductSideRail({ items, label, className, ...rest }, ref) {
    return (<aside ref={ref} className={cx('dt-product-side-rail', className)} aria-label={label} {...rest}>
      {items.map((item) => (<a key={item.key} href={item.href}>
          {item.label}
        </a>))}
    </aside>);
});
ProductSideRail.displayName = 'ProductSideRail';
