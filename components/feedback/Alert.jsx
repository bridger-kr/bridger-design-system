// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Alert.tsx
// Regenerate: pnpm generate

import { X } from 'lucide-react';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
export const AlertTone = {
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
    Danger: 'danger',
};
export const Alert = forwardRef(function Alert({ tone = AlertTone.Info, title, children, icon, action, onDismiss, closeLabel, className, style, ...rest }, ref) {
    const messages = useDSMessages();
    return (<div ref={ref} role="status" className={cx('dt-alert', `dt-alert-${tone}`, className)} style={style} {...rest}>
      {icon ? <span aria-hidden="true" className="dt-alert-icon">{icon}</span> : null}
      <div className="dt-alert-body">
        {title ? <div className="dt-alert-title">{title}</div> : null}
        {children ? <div className="dt-alert-desc">{children}</div> : null}
        {action ? <div className="dt-alert-action">{action}</div> : null}
      </div>
      {onDismiss ? (<button className="dt-close-control dt-alert-close" onClick={onDismiss} aria-label={closeLabel ?? messages.common.close}>
          <Icon icon={X}/>
        </button>) : null}
    </div>);
});
Alert.displayName = 'Alert';
