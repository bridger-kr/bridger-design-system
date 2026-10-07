// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/UsageMeter.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { useDSLocale } from '../locale/DSLocaleProvider.jsx';
/**
 * Quota / usage bar — hairline track, persimmon fill escalating to warning/danger.
 * @startingPoint section="Data" subtitle="Quota usage with tabular readout" viewport="420x80"
 */
export const UsageMeter = forwardRef(function UsageMeter({ label, value = 0, max = 100, unit = '', hint, className, style, ...rest }, ref) {
    const locale = useDSLocale();
    const numberFmt = new Intl.NumberFormat(locale === 'ko' ? 'ko-KR' : 'en-US');
    const pct = Math.min(100, Math.max(0, (value / max) * 100));
    const level = pct >= 90 ? 'danger' : pct >= 75 ? 'warning' : 'accent';
    return (<div ref={ref} {...rest} className={cx('dt-usage-meter', className)} style={style}>
      <div className="dt-usage-meter-head">
        {label ? <span className="dt-usage-meter-label">{label}</span> : <span />}
        <span className="dt-usage-meter-value">
          <b>{numberFmt.format(value)}</b>
          <span className="dt-usage-meter-max"> / {numberFmt.format(max)}{unit}</span>
        </span>
      </div>
      <div className="dt-usage-meter-track">
        <div className={`dt-usage-meter-fill dt-usage-meter-fill-${level}`} style={{ '--dt-usage-pct': `${pct}%` }}/>
      </div>
      {hint ? <span className="dt-usage-meter-hint">{hint}</span> : null}
    </div>);
});
UsageMeter.displayName = 'UsageMeter';
