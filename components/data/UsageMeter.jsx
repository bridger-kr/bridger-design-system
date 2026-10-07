// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/UsageMeter.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { useDSLocale, useDSMessages } from '../locale/DSLocaleProvider.jsx';
import { DataTrustMeta, rendersValue } from './DataTrust.jsx';
/**
 * Quota / usage bar — hairline track, persimmon fill escalating to warning/danger.
 * `role="meter"` with an accessible value text; unknown values render `—`, not 0.
 * @startingPoint section="Data" subtitle="Quota usage with tabular readout" viewport="420x80"
 */
export const UsageMeter = forwardRef(function UsageMeter({ label, value, max = 100, unit = '', limitSource, hint, state, asOf, source, refresh, reason, className, style, ...rest }, ref) {
    const locale = useDSLocale();
    const messages = useDSMessages();
    const numberFmt = new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US');
    const known = typeof value === 'number' && Number.isFinite(value);
    const pct = known ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
    const level = pct >= 90 ? 'danger' : pct >= 75 ? 'warning' : 'accent';
    const hasMeta = Boolean(state || asOf || source || refresh || reason || limitSource);
    return (<div ref={ref} {...rest} className={cx('dt-usage-meter', className)} style={style}>
      <div className="dt-usage-meter-head">
        {label ? <span className="dt-usage-meter-label">{label}</span> : <span />}
        <span className="dt-usage-meter-value">
          {rendersValue(state) && known ? (<b>{numberFmt.format(value)}</b>) : (<b className="dt-usage-meter-unknown">{messages.dataTrust.unknown}</b>)}
          <span className="dt-usage-meter-max"> / {numberFmt.format(max)}{unit}</span>
        </span>
      </div>
      <div className="dt-usage-meter-track" role="meter" aria-valuemin={0} aria-valuemax={max} aria-valuenow={known ? value : undefined} aria-valuetext={known ? `${numberFmt.format(value)} / ${numberFmt.format(max)}${unit}` : messages.dataTrust.unknown} aria-label={typeof label === 'string' ? label : undefined}>
        <div className={`dt-usage-meter-fill dt-usage-meter-fill-${known ? level : 'unknown'}`} style={{ '--dt-usage-pct': `${pct}%` }}/>
      </div>
      {hint ? <span className="dt-usage-meter-hint">{hint}</span> : null}
      {hasMeta ? (<DataTrustMeta state={state} asOf={asOf} source={source ?? limitSource} refresh={refresh} reason={reason}/>) : null}
    </div>);
});
UsageMeter.displayName = 'UsageMeter';
