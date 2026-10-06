// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Kbd.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
export const KBD_SIZE = {
    Small: 'sm',
    Medium: 'md',
};
/**
 * Keyboard-key glyph (`<kbd>`). Uses the sans face at caption/small size —
 * key names may contain Korean — with a hairline border. Compose with
 * `<kbd>` sequences for shortcuts (`<Kbd>⌘</Kbd><Kbd>K</Kbd>`).
 */
export const Kbd = forwardRef(function Kbd({ children, size = KBD_SIZE.Medium, className, ...rest }, ref) {
    return (<kbd ref={ref} className={cx('dt-kbd', className)} data-size={size} {...rest}>
      {children}
    </kbd>);
});
Kbd.displayName = 'Kbd';
