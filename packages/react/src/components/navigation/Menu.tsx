import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export interface MenuItem {
  label?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  danger?: boolean;
  divider?: boolean;
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  trigger: ReactNode;
  items?: MenuItem[];
  align?: 'left' | 'right';
  width?: number;
  style?: CSSProperties;
}

export function Menu({ trigger, items = [], align = 'left', width = 200, style, ...rest }: MenuProps) {
  return (
    <BaseMenu.Root modal={false}>
      <span {...rest} style={{ position: 'relative', display: 'inline-flex', ...style }}>
        <BaseMenu.Trigger
          style={{ display: 'inline-flex', cursor: 'pointer', border: 'none', background: 'transparent', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' }}
        >
          {trigger}
        </BaseMenu.Trigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={6} align={align === 'left' ? 'start' : 'end'}>
            <BaseMenu.Popup style={{
              zIndex: 80, width, padding: 5, background: 'var(--dt-surface)', borderRadius: 'var(--dt-radius-md)',
              boxShadow: 'var(--dt-shadow-lg)', animation: 'dt-menu 130ms var(--dt-ease)',
            }}>
              {items.map((it, i) => it.divider
                ? <BaseMenu.Separator key={`d${i}`} style={{ height: 1, background: 'var(--dt-border)', margin: '5px 0' }} />
                : (
                  <BaseMenu.Item
                    key={i}
                    onClick={it.onClick}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 9, width: '100%', textAlign: 'left',
                      padding: '8px 10px', border: 'none', borderRadius: 'var(--dt-radius-sm)', cursor: 'pointer',
                      background: 'transparent', fontSize: 13.5, fontWeight: 500, fontFamily: 'inherit',
                      color: it.danger ? 'var(--dt-danger)' : 'var(--dt-ink)',
                    }}
                  >
                    {it.icon ? <span style={{ display: 'inline-flex', color: it.danger ? 'var(--dt-danger)' : 'var(--dt-muted-strong)' }}>{it.icon}</span> : null}
                    {it.label}
                  </BaseMenu.Item>
                ))}
              <style>{`@keyframes dt-menu{from{opacity:0;transform:translateY(-4px)}}[role="menuitem"][data-highlighted]{background:var(--dt-surface-sunken)!important}[role="menuitem"][data-highlighted][data-danger]{background:var(--dt-tint-danger)!important}`}</style>
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </span>
    </BaseMenu.Root>
  );
}
