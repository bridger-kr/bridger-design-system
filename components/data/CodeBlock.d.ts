// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/CodeBlock.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
    /** The snippet, newline-separated. Lightly token-highlighted (JSON/shell). */
    code?: string;
    /** Header label, e.g. a filename or "response". Falls back to language. */
    label?: string;
    language?: string;
    showLineNumbers?: boolean;
    copyable?: boolean;
    style?: CSSProperties;
}
/**
 * Dark code surface for the light page (Stripe-style). Header + copy + line numbers.
 * @startingPoint section="Data" subtitle="Dark code block with copy" viewport="520x220"
 */
export declare function CodeBlock({ code, label, language, showLineNumbers, copyable, style, ...rest }: CodeBlockProps): import("react").JSX.Element;
