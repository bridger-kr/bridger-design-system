import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

/* Height grid (px) per size — matches the fill-based button recipe in base.css.
   Horizontal padding only; vertical centering comes from the fixed height. */
const SIZE = {
  sm: { height: 36, padding: '0 14px', fontSize: 13 },
  md: { height: 44, padding: '0 18px', fontSize: 14 },
  lg: { height: 48, padding: '0 20px', fontSize: 15 },
};

const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children?: ReactNode;
  /** primary = the one strongest action; secondary = regular; ghost = low-emphasis. */
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
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
 * The one strongest action per screen uses variant="primary" (persimmon).
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost actions" viewport="700x140"
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconRight = null,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}: ButtonProps) {
  const cls = VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary;
  const s = SIZE[size] ?? SIZE.md;
  return (
    <button
      type={type}
      className={cls}
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
      {icon ? <span style={{ display: 'inline-flex' }} aria-hidden="true">{icon}</span> : null}
      {children}
      {iconRight ? <span style={{ display: 'inline-flex' }} aria-hidden="true">{iconRight}</span> : null}
    </button>
  );
}
