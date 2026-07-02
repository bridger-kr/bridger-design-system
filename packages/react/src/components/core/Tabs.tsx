import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import type { CSSProperties, ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number | string;
}

export interface TabsProps {
  tabs?: TabItem[];
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
export function Tabs({ tabs = [], value, defaultValue, onChange, style }: TabsProps) {
  return (
    <BaseTabs.Root
      value={value}
      defaultValue={defaultValue ?? tabs[0]?.id}
      onValueChange={(nextValue) => { if (typeof nextValue === 'string') onChange?.(nextValue); }}
    >
      <BaseTabs.List
        style={{
          display: 'flex',
          gap: 4,
          borderBottom: '1px solid var(--dt-border)',
          ...style,
        }}
      >
        {tabs.map((tab) => (
          <BaseTabs.Tab
            key={tab.id}
            value={tab.id}
            style={{
              position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 7, background: 'transparent',
              border: 'none', cursor: 'pointer', padding: '10px 12px', marginBottom: -1, fontSize: 13, fontWeight: 600,
              color: 'var(--dt-muted)', borderBottom: '2px solid transparent', transition: 'color var(--dt-motion-fast)',
            }}
          >
            {tab.icon ? <span aria-hidden="true" style={{ display: 'inline-flex' }}>{tab.icon}</span> : null}
            {tab.label}
            {tab.count != null ? (
              <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)' }}>
                {tab.count}
              </span>
            ) : null}
          </BaseTabs.Tab>
        ))}
        <style>{`[role="tab"][aria-selected="true"]{color:var(--dt-ink-strong)!important;border-bottom-color:var(--dt-accent)!important}`}</style>
      </BaseTabs.List>
    </BaseTabs.Root>
  );
}
