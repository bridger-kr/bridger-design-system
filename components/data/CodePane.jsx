// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/CodePane.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { warnOnce } from '../lib/deprecate.jsx';
import { CodeBlock } from './CodeBlock.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
/**
 * @deprecated Use `CodeBlock` (`lines`, `copy`, `label`). `CodePane` is a
 * compatibility wrapper removed in v2.1.
 */
export const CODE_PANE_TONE = {
    Plain: 'plain',
    Key: 'key',
    String: 'string',
    Number: 'number',
    Comment: 'comment',
    Punctuation: 'punctuation',
    Success: 'success',
};
/**
 * @deprecated Use `CodeBlock`. `CodePane` renders `CodeBlock` with
 * `showLineNumbers={false}` and maps its copy labels. Removed in v2.1.
 */
export const CodePane = forwardRef(function CodePane({ lines = [], label, copyText, copyLabel, copiedLabel, copyFailedLabel, copyable = false, className, ...rest }, ref) {
    const messages = useDSMessages();
    const resolvedCopyLabel = copyLabel ?? messages.code.copy;
    const resolvedCopiedLabel = copiedLabel ?? messages.code.copied;
    warnOnce('codepane', 'CodePane is deprecated — use `CodeBlock` (`lines`, `copy`). Removed in v2.1.');
    return (<CodeBlock ref={ref} lines={lines} label={label} copyText={copyText} copy={copyable ? { label: resolvedCopyLabel, copiedLabel: resolvedCopiedLabel, failedLabel: copyFailedLabel } : false} showLineNumbers={false} className={className} {...rest}/>);
});
CodePane.displayName = 'CodePane';
