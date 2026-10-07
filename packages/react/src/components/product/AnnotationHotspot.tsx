import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface AnnotationHotspotProps extends HTMLAttributes<HTMLDivElement> {
  x?: string;
  y?: string;
  label?: ReactNode;
  children?: ReactNode;
}

export const AnnotationHotspot = forwardRef<HTMLDivElement, AnnotationHotspotProps>(function AnnotationHotspot(
  { x = '50%', y = '50%', label, children, className, style, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('dt-annotation-hotspot-wrap', className)} style={style} {...rest}>
      {children}
      <span
        className="dt-annotation-hotspot"
        style={{ '--dt-annotation-x': x, '--dt-annotation-y': y } as CSSProperties}
      >
        <span className="dt-annotation-hotspot-dot" aria-hidden="true" />
        {label ? <span className="dt-annotation-hotspot-label">{label}</span> : null}
      </span>
    </div>
  );
});
AnnotationHotspot.displayName = 'AnnotationHotspot';
