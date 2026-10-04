// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/CodePane.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export declare const CODE_PANE_TONE: {
    readonly Plain: "plain";
    readonly Key: "key";
    readonly String: "string";
    readonly Number: "number";
    readonly Comment: "comment";
    readonly Punctuation: "punctuation";
    readonly Success: "success";
};
export type CodePaneTone = (typeof CODE_PANE_TONE)[keyof typeof CODE_PANE_TONE];
export interface CodePaneSegment {
    readonly text: string;
    readonly tone?: CodePaneTone;
}
export interface CodePaneLine {
    readonly segments: readonly CodePaneSegment[];
}
export interface CodePaneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    lines?: readonly CodePaneLine[];
    label?: ReactNode;
    copyText?: string;
    copyLabel?: ReactNode;
    copiedLabel?: ReactNode;
    copyable?: boolean;
}
export declare function CodePane({ lines, label, copyText, copyLabel, copiedLabel, copyable, className, ...rest }: CodePaneProps): import("react").JSX.Element;
