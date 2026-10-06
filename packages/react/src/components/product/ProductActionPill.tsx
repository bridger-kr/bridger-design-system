import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactElement, ReactNode, Ref } from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';

export const PRODUCT_ACTION_PILL_VARIANT = {
  Solid: 'solid',
  Outline: 'outline',
} as const;

export const PRODUCT_ACTION_PILL_TONE = {
  Neutral: 'neutral',
  Accent: 'accent',
} as const;

export const PRODUCT_ACTION_PILL_SIZE = {
  Compact: 'compact',
  Hero: 'hero',
} as const;

export type ProductActionPillVariant = (typeof PRODUCT_ACTION_PILL_VARIANT)[keyof typeof PRODUCT_ACTION_PILL_VARIANT];
export type ProductActionPillTone = (typeof PRODUCT_ACTION_PILL_TONE)[keyof typeof PRODUCT_ACTION_PILL_TONE];
export type ProductActionPillSize = (typeof PRODUCT_ACTION_PILL_SIZE)[keyof typeof PRODUCT_ACTION_PILL_SIZE];

/** @deprecated Legacy `variant` values kept for one minor cycle. */
export type LegacyProductActionPillVariant = 'default' | 'accent';

const PILL_CLASS: Record<string, string> = {
  'solid-neutral': 'dt-product-action-pill-default',
  'solid-accent': 'dt-product-action-pill-accent',
  'outline-neutral': 'dt-product-action-pill-outline',
  'outline-accent': 'dt-product-action-pill-outline',
};

const SIZE_CLASS: Record<ProductActionPillSize, string> = {
  [PRODUCT_ACTION_PILL_SIZE.Compact]: 'dt-product-action-pill-compact',
  [PRODUCT_ACTION_PILL_SIZE.Hero]: 'dt-product-action-pill-hero',
};

export type ProductActionPillProps<T extends ElementType = 'a'> = {
  as?: T;
  /** Visual shape. */
  variant?: ProductActionPillVariant | LegacyProductActionPillVariant;
  /** Semantic color. */
  tone?: ProductActionPillTone;
  size?: ProductActionPillSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function productActionPillClassName({
  variant = PRODUCT_ACTION_PILL_VARIANT.Solid,
  tone = PRODUCT_ACTION_PILL_TONE.Neutral,
  size = PRODUCT_ACTION_PILL_SIZE.Compact,
  iconOnly = false,
  className,
}: {
  variant?: ProductActionPillVariant | LegacyProductActionPillVariant;
  tone?: ProductActionPillTone;
  size?: ProductActionPillSize;
  iconOnly?: boolean;
  className?: string;
} = {}) {
  const [resolvedVariant, resolvedTone] = resolvePillAppearance(variant, tone);
  return cx('dt-product-action-pill', PILL_CLASS[`${resolvedVariant}-${resolvedTone}`], SIZE_CLASS[size], iconOnly && 'dt-product-action-pill-icon-only', className);
}

function resolvePillAppearance(
  variant: ProductActionPillVariant | LegacyProductActionPillVariant | undefined,
  tone: ProductActionPillTone | undefined,
): [ProductActionPillVariant, ProductActionPillTone] {
  if (variant === 'default' || variant === 'accent') {
    warnOnce(
      `pill-variant-${variant}`,
      `ProductActionPill: \`variant="${variant}"\` is deprecated — use \`variant="solid" tone="${variant === 'accent' ? 'accent' : 'neutral'}"\`. Removed in v2.1.`,
    );
    return [PRODUCT_ACTION_PILL_VARIANT.Solid, tone ?? (variant === 'accent' ? PRODUCT_ACTION_PILL_TONE.Accent : PRODUCT_ACTION_PILL_TONE.Neutral)];
  }
  return [variant ?? PRODUCT_ACTION_PILL_VARIANT.Solid, tone ?? PRODUCT_ACTION_PILL_TONE.Neutral];
}

function ProductActionPillInner<T extends ElementType = 'a'>(
  {
    as,
    variant = PRODUCT_ACTION_PILL_VARIANT.Solid,
    tone = PRODUCT_ACTION_PILL_TONE.Neutral,
    size = PRODUCT_ACTION_PILL_SIZE.Compact,
    leadingIcon,
    trailingIcon,
    children,
    className,
    ...rest
  }: ProductActionPillProps<T>,
  ref: Ref<HTMLElement>,
) {
  const Component = (as ?? 'a') as ElementType;
  const iconOnly = Boolean(!children && (leadingIcon || trailingIcon));

  return (
    <Component ref={ref} className={productActionPillClassName({ variant, tone, size, iconOnly, className })} {...rest}>
      {leadingIcon ? <span className="dt-product-action-pill-icon">{leadingIcon}</span> : null}
      {children ? <span className="dt-product-action-pill-label">{children}</span> : null}
      {trailingIcon ? <span className="dt-product-action-pill-icon">{trailingIcon}</span> : null}
    </Component>
  );
}

export const ProductActionPill = forwardRef(ProductActionPillInner) as <T extends ElementType = 'a'>(
  props: ProductActionPillProps<T> & { ref?: Ref<HTMLElement> },
) => ReactElement;
(ProductActionPill as { displayName?: string }).displayName = 'ProductActionPill';
