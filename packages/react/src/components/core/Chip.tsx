import { forwardRef } from 'react';
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';

export type ChipTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
/** @deprecated Use `ChipTone` — `variant` on Chip is now `tone`. Removed in v2.1. */
export type ChipVariant = ChipTone;
export type ChipSize = 'sm' | 'md';

interface ChipVisualProps {
  /** Semantic color of the chip. */
  readonly tone?: ChipTone;
  /** @deprecated Use `tone`. Removed in v2.1. */
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

function resolveChipTone({ tone, variant }: ChipVisualProps): ChipTone {
  if (variant !== undefined) {
    warnOnce('chip-variant', 'Chip: `variant` is deprecated — use `tone` with the same values. Removed in v2.1.');
  }
  return tone ?? variant ?? 'neutral';
}

/**
 * Compact classification tag. Supplying `onClick` creates a native button with
 * keyboard, focus, and disabled behavior; omit it for a non-actionable span.
 */
export const Chip = forwardRef<HTMLSpanElement | HTMLButtonElement, ChipProps>(function Chip(
  props: ChipProps,
  ref,
): ReactElement {
  if (isActionChip(props)) {
    const {
      tone,
      variant,
      size = 'md',
      className,
      children,
      onClick,
      type = 'button',
      disabled = false,
      style,
      ...rest
    } = props;
    const resolvedTone = resolveChipTone({ tone, variant });
    return (
      <button
        {...rest}
        ref={ref as Ref<HTMLButtonElement>}
        type={type}
        className={cx('dt-chip', `dt-chip-${resolvedTone}`, `dt-chip-${size}`, 'dt-chip-interactive', className)}
        disabled={disabled}
        onClick={onClick}
        style={style}
      >
        {children}
      </button>
    );
  }

  const {
    tone,
    variant,
    size = 'md',
    className,
    children,
    style,
    ...rest
  } = props;
  const resolvedTone = resolveChipTone({ tone, variant });
  return (
    <span
      {...rest}
      ref={ref as Ref<HTMLSpanElement>}
      className={cx('dt-chip', `dt-chip-${resolvedTone}`, `dt-chip-${size}`, className)}
      style={style}
    >
      {children}
    </span>
  );
});
Chip.displayName = 'Chip';
