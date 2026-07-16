import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';
import { cx } from '../../lib/cx';

export type ChipVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
export type ChipSize = 'sm' | 'md';

interface ChipVisualProps {
  readonly variant?: ChipVariant;
  readonly size?: ChipSize;
  readonly children?: ReactNode;
}

export interface StaticChipProps
  extends ChipVisualProps,
    Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'onClick'> {
  readonly onClick?: never;
  readonly disabled?: never;
}

export interface ActionChipProps
  extends ChipVisualProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> {
  readonly onClick: MouseEventHandler<HTMLButtonElement>;
  readonly type?: 'button' | 'submit' | 'reset';
}

export type ChipProps = StaticChipProps | ActionChipProps;

function isActionChip(props: ChipProps): props is ActionChipProps {
  return typeof props.onClick === 'function';
}

/**
 * Compact classification tag. Supplying `onClick` creates a native button with
 * keyboard, focus, and disabled behavior; omit it for a non-actionable span.
 */
export function Chip(props: ChipProps): ReactElement {
  if (isActionChip(props)) {
    const {
      variant = 'neutral',
      size = 'md',
      className,
      children,
      onClick,
      type = 'button',
      disabled = false,
      style,
      ...rest
    } = props;
    return (
      <button
        {...rest}
        type={type}
        className={cx('dt-chip', `dt-chip-${variant}`, `dt-chip-${size}`, 'dt-chip-interactive', className)}
        disabled={disabled}
        onClick={onClick}
        style={{ minHeight: 'var(--dt-space-5)', minWidth: 'var(--dt-space-5)', ...style }}
      >
        {children}
      </button>
    );
  }

  const {
    variant = 'neutral',
    size = 'md',
    className,
    children,
    style,
    ...rest
  } = props;
  return (
    <span
      {...rest}
      className={cx('dt-chip', `dt-chip-${variant}`, `dt-chip-${size}`, className)}
      style={style}
    >
      {children}
    </span>
  );
}
