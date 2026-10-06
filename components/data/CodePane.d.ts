// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/CodePane.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
import type { CodeLine, CodeSegment, CodeSegmentTone } from './CodeBlock';
/**
 * @deprecated Use `CodeBlock` (`lines`, `copy`, `label`). `CodePane` is a
 * compatibility wrapper removed in v2.1.
 */
export declare const CODE_PANE_TONE: {
    readonly Plain: "plain";
    readonly Key: "key";
    readonly String: "string";
    readonly Number: "number";
    readonly Comment: "comment";
    readonly Punctuation: "punctuation";
    readonly Success: "success";
};
/** @deprecated Use `CodeSegmentTone` from `CodeBlock`. */
export type CodePaneTone = CodeSegmentTone;
/** @deprecated Use `CodeSegment` from `CodeBlock`. */
export type CodePaneSegment = CodeSegment;
/** @deprecated Use `CodeLine` from `CodeBlock`. */
export type CodePaneLine = CodeLine;
export interface CodePaneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    lines?: readonly CodePaneLine[];
    label?: ReactNode;
    copyText?: string;
    copyLabel?: ReactNode;
    copiedLabel?: ReactNode;
    copyFailedLabel?: ReactNode;
    copyable?: boolean;
}
/**
 * @deprecated Use `CodeBlock`. `CodePane` renders `CodeBlock` with
 * `showLineNumbers={false}` and maps its copy labels. Removed in v2.1.
 */
export declare const CodePane: import("react").ForwardRefExoticComponent<CodePaneProps & import("react").RefAttributes<HTMLDivElement>>;
