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

const TONE_BACKGROUND = {
  info: 'var(--dt-tint-cobalt)',
  success: 'var(--dt-tint-success)',
  warning: 'var(--dt-tint-warning)',
  danger: 'var(--dt-tint-danger)',
} satisfies Record<AlertTone, string>;

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
  const background = TONE_BACKGROUND[tone] ?? TONE_BACKGROUND[AlertTone.Info];
  return (
    <div
      ref={ref}
      role="status"
      className={cx('dt-alert', className)}
      style={{
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
      }}
      {...rest}
    >
      {icon ? <span style={{ color: 'currentColor', display: 'inline-flex', flex: '0 0 auto', marginTop: 1 }}>{icon}</span> : null}
      <div style={{ flex: '1 0 0', minWidth: 1, overflow: 'clip' }}>
        {title ? <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 'normal' }}>{title}</div> : null}
        {children ? <div style={{ marginTop: title ? 3 : 0, fontSize: 13, fontWeight: 400, lineHeight: 'normal' }}>{children}</div> : null}
        {action ? <div style={{ marginTop: 10 }}>{action}</div> : null}
      </div>
      {onDismiss ? (
        <button className="dt-close-control" onClick={onDismiss} aria-label={closeLabel ?? messages.common.close} style={{ flex: '0 0 auto', border: 'none', background: 'transparent', cursor: 'pointer', color: 'currentColor', padding: 0, lineHeight: 0 }}>
          <Icon icon={X} />
        </button>
      ) : null}
    </div>
  );
});
Alert.displayName = 'Alert';
