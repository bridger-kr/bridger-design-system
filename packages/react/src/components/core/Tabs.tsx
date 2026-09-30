import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number | string;
}

export interface TabsProps {
  tabs?: TabItem[];
  variant?: 'underline' | 'pill';
  /** Controlled active tab id. */
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  style?: CSSProperties;
}

/**
 * Underline-style tab bar for switching console views. Controlled via
 * `value` + `onChange`, or uncontrolled with `defaultValue`.
 */
export function Tabs({ tabs = [], variant = 'underline', value, defaultValue, onChange, style }: TabsProps) {
  const handleValueChange = (nextValue: string) => {
    onChange?.(nextValue);
  };

  return (
    <BaseTabs.Root
      value={value}
      defaultValue={defaultValue ?? tabs[0]?.id}
      onValueChange={handleValueChange}
    >
      <BaseTabs.List
        className={cx('dt-tabs-list', variant === 'pill' ? 'dt-tabs-list-pill' : 'dt-tabs-list-underline')}
        style={style}
      >
        {tabs.map((tab) => (
          <BaseTabs.Tab
            key={tab.id}
            value={tab.id}
            className={cx('dt-tabs-tab', variant === 'pill' ? 'dt-tabs-tab-pill' : 'dt-tabs-tab-underline')}
          >
            {tab.icon ? <span aria-hidden="true" style={{ display: 'inline-flex' }}>{tab.icon}</span> : null}
            {tab.label}
            {tab.count != null ? (
              <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 'var(--dt-caption-size)', color: 'var(--dt-muted)' }}>
                {tab.count}
              </span>
            ) : null}
            </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
    </BaseTabs.Root>
  );
}
