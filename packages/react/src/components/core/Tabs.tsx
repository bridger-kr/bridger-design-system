import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import { forwardRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../lib/cx';
import { warnOnce } from '../../lib/deprecate';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number | string;
}

export type TabsVariant = 'underline' | 'segmented';

export interface TabsProps {
  tabs?: TabItem[];
  /** `underline` or `segmented`. `pill` is deprecated and maps to `segmented`. */
  variant?: TabsVariant | 'pill';
  /** Controlled active tab id. */
  value?: string;
  defaultValue?: string;
  /** Called with the newly selected tab id. */
  onValueChange?: (id: string) => void;
  /** @deprecated Use `onValueChange`. Removed in v2.1. */
  onChange?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Underline-style tab bar for switching console views. Controlled via
 * `value` + `onValueChange`, or uncontrolled with `defaultValue`.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { tabs = [], variant = 'underline', value, defaultValue, onValueChange, onChange, className, style },
  ref,
) {
  let resolvedVariant: TabsVariant;
  if (variant === 'pill') {
    warnOnce('tabs-variant-pill', 'Tabs: variant="pill" is deprecated — use variant="segmented". Removed in v2.1.');
    resolvedVariant = 'segmented';
  } else {
    resolvedVariant = variant;
  }
  if (onChange !== undefined) {
    warnOnce('tabs-onchange', 'Tabs: `onChange` is deprecated — use `onValueChange`. Removed in v2.1.');
  }
  const handleValueChange = (nextValue: string) => {
    onValueChange?.(nextValue);
    onChange?.(nextValue);
  };

  return (
    <BaseTabs.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue ?? tabs[0]?.id}
      onValueChange={handleValueChange}
      className={className}
    >
      <BaseTabs.List
        activateOnFocus
        className={cx('dt-tabs-list', `dt-tabs-list-${resolvedVariant}`)}
        style={{
          display: 'flex',
          gap: 4,
          borderBottom: resolvedVariant === 'underline' ? '1px solid var(--dt-border)' : '0',
          ...style,
        }}
      >
        {tabs.map((tab) => (
          <BaseTabs.Tab
            key={tab.id}
            value={tab.id}
            className={cx('dt-tabs-tab', `dt-tabs-tab-${resolvedVariant}`)}
            style={{
              position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 7, background: 'transparent',
              border: 'none', cursor: 'pointer', padding: '10px 12px', marginBottom: -1, fontSize: 13, fontWeight: 600,
              color: 'var(--dt-text-muted)', borderBottom: '2px solid transparent', transition: 'color var(--dt-duration-fast) var(--dt-ease)',
            }}
          >
            {tab.icon ? <span aria-hidden="true" style={{ display: 'inline-flex' }}>{tab.icon}</span> : null}
            {tab.label}
            {tab.count != null ? (
              <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-text-muted)' }}>
                {tab.count}
              </span>
            ) : null}
            </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
    </BaseTabs.Root>
  );
});
Tabs.displayName = 'Tabs';
