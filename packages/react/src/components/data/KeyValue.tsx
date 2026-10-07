import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface KeyValueItem {
  key: string;
  value: ReactNode;
  /** Render the value in the mono stack (ASCII: paths, IDs, methods). */
  mono?: boolean;
  /** Tint the value persimmon (highlighted field). */
  accent?: boolean;
}

export interface KeyValueProps extends Omit<HTMLAttributes<HTMLDListElement>, 'children' | 'style'> {
  items?: KeyValueItem[];
  /** 1 = stacked rows, 2 = two-up grid. */
  columns?: 1 | 2;
  style?: CSSProperties;
}

/**
 * Definition list for spec metadata — hairline rows, muted key, ink value.
 * @startingPoint section="Data" subtitle="Spec metadata as a definition list" viewport="460x220"
 */
export const KeyValue = forwardRef<HTMLDListElement, KeyValueProps>(function KeyValue(
  { items = [], columns = 1, className, style, ...rest },
  ref,
) {
  return (
    <dl ref={ref} {...rest} className={cx('dt-keyvalue', columns === 2 && 'dt-keyvalue-2col', className)} style={style}>
      {items.map((item, index) => (
        <div key={index} className="dt-keyvalue-item">
          <dt className="dt-keyvalue-key">{item.key}</dt>
          <dd
            className={cx('dt-keyvalue-val', item.mono && 'dt-keyvalue-val-mono', item.accent && 'dt-keyvalue-val-accent')}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
});
KeyValue.displayName = 'KeyValue';
