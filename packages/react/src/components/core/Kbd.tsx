import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export const KBD_SIZE = {
  Small: 'sm',
  Medium: 'md',
} as const;

export type KbdSize = (typeof KBD_SIZE)[keyof typeof KBD_SIZE];

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  size?: KbdSize;
}

/**
 * Keyboard-key glyph (`<kbd>`). Uses the sans face at caption/small size —
 * key names may contain Korean — with a hairline border. Compose with
 * `<kbd>` sequences for shortcuts (`<Kbd>⌘</Kbd><Kbd>K</Kbd>`).
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { children, size = KBD_SIZE.Medium, className, ...rest },
  ref,
) {
  return (
    <kbd ref={ref} className={cx('dt-kbd', className)} data-size={size} {...rest}>
      {children}
    </kbd>
  );
});
Kbd.displayName = 'Kbd';
