import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface AnnotationHotspotProps extends HTMLAttributes<HTMLDivElement> {
  x?: string;
  y?: string;
  label?: ReactNode;
  children?: ReactNode;
}

export function AnnotationHotspot({ x = '50%', y = '50%', label, children, className, style, ...rest }: AnnotationHotspotProps) {
  return (
    <div className={cx('dt-annotation-hotspot-wrap', className)} style={style} {...rest}>
      {children}
      <span className="dt-annotation-hotspot" style={{ left: x, top: y }}>
        <span className="dt-annotation-hotspot-dot" aria-hidden="true" />
        {label ? <span className="dt-annotation-hotspot-label">{label}</span> : null}
      </span>
    </div>
  );
}
