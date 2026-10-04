// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/Textarea.tsx
// Regenerate: pnpm generate

import type { CSSProperties, TextareaHTMLAttributes } from 'react';
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
    label?: string;
    hint?: string;
    rows?: number;
    /** Render in JetBrains Mono (for JSON / payloads). */
    mono?: boolean;
    style?: CSSProperties;
}
/** Multi-line text field with a persimmon focus ring. */
export declare function Textarea({ label, hint, rows, mono, id, style, ...rest }: TextareaProps): import("react").JSX.Element;
