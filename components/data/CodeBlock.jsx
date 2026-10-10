// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/CodeBlock.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
import { CopyButton } from './CopyButton.jsx';
function highlight(line) {
    const out = [];
    const re = /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(\b-?\d+(?:\.\d+)?\b)|(\b(?:true|false|null|GET|POST|PUT|DELETE)\b)|([{}[\],:])/g;
    let last = 0;
    let match;
    while ((match = re.exec(line)) !== null) {
        if (match.index > last)
            out.push({ t: line.slice(last, match.index), c: 'plain' });
        if (match[1])
            out.push({ t: match[1], c: 'key' });
        else if (match[2])
            out.push({ t: match[2], c: 'str' });
        else if (match[3])
            out.push({ t: match[3], c: 'num' });
        else if (match[4])
            out.push({ t: match[4], c: 'kw' });
        else if (match[5])
            out.push({ t: match[5], c: 'pun' });
        last = re.lastIndex;
    }
    if (last < line.length)
        out.push({ t: line.slice(last), c: 'plain' });
    return out;
}
/** Semantic color for a pre-tokenized `lines` segment (also accepts tokenizer kinds). */
export const CODE_SEGMENT_TONE = {
    Plain: 'plain',
    Key: 'key',
    String: 'string',
    Number: 'number',
    Comment: 'comment',
    Punctuation: 'punctuation',
    Success: 'success',
};
/** Segment-tone → token class (replaces the old hardcoded hex palette —
    tones resolve through the canonical `--dt-syntax-*` contract). */
const SEGMENT_CLASS = {
    plain: 'dt-code-seg-plain',
    key: 'dt-code-seg-key',
    str: 'dt-code-seg-string',
    num: 'dt-code-seg-number',
    kw: 'dt-code-seg-key',
    pun: 'dt-code-seg-punctuation',
    string: 'dt-code-seg-string',
    number: 'dt-code-seg-number',
    comment: 'dt-code-seg-comment',
    punctuation: 'dt-code-seg-punctuation',
    success: 'dt-code-seg-success',
};
/**
 * Dark code surface for the light page (Stripe-style). Header + copy + line numbers.
 * Renders in the mono stack (ASCII); Korean glyphs fall back to Pretendard Variable.
 * Accepts a raw `code` string (built-in JSON/shell highlight) or pre-tokenized
 * `lines` for full control over segment tones.
 * @startingPoint section="Data" subtitle="Dark code block with copy" viewport="520x220"
 */
export const CodeBlock = forwardRef(function CodeBlock({ code = '', lines, label, language = 'json', showLineNumbers = true, copy, copyable, copyText, copyLabel, copiedLabel, copyFailedLabel, className, style, ...rest }, ref) {
    if (copyable !== undefined) {
        warnOnce('codeblock-copyable', 'CodeBlock: `copyable` is deprecated — use `copy`. Removed in v2.1.');
    }
    const copyLabels = {
        label: copyLabel,
        copiedLabel,
        failedLabel: copyFailedLabel,
        ...(typeof copy === 'object' && copy !== null ? copy : {}),
    };
    const showCopy = copy === false ? false : (copyable ?? (typeof copy === 'boolean' ? copy : true));
    const codeText = lines ? lines.map((l) => l.segments.map((s) => s.text).join('')).join('\n') : String(code).replace(/\n$/, '');
    const textLines = codeText.split('\n');
    return (<div ref={ref} {...rest} className={cx('dt-code-block', className)} style={style}>
      {(label || showCopy) ? (<div className="dt-code-block-head">
          <span className="dt-code-block-lang">{label || language}</span>
          {showCopy ? (<CopyButton className="dt-code-block-copy" value={copyText ?? codeText} label={copyLabels.label} copiedLabel={copyLabels.copiedLabel} failedLabel={copyLabels.failedLabel}/>) : null}
        </div>) : null}
      <div className="dt-code-block-lines" role="region" aria-label={typeof label === 'string' ? label : language} tabIndex={0}>
        {textLines.map((line, index) => (<div key={index} className={cx('dt-code-block-line', showLineNumbers && 'dt-code-block-line-numbered')}>
            {showLineNumbers ? <span className="dt-code-block-lineno">{index + 1}</span> : null}
            <code className="dt-code-block-code">
              {lines
                ? lines[index]?.segments.map((segment, segmentIndex) => (<span key={segmentIndex} className={segment.tone ? cx('dt-code-pane-token', `dt-code-pane-token-${segment.tone}`) : 'dt-code-seg-plain'}>
                      {segment.text}
                    </span>))
                : highlight(line).map((segment, segmentIndex) => <span key={segmentIndex} className={SEGMENT_CLASS[segment.c]}>{segment.t}</span>)}
            </code>
          </div>))}
      </div>
    </div>);
});
CodeBlock.displayName = 'CodeBlock';
