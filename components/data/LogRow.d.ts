import * as React from 'react';

export interface LogEntry {
  time: string;
  level: 'ok' | 'warn' | 'error' | 'info';
  tool: string;
  message?: string;
  /** Latency string (e.g. "142ms"). When absent, the level label shows instead. */
  latency?: string;
}
export interface LogRowProps {
  entries: LogEntry[];
  style?: React.CSSProperties;
}

/**
 * Dense tabular execution-log stream — hairline rows, status dots, mono columns.
 * @startingPoint section="Data" subtitle="Execution-log stream" viewport="560x200"
 */
export function LogRow(props: LogRowProps): React.JSX.Element;
