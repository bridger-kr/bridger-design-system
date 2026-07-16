import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type SearchPillTone = 'accent' | 'neutral';
export type SearchPillSize = 'sm' | 'md' | 'lg';

export interface SearchPillProps extends HTMLAttributes<HTMLDivElement> {
  tone?: SearchPillTone;
  size?: SearchPillSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  artifactLabel?: ReactNode;
  children?: ReactNode;
}

export function SearchPill({
  tone = 'neutral',
  size = 'md',
  leadingIcon,
  trailingIcon,
  artifactLabel,
  children,
  className,
  ...rest
}: SearchPillProps) {
  const pill = (
    <div className={cx('dt-search-pill', `dt-search-pill-${tone}`, `dt-search-pill-${size}`, className)} {...rest}>
      {leadingIcon ? <span className="dt-search-pill-icon">{leadingIcon}</span> : null}
      <span className="dt-search-pill-label">{children}</span>
      {trailingIcon ? <span className="dt-search-pill-icon">{trailingIcon}</span> : null}
    </div>
  );

  if (!artifactLabel) {
    return pill;
  }

  return (
    <div className="dt-search-pill-artifact">
      <div className="dt-search-pill-artifact-header">{artifactLabel}</div>
      {pill}
    </div>
  );
}
