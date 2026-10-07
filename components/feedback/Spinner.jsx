// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Spinner.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cx } from '../lib/cx.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
export const Spinner = forwardRef(function Spinner({ size = 18, stroke = 1.75, color = 'var(--dt-accent)', label, className, style, ...rest }, ref) {
    const messages = useDSMessages();
    const resolvedLabel = label ?? messages.common.loading;
    const hidden = rest['aria-hidden'] === true || rest['aria-hidden'] === 'true';
    return (<span ref={ref} {...rest} className={cx('dt-spinner', className)} style={style} role={hidden ? undefined : 'status'} aria-label={hidden ? undefined : resolvedLabel}>
      <LoaderCircle className="dt-spinner-svg" size={size} strokeWidth={stroke} color={color} aria-hidden="true"/>
    </span>);
});
Spinner.displayName = 'Spinner';
