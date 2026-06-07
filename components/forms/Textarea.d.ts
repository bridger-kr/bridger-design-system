import * as React from 'react';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  label?: string;
  hint?: string;
  rows?: number;
  /** Render in JetBrains Mono (for JSON / payloads). */
  mono?: boolean;
  style?: React.CSSProperties;
}

/** Multi-line text field with a persimmon focus ring. */
export function Textarea(props: TextareaProps): React.JSX.Element;
