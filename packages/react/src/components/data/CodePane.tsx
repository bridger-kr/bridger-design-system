import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { CopyButton } from './CopyButton';

export const CODE_PANE_TONE = {
  Plain: 'plain',
  Key: 'key',
  String: 'string',
  Number: 'number',
  Comment: 'comment',
  Punctuation: 'punctuation',
  Success: 'success',
} as const;

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
  copyFailedLabel?: ReactNode;
  copyable?: boolean;
}

function lineText(line: CodePaneLine): string {
  return line.segments.map((segment) => segment.text).join('');
}

function codePaneCopyText(lines: readonly CodePaneLine[]): string {
  return lines.map(lineText).join('\n');
}

export function CodePane({
  lines = [],
  label,
  copyText,
  copyLabel,
  copiedLabel,
  copyFailedLabel,
  copyable = false,
  className,
  ...rest
}: CodePaneProps) {
  const textToCopy = copyText ?? codePaneCopyText(lines);

  return (
    <div className={cx('dt-code-pane', className)} {...rest}>
      {label || copyable ? (
        <div className="dt-code-pane-header">
          {label ? <span className="dt-code-pane-label">{label}</span> : <span />}
          {copyable ? (
            <CopyButton
              className="dt-code-pane-copy"
              value={textToCopy}
              label={copyLabel}
              copiedLabel={copiedLabel}
              failedLabel={copyFailedLabel}
            />
          ) : null}
        </div>
      ) : null}
      <pre className="dt-code-pane-pre">
        <code>
          {lines.map((line, lineIndex) => (
            <span className="dt-code-pane-line" key={`line-${lineIndex}`}>
              {line.segments.map((segment, segmentIndex) => (
                <span className={cx('dt-code-pane-token', segment.tone && `dt-code-pane-token-${segment.tone}`)} key={`segment-${lineIndex}-${segmentIndex}`}>
                  {segment.text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
