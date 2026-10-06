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
const SEGMENT_COLOR = {
    plain: '#cdd0d8',
    key: '#7fd1c0',
    str: '#e0a96d',
    num: '#8fb3ff',
    kw: '#c98aff',
    pun: '#8a91a3',
    string: '#e0a96d',
    number: '#8fb3ff',
    comment: '#8a91a3',
    punctuation: '#8a91a3',
    success: '#4ade80',
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
    return (<div ref={ref} {...rest} className={cx('dt-code-block', className)} style={{
            background: 'var(--dt-code-bg)', border: '1px solid var(--dt-code-border)',
            borderRadius: 'var(--dt-radius-card)', overflow: 'hidden', ...style,
        }}>
      {(label || showCopy) ? (<div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
                borderBottom: '1px solid var(--dt-code-border)',
            }}>
          <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: '#8a91a3' }}>{label || language}</span>
          {showCopy ? (<CopyButton className="dt-code-block-copy" value={copyText ?? codeText} label={copyLabels.label} copiedLabel={copyLabels.copiedLabel} failedLabel={copyLabels.failedLabel}/>) : null}
        </div>) : null}
      <div style={{ padding: '12px 0', overflowX: 'auto' }}>
        {textLines.map((line, index) => (<div key={index} style={{ display: 'grid', gridTemplateColumns: showLineNumbers ? '38px 1fr' : '1fr', fontFamily: 'var(--dt-font-mono)', fontSize: 12.5, lineHeight: 1.75 }}>
            {showLineNumbers ? <span style={{ textAlign: 'right', paddingRight: 14, color: '#5a6273', userSelect: 'none' }}>{index + 1}</span> : null}
            <code style={{ color: SEGMENT_COLOR.plain, whiteSpace: 'pre', paddingRight: 14 }}>
              {lines
                ? lines[index]?.segments.map((segment, segmentIndex) => (<span key={segmentIndex} className={cx('dt-code-pane-token', segment.tone && `dt-code-pane-token-${segment.tone}`)} style={segment.tone ? undefined : { color: SEGMENT_COLOR.plain }}>
                      {segment.text}
                    </span>))
                : highlight(line).map((segment, segmentIndex) => <span key={segmentIndex} style={{ color: SEGMENT_COLOR[segment.c] }}>{segment.t}</span>)}
            </code>
          </div>))}
      </div>
    </div>);
});
CodeBlock.displayName = 'CodeBlock';
