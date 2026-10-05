import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

const TONE_CLASS = {
  neutral: 'badge',
  accent: 'badge badge-accent',
  info: 'badge badge-info',
  success: 'badge badge-success',
  warning: 'badge badge-warning',
  danger: 'badge badge-danger',
};

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
  children?: ReactNode;
  /** Semantic tone. info/success/warning/danger are status-only. */
  tone?: 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger';
  /** Show a leading status dot in the current tone color. */
  dot?: boolean;
  style?: CSSProperties;
}

/**
 * Status / classification badge. Pill-shaped, tinted. Status or
 * classification only — never decorative.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, tone = 'neutral', dot = false, className, style, ...rest },
  ref,
) {
  const cls = cx(TONE_CLASS[tone] ?? TONE_CLASS.neutral, className);
  return (
    <span ref={ref} className={cls} style={style} {...rest}>
      {dot ? (
        <span
          aria-hidden="true"
          style={{
            width: 6,
            height: 6,
            borderRadius: 'var(--dt-radius-pill)',
            background: 'currentColor',
            display: 'inline-block',
          }}
        />
      ) : null}
      {children}
    </span>
  );
});
Badge.displayName = 'Badge';
