// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Input.tsx
// Regenerate: pnpm generate

import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'style'> {
    label?: string;
    hint?: string;
    /** Render the value in JetBrains Mono — for API paths, keys, IDs. */
    mono?: boolean;
    /** Leading adornment (icon or short text). */
    prefix?: ReactNode;
    invalid?: boolean;
    style?: CSSProperties;
}
/**
 * Compact labeled input, paired with a label or table context. Supports a
 * mono variant for API paths / keys / IDs.
 */
export declare function Input({ label, hint, mono, id, type, prefix, invalid, disabled, className, style, ...rest }: InputProps): import("react").JSX.Element;
