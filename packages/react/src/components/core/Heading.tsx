import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import type { TextTone } from './Text';

/**
 * Display-range type scale (DESIGN.md §4.3). `level` is the semantic heading
 * rank; `size` is the visual step. Omit `size` to take the step paired with
 * the level — decoupling exists for documented exceptions only, never to skip
 * heading levels for a visual size (§8).
 */
export const HEADING_SIZE = {
  H1: 36,
  H2: 28,
  H3: 20,
} as const;

export type HeadingSize = (typeof HEADING_SIZE)[keyof typeof HEADING_SIZE];
export type HeadingLevel = 1 | 2 | 3 | 4;

const LEVEL_DEFAULT_SIZE: Record<HeadingLevel, HeadingSize> = {
  1: HEADING_SIZE.H1,
  2: HEADING_SIZE.H2,
  3: HEADING_SIZE.H3,
  4: HEADING_SIZE.H3,
};

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
  /** Semantic rank (`<h1>`–`<h4>`). Required so the choice is deliberate. */
  level: HeadingLevel;
  /** Visual scale step. Defaults to the step paired with `level`. */
  size?: HeadingSize;
  /** Text color role. Defaults to the strong heading ink. */
  tone?: TextTone;
}

/**
 * Real heading on the fixed display scale. Weight stays at 600 (the v2
 * display cap); negative tracking applies only to the H1/H2 steps.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { children, level, size, tone, className, ...rest },
  ref,
) {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag
      ref={ref}
      className={cx('dt-heading', className)}
      data-size={size ?? LEVEL_DEFAULT_SIZE[level]}
      data-tone={tone}
      {...rest}
    >
      {children}
    </Tag>
  );
});
Heading.displayName = 'Heading';
