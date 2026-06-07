import * as React from 'react';

export interface CodeBlockProps {
  /** The snippet, newline-separated. Lightly token-highlighted (JSON/shell). */
  code: string;
  /** Header label, e.g. a filename or "response". Falls back to language. */
  label?: string;
  language?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  style?: React.CSSProperties;
}

/**
 * Dark code surface for the light page (Stripe-style). Header + copy + line numbers.
 * @startingPoint section="Data" subtitle="Dark code block with copy" viewport="520x220"
 */
export function CodeBlock(props: CodeBlockProps): React.JSX.Element;
