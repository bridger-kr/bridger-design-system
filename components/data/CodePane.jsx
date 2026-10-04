// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/CodePane.tsx
// Regenerate: pnpm generate

import { useState } from 'react';
import { cx } from '../lib/cx.jsx';
export const CODE_PANE_TONE = {
    Plain: 'plain',
    Key: 'key',
    String: 'string',
    Number: 'number',
    Comment: 'comment',
    Punctuation: 'punctuation',
    Success: 'success',
};
function lineText(line) {
    return line.segments.map((segment) => segment.text).join('');
}
function codePaneCopyText(lines) {
    return lines.map(lineText).join('\n');
}
export function CodePane({ lines = [], label, copyText, copyLabel = '복사', copiedLabel = '복사됨', copyable = false, className, ...rest }) {
    const [copied, setCopied] = useState(false);
    const textToCopy = copyText ?? codePaneCopyText(lines);
    const copy = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            void navigator.clipboard.writeText(textToCopy).then(() => setCopied(true), () => setCopied(true));
        }
        else {
            setCopied(true);
        }
        if (typeof window !== 'undefined') {
            window.setTimeout(() => setCopied(false), 1400);
        }
    };
    return (<div className={cx('dt-code-pane', className)} {...rest}>
      {label || copyable ? (<div className="dt-code-pane-header">
          {label ? <span className="dt-code-pane-label">{label}</span> : <span />}
          {copyable ? (<button type="button" className="dt-code-pane-copy" data-copied={copied ? 'true' : 'false'} onClick={copy}>
              <span aria-hidden="true" className="dt-code-pane-copy-icon"/>
              {copied ? copiedLabel : copyLabel}
            </button>) : null}
        </div>) : null}
      <pre className="dt-code-pane-pre">
        <code>
          {lines.map((line, lineIndex) => (<span className="dt-code-pane-line" key={`line-${lineIndex}`}>
              {line.segments.map((segment, segmentIndex) => (<span className={cx('dt-code-pane-token', segment.tone && `dt-code-pane-token-${segment.tone}`)} key={`segment-${lineIndex}-${segmentIndex}`}>
                  {segment.text}
                </span>))}
            </span>))}
        </code>
      </pre>
    </div>);
}
