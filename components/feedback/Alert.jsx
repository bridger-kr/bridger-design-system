// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Alert.tsx
// Regenerate: pnpm generate

import { X } from 'lucide-react';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
export const AlertTone = {
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger',
};
const TONE_BACKGROUND = {
    info: 'var(--dt-tint-cobalt)',
    success: 'var(--dt-tint-success)',
    warning: 'var(--dt-tint-warning)',
    danger: 'var(--dt-tint-danger)',
};
export const Alert = forwardRef(function Alert({ tone = AlertTone.Info, title, children, icon, action, onDismiss, className, style, ...rest }, ref) {
    const background = TONE_BACKGROUND[tone] ?? TONE_BACKGROUND[AlertTone.Info];
    return (<div ref={ref} role="status" className={cx('dt-alert', className)} style={{
            alignItems: 'flex-start',
            background,
            borderRadius: 'var(--dt-radius-card)',
            color: 'var(--dt-text-strong)',
            display: 'flex',
            gap: 12,
            minHeight: 62,
            overflow: 'clip',
            padding: '13px 15px',
            position: 'relative',
            width: 'min(100%, 380px)',
            ...style,
        }} {...rest}>
      {icon ? <span style={{ color: 'currentColor', display: 'inline-flex', flex: '0 0 auto', marginTop: 1 }}>{icon}</span> : null}
      <div style={{ flex: '1 0 0', minWidth: 1, overflow: 'clip' }}>
        {title ? <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 'normal' }}>{title}</div> : null}
        {children ? <div style={{ marginTop: title ? 3 : 0, fontSize: 13, fontWeight: 400, lineHeight: 'normal' }}>{children}</div> : null}
        {action ? <div style={{ marginTop: 10 }}>{action}</div> : null}
      </div>
      {onDismiss ? (<button className="dt-close-control" onClick={onDismiss} aria-label="닫기" style={{ flex: '0 0 auto', border: 'none', background: 'transparent', cursor: 'pointer', color: 'currentColor', padding: 0, lineHeight: 0 }}>
          <Icon icon={X}/>
        </button>) : null}
    </div>);
});
Alert.displayName = 'Alert';
