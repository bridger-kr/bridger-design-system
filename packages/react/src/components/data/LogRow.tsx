import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { forwardRef } from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../lib/cx';
import { Icon } from '../../lib/icon';
import { useDSMessages } from '../../locale/DSLocaleProvider';
import type { LucideIcon } from 'lucide-react';

export type LogLevel = 'ok' | 'warn' | 'error' | 'info';

const LEVEL_ICON: Record<LogLevel, LucideIcon> = {
  ok: CheckCircle2,
  warn: AlertTriangle,
  error: XCircle,
  info: Info,
};

export interface LogEntry {
  time: string;
  level: LogLevel;
  tool: string;
  message?: string;
  /** Latency string (e.g. "142ms"). When absent, the level label shows instead. */
  latency?: string;
  /** Correlation link (request trace, related log). Wraps the message text. */
  href?: string;
}

export interface LogRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  entries?: LogEntry[];
  style?: CSSProperties;
}

/**
 * Dense tabular execution-log stream — hairline rows, severity icon + text
 * (never color-only), mono columns.
 * @startingPoint section="Data" subtitle="Execution-log stream" viewport="560x200"
 */
export const LogRow = forwardRef<HTMLDivElement, LogRowProps>(function LogRow(
  { entries = [], className, style, ...rest },
  ref,
) {
  const messages = useDSMessages();
  return (
    <div ref={ref} {...rest} className={cx('dt-logrow', className)} style={style}>
      {entries.map((entry, index) => {
        const level = entry.level in LEVEL_ICON ? entry.level : 'info';
        const levelLabel = messages.logRow.level[level];

        return (
          <div key={index} className="dt-logrow-row">
            <span className="dt-logrow-time">{entry.time}</span>
            <span className={`dt-logrow-dot dt-logrow-dot-${level}`} aria-hidden="true" />
            <span className="dt-logrow-msg">
              <span className={`dt-logrow-level dt-logrow-level-${level}`}>
                <Icon icon={LEVEL_ICON[level]} />
                {levelLabel}
              </span>
              <span className="dt-logrow-tool">{entry.tool}</span>
              {entry.message ? (
                <span className="dt-logrow-note">
                  {'  '}
                  {entry.href ? <a href={entry.href}>{entry.message}</a> : entry.message}
                </span>
              ) : null}
            </span>
            <span className={cx('dt-logrow-end', !entry.latency && `dt-logrow-end-${level}`)}>
              {entry.latency || levelLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
});
LogRow.displayName = 'LogRow';
