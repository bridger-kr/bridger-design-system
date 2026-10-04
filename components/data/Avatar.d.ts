// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/Avatar.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
declare const SIZE: {
    readonly sm: 26;
    readonly md: 34;
    readonly lg: 44;
};
export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
    name?: string;
    src?: string;
    size?: keyof typeof SIZE | number;
    status?: 'online' | 'busy' | 'away' | 'offline';
    /** Rounded square (default) vs full circle. */
    square?: boolean;
    style?: CSSProperties;
}
/**
 * Avatar — image or initials in a rounded square. Optional status dot.
 * Deterministic tint from the name when no image is given.
 */
export declare function Avatar({ name, src, size, status, square, style, ...rest }: AvatarProps): import("react").JSX.Element;
export {};
