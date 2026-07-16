import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { cx } from '../../lib/cx';

export const CardTone = {
  Default: 'default',
  Muted: 'muted',
  Raised: 'raised',
  Panel: 'panel',
} as const;

export type CardTone = (typeof CardTone)[keyof typeof CardTone];

const VARIANT_STYLE = {
  default: { background: 'var(--dt-surface)', boxShadow: 'none' },
  muted: { background: 'var(--dt-surface-sunken)', boxShadow: 'none' },
  raised: { background: 'var(--dt-surface-raised)', boxShadow: 'var(--dt-card-float)' },
  panel: { background: 'var(--dt-surface)', boxShadow: 'none' },
} satisfies Record<CardTone, CSSProperties>;

interface CardVisualProps {
  readonly children?: ReactNode;
  /** default = flat bordered plane; muted = sunken well; raised = elevated; panel = flat console panel. */
  readonly variant?: CardTone;
  readonly tone?: CardTone;
  readonly padding?: number;
  readonly style?: CSSProperties;
}

export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> & CardVisualProps;

export type CardButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'style' | 'type'> &
  CardVisualProps & {
    readonly type?: 'button' | 'submit' | 'reset';
  };

export type CardLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href' | 'style'> &
  CardVisualProps & {
    readonly href: string;
  };

function cardStyle(tone: CardTone, padding: number, style?: CSSProperties): CSSProperties {
  return {
    borderRadius: 'var(--dt-radius-lg)',
    border: '1px solid var(--dt-border)',
    color: 'var(--dt-ink)',
    padding,
    transition: 'border-color var(--dt-motion), box-shadow var(--dt-motion), background-color var(--dt-motion), transform var(--dt-motion)',
    ...VARIANT_STYLE[tone],
    ...style,
  };
}

/**
 * Non-actionable surface container. Use `CardButton` for commands and
 * `CardLink` for navigation; the removed `interactive` flag produced a
 * pointer-only div and must be migrated to the matching semantic action.
 */
export function Card({
  children,
  variant,
  tone,
  padding = 20,
  className,
  style,
  ...rest
}: CardProps) {
  const selectedTone = tone ?? variant ?? CardTone.Default;
  return (
    <div className={className} style={cardStyle(selectedTone, padding, style)} {...rest}>
      {children}
    </div>
  );
}

/** Native card-shaped command. Do not place nested interactive controls inside. */
export function CardButton({
  children,
  variant,
  tone,
  padding = 20,
  className,
  style,
  type = 'button',
  disabled,
  ...rest
}: CardButtonProps) {
  const selectedTone = tone ?? variant ?? CardTone.Default;
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={cx('dt-card-action', className)}
      style={{
        appearance: 'none',
        display: 'block',
        font: 'inherit',
        minHeight: 'var(--dt-space-5)',
        textAlign: 'inherit',
        width: '100%',
        ...cardStyle(selectedTone, padding, style),
      }}
    >
      {children}
    </button>
  );
}

/** Native card-shaped navigation link. Do not place nested interactive controls inside. */
export function CardLink({
  children,
  variant,
  tone,
  padding = 20,
  className,
  style,
  href,
  ...rest
}: CardLinkProps) {
  const selectedTone = tone ?? variant ?? CardTone.Default;
  return (
    <a
      {...rest}
      href={href}
      className={cx('dt-card-action', className)}
      style={{
        display: 'block',
        minHeight: 'var(--dt-space-5)',
        textDecoration: 'none',
        width: '100%',
        ...cardStyle(selectedTone, padding, style),
      }}
    >
      {children}
    </a>
  );
}
