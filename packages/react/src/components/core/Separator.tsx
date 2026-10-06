import { forwardRef } from 'react';
import { Separator as BaseSeparator } from '@base-ui-components/react/separator';
import { cx } from '../../lib/cx';

export type SeparatorProps = BaseSeparator.Props;

/**
 * Hairline divider between content groups (base-ui `Separator`). Renders a
 * `<div>` with `role="separator"` and the `data-orientation` state attribute;
 * a `vertical` separator must sit inside a flex row to have a visible height.
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', className, ...rest },
  ref,
) {
  const resolvedClassName =
    typeof className === 'function'
      ? (state: BaseSeparator.State) => cx('dt-separator', className(state))
      : cx('dt-separator', className);

  return (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      className={resolvedClassName}
      {...rest}
    />
  );
});
Separator.displayName = 'Separator';
