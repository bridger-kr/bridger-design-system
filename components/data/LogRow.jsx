// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/LogRow.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
const LEVEL_LABEL = {
    ok: 'OK', warn: 'WARN', error: 'ERR', info: 'INFO',
};
/**
 * Dense tabular execution-log stream — hairline rows, status dots, mono columns.
 * @startingPoint section="Data" subtitle="Execution-log stream" viewport="560x200"
 */
export const LogRow = forwardRef(function LogRow({ entries = [], className, style, ...rest }, ref) {
    return (<div ref={ref} {...rest} className={cx('dt-logrow', className)} style={style}>
      {entries.map((entry, index) => {
            const level = entry.level in LEVEL_LABEL ? entry.level : 'info';
            return (<div key={index} className="dt-logrow-row">
            <span className="dt-logrow-time">{entry.time}</span>
            <span className={`dt-logrow-dot dt-logrow-dot-${level}`}/>
            <span className="dt-logrow-msg">
              <span className="dt-logrow-tool">{entry.tool}</span>
              {entry.message ? <span className="dt-logrow-note">{'  '}{entry.message}</span> : null}
            </span>
            <span className={cx('dt-logrow-end', !entry.latency && `dt-logrow-end-${level}`)}>
              {entry.latency || LEVEL_LABEL[level]}
            </span>
          </div>);
        })}
    </div>);
});
LogRow.displayName = 'LogRow';
