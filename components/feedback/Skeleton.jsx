// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Skeleton.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
export const Skeleton = forwardRef(function Skeleton({ width = '100%', height = 14, radius = 'var(--dt-radius-chip)', className, style, ...rest }, ref) {
    return (<span ref={ref} className={cx('dt-skeleton', className)} style={{
            display: 'block', width, height, borderRadius: radius,
            background: 'var(--dt-surface-sunken)', ...style,
        }} {...rest}/>);
});
Skeleton.displayName = 'Skeleton';
