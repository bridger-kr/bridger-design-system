import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { CopyButton } from './CopyButton';

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

const COLOR: Record<TokenKind, string> = { plain: '#cdd0d8', key: '#7fd1c0', str: '#e0a96d', num: '#8fb3ff', kw: '#c98aff', pun: '#8a91a3' };

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  /** The snippet, newline-separated. Lightly token-highlighted (JSON/shell). */
  code?: string;
  /** Header label, e.g. a filename or "response". Falls back to language. */
  label?: string;
  language?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  /** Copy button label in the idle state. */
  copyLabel?: ReactNode;
  /** Copy button label after a successful copy; also announced via live region. */
  copiedLabel?: ReactNode;
  /** Copy button label after a failed copy; also announced via live region. */
  copyFailedLabel?: ReactNode;
  style?: CSSProperties;
}

/**
 * Dark code surface for the light page (Stripe-style). Header + copy + line numbers.
 * @startingPoint section="Data" subtitle="Dark code block with copy" viewport="520x220"
 */
export function CodeBlock({ code = '', label, language = 'json', showLineNumbers = true, copyable = true, copyLabel, copiedLabel, copyFailedLabel, className, style, ...rest }: CodeBlockProps) {
  const lines = String(code).replace(/\n$/, '').split('\n');

  return (
    <div {...rest} className={cx('dt-code-block', className)} style={{
      background: 'var(--dt-code-bg)', border: '1px solid var(--dt-code-border)',
      borderRadius: 'var(--dt-radius-card)', overflow: 'hidden', ...style,
    }}>
      {(label || copyable) ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px',
          borderBottom: '1px solid var(--dt-code-border)',
        }}>
          <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: '#8a91a3' }}>{label || language}</span>
          {copyable ? (
            <CopyButton
              className="dt-code-block-copy"
              value={code}
              label={copyLabel}
              copiedLabel={copiedLabel}
              failedLabel={copyFailedLabel}
            />
          ) : null}
        </div>
      ) : null}
      <div style={{ padding: '12px 0', overflowX: 'auto' }}>
        {lines.map((line, index) => (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: showLineNumbers ? '38px 1fr' : '1fr', fontFamily: 'var(--dt-font-mono)', fontSize: 12.5, lineHeight: 1.75 }}>
            {showLineNumbers ? <span style={{ textAlign: 'right', paddingRight: 14, color: '#5a6273', userSelect: 'none' }}>{index + 1}</span> : null}
            <code style={{ color: COLOR.plain, whiteSpace: 'pre', paddingRight: 14 }}>
              {highlight(line).map((segment, segmentIndex) => <span key={segmentIndex} style={{ color: COLOR[segment.c] }}>{segment.t}</span>)}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
