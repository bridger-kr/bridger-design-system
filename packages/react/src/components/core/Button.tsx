import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export const BUTTON_VARIANT = {
  Primary: 'primary',
  Secondary: 'secondary',
  Ghost: 'ghost',
} as const;

export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export const BUTTON_SIZE = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];

/* Height grid (px) per size — matches the fill-based button recipe in base.css.
   Horizontal padding only; vertical centering comes from the fixed height. */
const SIZE = {
  sm: { height: 40, padding: '0 14px', fontSize: 13 },
  md: { height: 44, padding: '0 18px', fontSize: 14 },
  lg: { height: 48, padding: '0 20px', fontSize: 15 },
} satisfies Record<ButtonSize, CSSProperties>;

const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
} satisfies Record<ButtonVariant, string>;

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children?: ReactNode;
  /** primary = the one strongest action; secondary = regular; ghost = low-emphasis. */
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
 * secondary for regular actions; ghost for low-emphasis commands.
 *
 * The one strongest action per screen uses the ink-filled primary variant.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost actions" viewport="700x140"
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
  const s = SIZE[size];
  return (
    <button
      type={type}
      className={cx('dt-button', `dt-button-${size}`, cls, className)}
      disabled={disabled}
      onClick={onClick}
      style={{
        height: s.height,
        padding: s.padding,
        fontSize: s.fontSize,
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...rest}
    >
      {icon ? <span className="dt-button-icon" aria-hidden="true">{icon}</span> : null}
      {children}
      {iconRight ? <span className="dt-button-icon" aria-hidden="true">{iconRight}</span> : null}
    </button>
  );
}
