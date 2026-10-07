import { X } from 'lucide-react';
import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../../lib/icon';
import { useDSMessages } from '../../locale/DSLocaleProvider';

export const AlertTone = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
} as const;

export type AlertTone = (typeof AlertTone)[keyof typeof AlertTone];

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'title'> {
  tone?: AlertTone;
  title?: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
  /** Accessible name for the dismiss button; defaults to the ambient locale. */
  closeLabel?: string;
  style?: CSSProperties;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { tone = AlertTone.Info, title, children, icon, action, onDismiss,
    closeLabel, className, style, ...rest },
  ref,
) {
  const messages = useDSMessages();
  return (
    <div
      ref={ref}
      role="status"
      className={cx('dt-alert', `dt-alert-${tone}`, className)}
      style={style}
      {...rest}
    >
      {icon ? <span aria-hidden="true" className="dt-alert-icon">{icon}</span> : null}
      <div className="dt-alert-body">
        {title ? <div className="dt-alert-title">{title}</div> : null}
        {children ? <div className="dt-alert-desc">{children}</div> : null}
        {action ? <div className="dt-alert-action">{action}</div> : null}
      </div>
      {onDismiss ? (
        <button className="dt-close-control dt-alert-close" onClick={onDismiss} aria-label={closeLabel ?? messages.common.close}>
          <Icon icon={X} />
        </button>
      ) : null}
    </div>
  );
});
Alert.displayName = 'Alert';
