import type { HTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import { cx } from '../../lib/cx';

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
  /** Copy button label after a failed copy; also announced via live region. */
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
  copyLabel = '복사',
  copiedLabel = '복사됨',
  copyFailedLabel = '복사하지 못했어요',
  copyable = false,
  className,
  ...rest
}: CodePaneProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const textToCopy = copyText ?? codePaneCopyText(lines);

  const copy = () => {
    const reset = () => {
      if (typeof window !== 'undefined') {
        window.setTimeout(() => setCopyState('idle'), 1400);
      }
    };

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(textToCopy).then(
        () => setCopyState('copied'),
        () => setCopyState('failed'),
      );
    } else {
      setCopyState('failed');
    }

    reset();
  };

  const stateLabel = copyState === 'copied' ? copiedLabel : copyState === 'failed' ? copyFailedLabel : null;

  return (
    <div className={cx('dt-code-pane', className)} {...rest}>
      {label || copyable ? (
        <div className="dt-code-pane-header">
          {label ? <span className="dt-code-pane-label">{label}</span> : <span />}
          {copyable ? (
            <button type="button" className="dt-code-pane-copy" data-copied={copyState === 'copied' ? 'true' : 'false'} data-copy-failed={copyState === 'failed' ? 'true' : 'false'} onClick={copy}>
              <span aria-hidden="true" className="dt-code-pane-copy-icon" />
              {stateLabel ?? copyLabel}
            </button>
          ) : null}
          <span className="dt-visually-hidden" role="status">{stateLabel ?? ''}</span>
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
