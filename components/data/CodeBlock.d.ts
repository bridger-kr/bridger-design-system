// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/CodeBlock.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
/** Semantic color for a pre-tokenized `lines` segment (also accepts tokenizer kinds). */
export declare const CODE_SEGMENT_TONE: {
    readonly Plain: "plain";
    readonly Key: "key";
    readonly String: "string";
    readonly Number: "number";
    readonly Comment: "comment";
    readonly Punctuation: "punctuation";
    readonly Success: "success";
};
export type CodeSegmentTone = (typeof CODE_SEGMENT_TONE)[keyof typeof CODE_SEGMENT_TONE];
export interface CodeSegment {
    readonly text: string;
    readonly tone?: CodeSegmentTone;
}
export interface CodeLine {
    readonly segments: readonly CodeSegment[];
}
export interface CodeBlockCopyLabels {
    readonly label?: ReactNode;
    readonly copiedLabel?: ReactNode;
    readonly failedLabel?: ReactNode;
}
export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
    /** The snippet, newline-separated. Lightly token-highlighted (JSON/shell). Ignored when `lines` is set. */
    code?: string;
    /** Pre-tokenized lines — renders segment tones verbatim instead of the built-in highlighter. */
    lines?: readonly CodeLine[];
    /** Header label, e.g. a filename or "response". Falls back to language. */
    label?: ReactNode;
    language?: string;
    showLineNumbers?: boolean;
    /** Copy button — `false` hides it, an object customizes its labels. */
    copy?: boolean | CodeBlockCopyLabels;
    /** @deprecated Use `copy`. Removed in v2.1. */
    copyable?: boolean;
    /** Override the text placed on the clipboard (defaults to the rendered code). */
    copyText?: string;
    /** Copy button label in the idle state. Alias for `copy.label`. */
    copyLabel?: ReactNode;
    /** Copy button label after a successful copy; also announced via live region. Alias for `copy.copiedLabel`. */
    copiedLabel?: ReactNode;
    /** Copy button label after a failed copy; also announced via live region. Alias for `copy.failedLabel`. */
    copyFailedLabel?: ReactNode;
    style?: CSSProperties;
}
/**
 * Dark code surface for the light page (Stripe-style). Header + copy + line numbers.
 * Renders in the mono stack (ASCII); Korean glyphs fall back to Pretendard Variable.
 * Accepts a raw `code` string (built-in JSON/shell highlight) or pre-tokenized
 * `lines` for full control over segment tones.
 * @startingPoint section="Data" subtitle="Dark code block with copy" viewport="520x220"
 */
export declare const CodeBlock: import("react").ForwardRefExoticComponent<CodeBlockProps & import("react").RefAttributes<HTMLDivElement>>;
