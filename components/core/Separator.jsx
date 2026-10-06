// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Separator.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import { cx } from '../lib/cx.jsx';
/**
 * Hairline divider between content groups (base-ui `Separator`). Renders a
 * `<div>` with `role="separator"` and the `data-orientation` state attribute;
 * a `vertical` separator must sit inside a flex row to have a visible height.
 */
export const Separator = forwardRef(function Separator({ orientation = 'horizontal', className, ...rest }, ref) {
    const resolvedClassName = typeof className === 'function'
        ? (state) => cx('dt-separator', className(state))
        : cx('dt-separator', className);
    return (<BaseSeparator ref={ref} orientation={orientation} className={resolvedClassName} {...rest}/>);
});
Separator.displayName = 'Separator';
