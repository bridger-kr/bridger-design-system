import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export const CardTone = {
  Default: 'default',
  Muted: 'muted',
  Raised: 'raised',
  Panel: 'panel',
} as const;

export type CardTone = (typeof CardTone)[keyof typeof CardTone];

const VARIANT_STYLE = {
  default: { background: 'var(--dt-surface)', boxShadow: 'var(--dt-card-rest)' },
  muted: { background: 'var(--dt-surface-sunken)' },
  raised: { background: 'var(--dt-surface-raised)', boxShadow: 'var(--dt-card-float)' },
  panel: { background: 'var(--dt-surface)', boxShadow: 'var(--dt-shadow-xs)' },
} satisfies Record<CardTone, CSSProperties>;

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  children?: ReactNode;
  /** default = surface + subtle shadow; muted = sunken well; raised = elevated; panel = flat console panel. */
  variant?: CardTone;
  tone?: CardTone;
  /** Strengthen border + lift surface on hover (for clickable rows/cards). */
  interactive?: boolean;
  padding?: number;
  style?: CSSProperties;
}

/**
 * Surface container. Use for repeated items, modals, and genuinely framed
 * tools — not as a decorative wrapper. `panel` is the flatter console variant.
 */
export function Card({
  children,
  variant,
  tone,
  interactive = false,
  padding = 20,
  className,
  style,
  ...rest
}: CardProps) {
  const selectedTone = tone ?? variant ?? CardTone.Default;
  const v = VARIANT_STYLE[selectedTone] ?? VARIANT_STYLE[CardTone.Default];
  return (
    <div
      className={cx(interactive && 'dt-card-interactive', className)}
      style={{
        borderRadius: 'var(--dt-radius-lg)',
        color: 'var(--dt-ink)',
        padding,
        transition: 'box-shadow var(--dt-motion), background-color var(--dt-motion)',
        ...v,
        ...style,
      }}
      {...rest}
    >
      {children}
      {interactive ? (
        <style>{'.dt-card-interactive:hover{box-shadow:var(--dt-card-hover)}'}</style>
      ) : null}
    </div>
  );
}
