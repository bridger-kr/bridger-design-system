import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode } from 'react';
import { useRender } from '@base-ui-components/react/use-render';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';

export const BUTTON_VARIANT = {
  Solid: 'solid',
  Outline: 'outline',
  Ghost: 'ghost',
  /** @deprecated Use `BUTTON_VARIANT.Solid`. Removed in v2.1. */
  Primary: 'primary',
  /** @deprecated Use `BUTTON_VARIANT.Outline`. Removed in v2.1. */
  Secondary: 'secondary',
  /** @deprecated Use `variant={BUTTON_VARIANT.Solid}` + `tone="danger"`. Removed in v2.1. */
  Danger: 'danger',
} as const;

export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export const BUTTON_TONE = {
  Neutral: 'neutral',
  Danger: 'danger',
} as const;

export type ButtonTone = (typeof BUTTON_TONE)[keyof typeof BUTTON_TONE];

export const BUTTON_SIZE = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];

type ButtonBase = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  /**
   * Visual shape/emphasis. `solid` = strongest action, `outline` = regular,
   * `ghost` = low emphasis. `primary`/`secondary`/`danger` are deprecated
   * aliases and will be removed in v2.1.
   */
  variant?: ButtonVariant;
  /** Semantic color intent. `danger` marks destructive actions. */
  tone?: ButtonTone;
  size?: ButtonSize;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  /**
   * Replace the rendered element (base-ui `useRender` contract), e.g.
   * `<Button render={<a href="/pricing" />}>요금</Button>`.
   */
  render?: useRender.RenderProp;
  style?: CSSProperties;
};

/**
 * Labeled button, or an icon-only button. An icon-only button has no visible
 * text, so `aria-label` is required at the type level (DESIGN.md §6/§8).
 */
export type ButtonProps =
  | (ButtonBase & {
      children: ReactNode;
      /** Lucide icon element placed before the label. */
      icon?: ReactNode;
      /** Lucide icon element placed after the label. */
      iconRight?: ReactNode;
    })
  | (ButtonBase & { children?: never; 'aria-label': string } & (
        | { icon: ReactNode; iconRight?: ReactNode }
        | { icon?: ReactNode; iconRight: ReactNode }
      ));

const LEGACY_VARIANT = {
  primary: { variant: BUTTON_VARIANT.Solid, tone: BUTTON_TONE.Neutral },
  secondary: { variant: BUTTON_VARIANT.Outline, tone: BUTTON_TONE.Neutral },
  danger: { variant: BUTTON_VARIANT.Solid, tone: BUTTON_TONE.Danger },
} as const;

/**
 * Bridger button. `solid` is the single strongest action per surface;
 * `outline` for regular actions; `ghost` for low-emphasis commands;
 * `tone="danger"` marks a destructive action.
 * @startingPoint section="Core" subtitle="Solid / outline / ghost, neutral / danger" viewport="700x140"
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = BUTTON_VARIANT.Solid,
    tone = BUTTON_TONE.Neutral,
    size = BUTTON_SIZE.Medium,
    icon,
    iconRight,
    disabled = false,
    type = 'button',
    render,
    onClick,
    className,
    style,
    ...rest
  },
  ref,
) {
  let resolvedVariant: 'solid' | 'outline' | 'ghost' = variant as 'solid' | 'outline' | 'ghost';
  let resolvedTone = tone;
  const legacy = LEGACY_VARIANT[variant as keyof typeof LEGACY_VARIANT];
  if (legacy) {
    warnOnce(
      `button-variant-${variant}`,
      `Button variant="${variant}" is deprecated — use variant="${legacy.variant}"${legacy.tone === 'danger' ? ' tone="danger"' : ''}. Removed in v2.1.`,
    );
    resolvedVariant = legacy.variant;
    if (tone === BUTTON_TONE.Neutral) resolvedTone = legacy.tone;
  }

  // Emit the canonical `dt-button-*` class plus the legacy `btn-*` class so the
  // component is styled identically before and after the DS-45 `.btn-*` →
  // `.dt-button-*` CSS rename lands (expected rebase friction with that PR).
  const legacyBtnClass =
    resolvedVariant === 'ghost'
      ? 'btn-ghost'
      : resolvedVariant === 'outline'
        ? 'btn-secondary'
        : resolvedTone === BUTTON_TONE.Danger
          ? 'btn-danger'
          : 'btn-primary';

  return useRender({
    render,
    defaultTagName: 'button',
    ref,
    props: {
      type,
      disabled,
      className: cx('dt-button', `dt-button-${size}`, `dt-button-${resolvedVariant}`, legacyBtnClass, className),
      'data-tone': resolvedTone === BUTTON_TONE.Danger ? 'danger' : undefined,
      onClick,
      style,
      ...rest,
      children: (
        <>
          {icon ? (
            <span className="dt-button-icon" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          {children}
          {iconRight ? (
            <span className="dt-button-icon" aria-hidden="true">
              {iconRight}
            </span>
          ) : null}
        </>
      ),
    },
  }) as ReactElement;
});
Button.displayName = 'Button';
