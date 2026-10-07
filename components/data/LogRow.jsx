// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/LogRow.tsx
// Regenerate: pnpm generate

import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
const LEVEL_ICON = {
    ok: CheckCircle2,
    warn: AlertTriangle,
    error: XCircle,
    info: Info,
};
/**
 * Dense tabular execution-log stream — hairline rows, severity icon + text
 * (never color-only), mono columns.
 * @startingPoint section="Data" subtitle="Execution-log stream" viewport="560x200"
 */
export const LogRow = forwardRef(function LogRow({ entries = [], className, style, ...rest }, ref) {
    const messages = useDSMessages();
    return (<div ref={ref} {...rest} className={cx('dt-logrow', className)} style={style}>
      {entries.map((entry, index) => {
            const level = entry.level in LEVEL_ICON ? entry.level : 'info';
            const levelLabel = messages.logRow.level[level];
            return (<div key={index} className="dt-logrow-row">
            <span className="dt-logrow-time">{entry.time}</span>
            <span className={`dt-logrow-dot dt-logrow-dot-${level}`} aria-hidden="true"/>
            <span className="dt-logrow-msg">
              <span className={`dt-logrow-level dt-logrow-level-${level}`}>
                <Icon icon={LEVEL_ICON[level]}/>
                {levelLabel}
              </span>
              <span className="dt-logrow-tool">{entry.tool}</span>
              {entry.message ? (<span className="dt-logrow-note">
                  {'  '}
                  {entry.href ? <a href={entry.href}>{entry.message}</a> : entry.message}
                </span>) : null}
            </span>
            <span className={cx('dt-logrow-end', !entry.latency && `dt-logrow-end-${level}`)}>
              {entry.latency || levelLabel}
            </span>
          </div>);
        })}
    </div>);
});
LogRow.displayName = 'LogRow';
