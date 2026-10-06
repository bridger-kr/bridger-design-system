// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/LogRow.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
export type LogLevel = 'ok' | 'warn' | 'error' | 'info';
export interface LogEntry {
    time: string;
    level: LogLevel;
    tool: string;
    message?: string;
    /** Latency string (e.g. "142ms"). When absent, the level label shows instead. */
    latency?: string;
}
export interface LogRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
    entries?: LogEntry[];
    style?: CSSProperties;
}
/**
 * Dense tabular execution-log stream — hairline rows, status dots, mono columns.
 * @startingPoint section="Data" subtitle="Execution-log stream" viewport="560x200"
 */
export declare const LogRow: import("react").ForwardRefExoticComponent<LogRowProps & import("react").RefAttributes<HTMLDivElement>>;
