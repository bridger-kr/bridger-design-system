// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Spinner.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { LoaderCircle } from 'lucide-react';
export const Spinner = forwardRef(function Spinner({ size = 18, stroke = 1.75, color = 'var(--dt-accent)', label = '로딩 중', className, style, ...rest }, ref) {
    const hidden = rest['aria-hidden'] === true || rest['aria-hidden'] === 'true';
    return (<span ref={ref} {...rest} className={className} style={{ display: 'inline-flex', ...style }} role={hidden ? undefined : 'status'} aria-label={hidden ? undefined : label}>
      <LoaderCircle className="dt-spinner-svg" size={size} strokeWidth={stroke} color={color} aria-hidden="true"/>
    </span>);
});
Spinner.displayName = 'Spinner';
