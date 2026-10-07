// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Skeleton.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
export const Skeleton = forwardRef(function Skeleton({ width = '100%', height = 14, radius = 'var(--dt-radius-chip)', className, style, ...rest }, ref) {
    const sizing = {
        '--dt-skeleton-width': typeof width === 'number' ? `${width}px` : width,
        '--dt-skeleton-height': typeof height === 'number' ? `${height}px` : height,
        '--dt-skeleton-radius': radius,
    };
    return (<span ref={ref} className={cx('dt-skeleton', className)} style={{ ...sizing, ...style }} {...rest}/>);
});
Skeleton.displayName = 'Skeleton';
