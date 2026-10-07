import { forwardRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';

export type SectionCardSlotProps = {
  content?: HTMLAttributes<HTMLDivElement>;
};

export interface SectionCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  /** Right-aligned action (usually a ghost Button). */
  action?: ReactNode;
  children?: ReactNode;
  /** @deprecated Use `slotProps.content.className`. Removed in v2.1. */
  contentClassName?: string;
  /** Prop bags for inner elements (`content` wrapper). */
  slotProps?: SectionCardSlotProps;
}

/**
 * Console section panel — title, description, action, body. No eyebrow kicker:
 * the title is a plain noun-phrase heading, the section's own content does the
 * rest. Lay items flat inside; never card-in-card.
 */
export const SectionCard = forwardRef<HTMLElement, SectionCardProps>(function SectionCard(
  { eyebrow, title, description, action, children, contentClassName, slotProps, className, style, ...rest },
  ref,
) {
  const hasHeader = Boolean(eyebrow || title || description || action);
  if (contentClassName !== undefined) {
    warnOnce('sectioncard-contentclassname', 'SectionCard: `contentClassName` is deprecated — use `slotProps.content.className`. Removed in v2.1.');
  }
  return (
    <section
      ref={ref}
      {...rest}
      className={cx('dt-section-card', className)}
      style={style}
    >
      {hasHeader ? (
        <header className="dt-section-card-header" data-has-body={children ? '' : undefined}>
          <div className="dt-section-card-text">
            {eyebrow ? <p className="dt-section-card-eyebrow">{eyebrow}</p> : null}
            {title ? <h3 className="dt-section-card-title">{title}</h3> : null}
            {description ? <p className="dt-section-card-desc">{description}</p> : null}
          </div>
          {action ? <div className="dt-section-card-action">{action}</div> : null}
        </header>
      ) : null}
      <div {...slotProps?.content} className={cx(slotProps?.content?.className, contentClassName)}>{children}</div>
    </section>
  );
});
SectionCard.displayName = 'SectionCard';
