// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/AnnotationHotspot.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
export function AnnotationHotspot({ x = '50%', y = '50%', label, children, className, style, ...rest }) {
    return (<div className={cx('dt-annotation-hotspot-wrap', className)} style={style} {...rest}>
      {children}
      <span className="dt-annotation-hotspot" style={{ left: x, top: y }}>
        <span className="dt-annotation-hotspot-dot" aria-hidden="true"/>
        {label ? <span className="dt-annotation-hotspot-label">{label}</span> : null}
      </span>
    </div>);
}
