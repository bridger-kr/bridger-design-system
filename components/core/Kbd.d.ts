// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Kbd.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export declare const KBD_SIZE: {
    readonly Small: "sm";
    readonly Medium: "md";
};
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
export declare const Kbd: import("react").ForwardRefExoticComponent<KbdProps & import("react").RefAttributes<HTMLElement>>;
