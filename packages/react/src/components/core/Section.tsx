import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';

/** `plain` = transparent band; `sunken` = recessed surface wash. */
export type SectionVariant = 'plain' | 'sunken';
/** Deprecated v1 layout roles accepted on `variant` for one minor cycle. */
type LegacySectionVariant = 'band' | 'proof';
/** @deprecated Use `variant`. Removed in v2.1. */
export type SectionTone = 'soft' | 'accent-wash' | 'grid';
/** Inner content column width. */
export type SectionWidth = 'narrow' | 'default' | 'wide';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Background treatment. `band`/`proof` are deprecated and map to `sunken`. */
  variant?: SectionVariant | LegacySectionVariant;
  /** @deprecated Use `variant`. `soft` → `plain`; `accent-wash`/`grid` → `sunken`. Removed in v2.1. */
  tone?: SectionTone;
  /** Content column width. */
  width?: SectionWidth;
  innerClassName?: string;
  children?: ReactNode;
}

const LEGACY_VARIANT_MAP: Record<LegacySectionVariant, SectionVariant> = {
  band: 'sunken',
  proof: 'sunken',
};

const LEGACY_TONE_MAP: Record<SectionTone, SectionVariant> = {
  soft: 'plain',
  'accent-wash': 'sunken',
  grid: 'sunken',
};

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { variant = 'plain', tone, width, innerClassName, className, children, ...rest },
  ref,
) {
  let resolvedVariant: SectionVariant;
  if (tone !== undefined) {
    warnOnce(
      `section-tone-${tone}`,
      `Section: tone="${tone}" is deprecated — use variant="${LEGACY_TONE_MAP[tone]}". Removed in v2.1.`,
    );
    resolvedVariant = LEGACY_TONE_MAP[tone];
  } else if (variant === 'band' || variant === 'proof') {
    warnOnce(
      `section-variant-${variant}`,
      `Section: variant="${variant}" is deprecated — use variant="sunken". Removed in v2.1.`,
    );
    resolvedVariant = LEGACY_VARIANT_MAP[variant];
  } else {
    resolvedVariant = variant;
  }

  return (
    <section
      ref={ref}
      className={cx(
        'dt-section',
        `dt-section-${resolvedVariant}`,
        width && width !== 'default' && `dt-section-width-${width}`,
        className,
      )}
      {...rest}
    >
      <div className={cx('dt-section-inner', innerClassName)}>{children}</div>
    </section>
  );
});
Section.displayName = 'Section';
