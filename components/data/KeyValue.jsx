// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/KeyValue.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
/**
 * Definition list for spec metadata — hairline rows, muted key, ink value.
 * @startingPoint section="Data" subtitle="Spec metadata as a definition list" viewport="460x220"
 */
export const KeyValue = forwardRef(function KeyValue({ items = [], columns = 1, className, style, ...rest }, ref) {
    return (<dl ref={ref} {...rest} className={cx('dt-keyvalue', columns === 2 && 'dt-keyvalue-2col', className)} style={style}>
      {items.map((item, index) => (<div key={index} className="dt-keyvalue-item">
          <dt className="dt-keyvalue-key">{item.key}</dt>
          <dd className={cx('dt-keyvalue-val', item.mono && 'dt-keyvalue-val-mono', item.accent && 'dt-keyvalue-val-accent')}>
            {item.value}
          </dd>
        </div>))}
    </dl>);
});
KeyValue.displayName = 'KeyValue';
