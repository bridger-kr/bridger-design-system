// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Tabs.tsx
// Regenerate: pnpm generate

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
import { warnOnce } from '../lib/deprecate.jsx';
/**
 * Underline-style tab bar for switching console views. Controlled via
 * `value` + `onValueChange`, or uncontrolled with `defaultValue`.
 */
export const Tabs = forwardRef(function Tabs({ tabs = [], variant = 'underline', value, defaultValue, onValueChange, onChange, className, style }, ref) {
    let resolvedVariant;
    if (variant === 'pill') {
        warnOnce('tabs-variant-pill', 'Tabs: variant="pill" is deprecated — use variant="segmented". Removed in v2.1.');
        resolvedVariant = 'segmented';
    }
    else {
        resolvedVariant = variant;
    }
    if (onChange !== undefined) {
        warnOnce('tabs-onchange', 'Tabs: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
    }
    const handleValueChange = (nextValue) => {
        onValueChange?.(nextValue);
        onChange?.(nextValue);
    };
    return (<BaseTabs.Root ref={ref} value={value} defaultValue={defaultValue ?? tabs[0]?.id} onValueChange={handleValueChange} className={className}>
      <BaseTabs.List activateOnFocus className={cx('dt-tabs-list', `dt-tabs-list-${resolvedVariant}`)} style={{
            display: 'flex',
            gap: 4,
            borderBottom: resolvedVariant === 'underline' ? '1px solid var(--dt-border)' : '0',
            ...style,
        }}>
        {tabs.map((tab) => (<BaseTabs.Tab key={tab.id} value={tab.id} className={cx('dt-tabs-tab', `dt-tabs-tab-${resolvedVariant}`)}>
            {tab.icon ? <span aria-hidden="true" style={{ display: 'inline-flex' }}>{tab.icon}</span> : null}
            {tab.label}
            {tab.count != null ? (<span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-text-muted)' }}>
                {tab.count}
              </span>) : null}
            </BaseTabs.Tab>))}
      </BaseTabs.List>
    </BaseTabs.Root>);
});
Tabs.displayName = 'Tabs';
