import { useState } from 'react';
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
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id);
  const active = value !== undefined ? value : internal;

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        gap: 4,
        borderBottom: '1px solid var(--dt-border)',
        ...style,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => select(tab.id)}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 12px',
              marginBottom: -1,
              fontSize: 13,
              fontWeight: 600,
              color: isActive ? 'var(--dt-ink-strong)' : 'var(--dt-muted)',
              borderBottom: `2px solid ${isActive ? 'var(--dt-accent)' : 'transparent'}`,
              transition: 'color var(--dt-motion-fast)',
            }}
          >
            {tab.icon ? <span aria-hidden="true" style={{ display: 'inline-flex' }}>{tab.icon}</span> : null}
            {tab.label}
            {tab.count != null ? (
              <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-muted)' }}>
                {tab.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
