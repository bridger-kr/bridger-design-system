import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { warnOnce } from '../../lib/deprecate';
import { CodeBlock } from './CodeBlock';
import type { CodeLine, CodeSegment, CodeSegmentTone } from './CodeBlock';
import { useDSMessages } from '../../locale/DSLocaleProvider';

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
} as const;

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
export const CodePane = forwardRef<HTMLDivElement, CodePaneProps>(function CodePane(
  { lines = [], label, copyText, copyLabel = '복사', copiedLabel = '복사됨', copyFailedLabel, copyable = false, className, ...rest },
  ref,
) {  const messages = useDSMessages();
  const resolvedCopyLabel = copyLabel ?? messages.code.copy;
  const resolvedCopiedLabel = copiedLabel ?? messages.code.copied;

  warnOnce('codepane', 'CodePane is deprecated — use `CodeBlock` (`lines`, `copy`). Removed in v2.1.');
  return (
    <CodeBlock
      ref={ref}
      lines={lines}
      label={label}
      copyText={copyText}
      copy={copyable ? { label: copyLabel, copiedLabel, failedLabel: copyFailedLabel } : false}
      showLineNumbers={false}
      className={className}
      {...rest}
    />
  );
});
CodePane.displayName = 'CodePane';
