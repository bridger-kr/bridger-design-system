import { forwardRef } from 'react';
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';

export const CARD_VARIANT = {
  Plain: 'plain',
  Sunken: 'sunken',
} as const;

export type CardVariant = (typeof CARD_VARIANT)[keyof typeof CARD_VARIANT];

/** @deprecated Use `CardVariant` (`plain` | `sunken`). Removed in v2.1. */
export const CardTone = {
  Default: 'default',
  Muted: 'muted',
  Raised: 'raised',
  Panel: 'panel',
} as const;

/** @deprecated Use `CardVariant`. Removed in v2.1. */
export type CardTone = (typeof CardTone)[keyof typeof CardTone];

type CardVariantInput = CardVariant | CardTone;

const LEGACY_VARIANT_MAP: Record<CardTone, CardVariant> = {
  default: CARD_VARIANT.Plain,
  panel: CARD_VARIANT.Plain,
  // v2 prohibits resting elevation: raised collapses to the flat plane.
  raised: CARD_VARIANT.Plain,
  muted: CARD_VARIANT.Sunken,
};

function resolveCardVariant(variant: CardVariantInput | undefined, tone: CardTone | undefined): CardVariant {
  if (tone !== undefined) {
    warnOnce(
      'card-tone',
      'Card: `tone` is deprecated — use `variant` ("plain" | "sunken"). Removed in v2.1.',
    );
  }
  const raw: CardVariantInput = tone ?? variant ?? CARD_VARIANT.Plain;
  if (raw === CARD_VARIANT.Plain || raw === CARD_VARIANT.Sunken) return raw;
  warnOnce(
    `card-variant-${raw}`,
    `Card: variant="${raw}" is deprecated — use "${LEGACY_VARIANT_MAP[raw]}". Removed in v2.1.`,
  );
  return LEGACY_VARIANT_MAP[raw];
}
interface CardVisualProps {
  readonly children?: ReactNode;
  /** `plain` = flat bordered plane; `sunken` = recessed well. */
  readonly variant?: CardVariantInput;
  /** @deprecated Use `variant`. Removed in v2.1. */
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

// `variant` is kept in the signature so the selected variant stays part of
// every card render path; backgrounds/transitions come from `.dt-card-*` CSS.
function cardStyle(variant: CardVariant, padding: number, style?: CSSProperties): CSSProperties {
  void variant;
  return {
    padding,
    ...style,
  };
}

/**
 * Non-actionable surface container. Use `CardButton` for commands and
 * `CardLink` for navigation; the removed `interactive` flag produced a
 * pointer-only div and must be migrated to the matching semantic action.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, variant, tone, padding = 20, className, style, ...rest },
  ref,
) {
  const selectedVariant = resolveCardVariant(variant, tone);
  return (
    <div
      ref={ref}
      className={cx('dt-card', `dt-card-${selectedVariant}`, className)}
      style={cardStyle(selectedVariant, padding, style)}
      {...rest}
    >
      {children}
    </div>
  );
});
Card.displayName = 'Card';

/** Native card-shaped command. Do not place nested interactive controls inside. */
export const CardButton = forwardRef<HTMLButtonElement, CardButtonProps>(function CardButton(
  { children, variant, tone, padding = 20, className, style, type = 'button', disabled, ...rest },
  ref,
) {
  const selectedVariant = resolveCardVariant(variant, tone);
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      disabled={disabled}
      className={cx('dt-card', `dt-card-${selectedVariant}`, 'dt-card-action', className)}
      style={cardStyle(selectedVariant, padding, style)}
    >
      {children}
    </button>
  );
});
CardButton.displayName = 'CardButton';

/** Native card-shaped navigation link. Do not place nested interactive controls inside. */
export const CardLink = forwardRef<HTMLAnchorElement, CardLinkProps>(function CardLink(
  { children, variant, tone, padding = 20, className, style, href, ...rest },
  ref,
) {
  const selectedVariant = resolveCardVariant(variant, tone);
  return (
    <a
      {...rest}
      ref={ref}
      href={href}
      className={cx('dt-card', `dt-card-${selectedVariant}`, 'dt-card-action', className)}
      style={cardStyle(selectedVariant, padding, style)}
    >
      {children}
    </a>
  );
});
CardLink.displayName = 'CardLink';
