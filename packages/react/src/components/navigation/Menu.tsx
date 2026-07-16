import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

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

export function Menu({ trigger, items = [], align = 'left', width = 200, className, style, ...rest }: MenuProps) {
  return (
    <BaseMenu.Root modal={false}>
      <span {...rest} className={cx('dt-menu-root', className)} style={{ position: 'relative', display: 'inline-flex', ...style }}>
        <BaseMenu.Trigger
          className="dt-menu-trigger"
          style={{ display: 'inline-flex', cursor: 'pointer', border: 'none', background: 'transparent', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' }}
        >
          {trigger}
        </BaseMenu.Trigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={6} align={align === 'left' ? 'start' : 'end'}>
            <BaseMenu.Popup className="dt-menu-popup" style={{
              zIndex: 'var(--dt-z-index-popover)', width, padding: 5, background: 'var(--dt-surface)', borderRadius: 'var(--dt-radius-md)',
              boxShadow: 'var(--dt-shadow-lg)',
            }}>
              {items.map((it, i) => it.divider
                ? <BaseMenu.Separator key={`d${i}`} className="dt-menu-separator" style={{ height: 1, background: 'var(--dt-border)', margin: '5px 0' }} />
                : (
                  <BaseMenu.Item
                    key={i}
                    className="dt-menu-item"
                    onClick={it.onClick}
                    data-danger={it.danger ? '' : undefined}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 9, width: '100%', textAlign: 'left',
                      padding: '8px 10px', border: 'none', borderRadius: 'var(--dt-radius-sm)', cursor: 'pointer',
                      background: 'transparent', fontSize: 13.5, fontWeight: 500, fontFamily: 'inherit',
                      color: it.danger ? 'var(--dt-danger)' : 'var(--dt-ink)',
                    }}
                  >
                    {it.icon ? <span className="dt-menu-item-icon" style={{ display: 'inline-flex', color: it.danger ? 'var(--dt-danger)' : 'var(--dt-muted-strong)' }}>{it.icon}</span> : null}
                    {it.label}
                  </BaseMenu.Item>
                ))}
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </span>
    </BaseMenu.Root>
  );
}
