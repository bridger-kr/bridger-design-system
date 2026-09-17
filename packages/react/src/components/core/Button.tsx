import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export const BUTTON_VARIANT = {
  Primary: 'primary',
  Secondary: 'secondary',
  Ghost: 'ghost',
  Danger: 'danger',
} as const;

export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export const BUTTON_SIZE = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];

const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
} satisfies Record<ButtonVariant, string>;

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children?: ReactNode;
  /** primary = strongest action; secondary = regular; ghost = low emphasis; danger = destructive action. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Lucide icon element placed before the label. */
  icon?: ReactNode;
  /** Lucide icon element placed after the label. */
  iconRight?: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
}

/**
 * Bridger button. Primary is the single strongest action per screen;
 * secondary for regular actions; ghost for low-emphasis commands; danger for destructive actions.
 *
 * The one strongest action per screen uses the ink-filled primary variant.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost / danger actions" viewport="700x140"
 */
export function Button({
  children,
  variant = BUTTON_VARIANT.Primary,
  size = BUTTON_SIZE.Medium,
  icon = null,
  iconRight = null,
  disabled = false,
  type = 'button',
  onClick,
  className,
  style,
  ...rest
}: ButtonProps) {
  const cls = VARIANT_CLASS[variant];
  return (
    <button
      type={type}
      className={cx('dt-button', `dt-button-${size}`, cls, className)}
      disabled={disabled}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {icon ? <span className="dt-button-icon" aria-hidden="true">{icon}</span> : null}
      {children}
      {iconRight ? <span className="dt-button-icon" aria-hidden="true">{iconRight}</span> : null}
    </button>
  );
}
