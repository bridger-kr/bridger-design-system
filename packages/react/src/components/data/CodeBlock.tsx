import { forwardRef, useState } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';

type TokenKind = 'plain' | 'key' | 'str' | 'num' | 'kw' | 'pun';

interface CodeToken {
  t: string;
  c: TokenKind;
}

function highlight(line: string): CodeToken[] {
  const out: CodeToken[] = [];
  const re = /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(\b-?\d+(?:\.\d+)?\b)|(\b(?:true|false|null|GET|POST|PUT|DELETE)\b)|([{}[\],:])/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(line)) !== null) {
    if (match.index > last) out.push({ t: line.slice(last, match.index), c: 'plain' });
    if (match[1]) out.push({ t: match[1], c: 'key' });
    else if (match[2]) out.push({ t: match[2], c: 'str' });
    else if (match[3]) out.push({ t: match[3], c: 'num' });
    else if (match[4]) out.push({ t: match[4], c: 'kw' });
    else if (match[5]) out.push({ t: match[5], c: 'pun' });
    last = re.lastIndex;
  }

  if (last < line.length) out.push({ t: line.slice(last), c: 'plain' });
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
} as const;

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

const SEGMENT_COLOR: Record<CodeSegmentTone | TokenKind, string> = {
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
  style?: CSSProperties;
}

/**
 * Dark code surface for the light page (Stripe-style). Header + copy + line numbers.
 * Accepts a raw `code` string (built-in JSON/shell highlight) or pre-tokenized
 * `lines` for full control over segment tones.
 * @startingPoint section="Data" subtitle="Dark code block with copy" viewport="520x220"
 */
export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
  { code = '', lines, label, language = 'json', showLineNumbers = true, copy, copyable, copyText, className, style, ...rest },
  ref,
) {
  if (copyable !== undefined) {
    warnOnce('codeblock-copyable', 'CodeBlock: `copyable` is deprecated — use `copy`. Removed in v2.1.');
  }
  const copyLabels: CodeBlockCopyLabels = typeof copy === 'object' && copy !== null ? copy : {};
  const showCopy = copy === false ? false : (copyable ?? (typeof copy === 'boolean' ? copy : true));
  const [copied, setCopied] = useState<'idle' | 'copied' | 'failed'>('idle');
  const codeText = lines ? lines.map((l) => l.segments.map((s) => s.text).join('')).join('\n') : String(code).replace(/\n$/, '');
  const textLines = codeText.split('\n');

  const doCopy = () => {
    try {
      navigator.clipboard?.writeText(copyText ?? codeText)?.then(
        () => setCopied('copied'),
        () => setCopied('failed'),
      );
      if (!navigator.clipboard) setCopied('copied');
    } catch {
      setCopied('failed');
    }
    setTimeout(() => setCopied('idle'), 1400);
  };

  const copyLabel = copyLabels.label ?? '복사';
  const buttonLabel = copied === 'copied' ? copyLabels.copiedLabel ?? '복사됨' : copied === 'failed' ? copyLabels.failedLabel ?? '복사' : copyLabel;

  return (
    <div
      ref={ref}
      {...rest}
      className={className}
      style={{
        background: 'var(--dt-code-bg)', border: '1px solid var(--dt-code-border)',
        borderRadius: 'var(--dt-radius-card)', overflow: 'hidden', ...style,
      }}
    >
      {(label || showCopy) ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
          borderBottom: '1px solid var(--dt-code-border)',
        }}>
          <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: '#8a91a3' }}>{label || language}</span>
          {showCopy ? (
            <button
              type="button" onClick={doCopy}
              style={{
                marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, border: 'none',
                background: 'transparent', color: copied === 'copied' ? '#4ade80' : '#8a91a3', cursor: 'pointer',
                fontFamily: 'var(--dt-font-mono)', fontSize: 11, fontWeight: 600, padding: 0,
              }}
            >
              {copied === 'copied' ? (
                <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>{buttonLabel}</>
              ) : (
                <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>{buttonLabel}</>
              )}
            </button>
          ) : null}
        </div>
      ) : null}
      <div style={{ padding: '12px 0', overflowX: 'auto' }}>
        {textLines.map((line, index) => (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: showLineNumbers ? '38px 1fr' : '1fr', fontFamily: 'var(--dt-font-mono)', fontSize: 12.5, lineHeight: 1.75 }}>
            {showLineNumbers ? <span style={{ textAlign: 'right', paddingRight: 14, color: '#5a6273', userSelect: 'none' }}>{index + 1}</span> : null}
            <code style={{ color: SEGMENT_COLOR.plain, whiteSpace: 'pre', paddingRight: 14 }}>
              {lines
                ? lines[index]?.segments.map((segment, segmentIndex) => (
                    <span
                      key={segmentIndex}
                      className={cx('dt-code-pane-token', segment.tone && `dt-code-pane-token-${segment.tone}`)}
                      style={segment.tone ? undefined : { color: SEGMENT_COLOR.plain }}
                    >
                      {segment.text}
                    </span>
                  ))
                : highlight(line).map((segment, segmentIndex) => <span key={segmentIndex} style={{ color: SEGMENT_COLOR[segment.c] }}>{segment.t}</span>)}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';
