// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/Stepper.tsx
// Regenerate: pnpm generate

import { Check } from 'lucide-react';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
/**
 * Multi-step progress — done (check) / current (persimmon) / upcoming (muted).
 * @startingPoint section="Navigation" subtitle="Onboarding step progress" viewport="560x120"
 */
export const Stepper = forwardRef(function Stepper({ steps = [], current = 0, orientation = 'horizontal', className, style, ...rest }, ref) {
    const vertical = orientation === 'vertical';
    return (<div ref={ref} {...rest} className={cx('dt-stepper', className)} data-orientation={vertical ? 'vertical' : 'horizontal'} style={style}>
      {steps.map((s, i) => {
            const done = i < current, active = i === current;
            const state = done ? 'done' : active ? 'active' : 'todo';
            return (<div key={i} className="dt-step" data-orientation={vertical ? 'vertical' : 'horizontal'}>
            <div className="dt-step-marker-row">
              <span className="dt-step-marker" data-state={state}>
                {done ? <Icon icon={Check} size="sm"/> : i + 1}
              </span>
              {i < steps.length - 1 ? (<span className="dt-step-connector" data-done={done ? '' : undefined}/>) : null}
            </div>
            <div className="dt-step-label-block">
              <div className="dt-step-label" data-accent={done || active ? '' : undefined}>{s.label}</div>
              {s.description ? <div className="dt-step-desc">{s.description}</div> : null}
            </div>
          </div>);
        })}
    </div>);
});
Stepper.displayName = 'Stepper';
