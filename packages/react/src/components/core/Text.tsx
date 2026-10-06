import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

/**
 * Fixed v2 type scale for body-range text (DESIGN.md §4.3): no size outside
 * these four steps is permitted. `Heading` owns the 20/28/36 display steps.
 */
export const TEXT_SIZE = {
  Caption: 12,
  Small: 13,
  Label: 14,
  Body: 16,
} as const;

export type TextSize = (typeof TEXT_SIZE)[keyof typeof TEXT_SIZE];

export const TEXT_TONE = {
  Default: 'default',
  Muted: 'muted',
  Accent: 'accent',
  Danger: 'danger',
} as const;

export type TextTone = (typeof TEXT_TONE)[keyof typeof TEXT_TONE];

export const TEXT_WEIGHT = {
  Regular: 400,
  Medium: 500,
  Semibold: 600,
} as const;

export type TextWeight = (typeof TEXT_WEIGHT)[keyof typeof TEXT_WEIGHT];

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  /** Type-scale step. Defaults to the 16px body step. */
  size?: TextSize;
  weight?: TextWeight;
  /** Text color role. `accent`/`danger` are status-only, never decorative. */
  tone?: TextTone;
  /** Rendered element. `span` keeps the text valid inside controls. */
  as?: 'p' | 'span' | 'div';
}

/**
 * Scale-locked body text. Enforces the 12/13/14/16 scale and the four text
 * roles so app code cannot reintroduce off-scale sizes or one-off colors
 * (EDD-231). Use `Heading` for real headings — this primitive never renders
 * a heading element.
 */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    children,
    size = TEXT_SIZE.Body,
    weight,
    tone = TEXT_TONE.Default,
    as = 'span',
    className,
    ...rest
  },
  ref,
) {
  const Tag = as as ElementType;
  return (
    <Tag
      ref={ref}
      className={cx('dt-text', className)}
      data-size={size}
      data-weight={weight}
      data-tone={tone === TEXT_TONE.Default ? undefined : tone}
      {...rest}
    >
      {children}
    </Tag>
  );
});
Text.displayName = 'Text';
