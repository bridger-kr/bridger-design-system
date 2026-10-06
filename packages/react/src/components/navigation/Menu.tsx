import { Menu as BaseMenu } from '@base-ui/react/menu';
import { forwardRef } from 'react';
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

export const Menu = forwardRef<HTMLSpanElement, MenuProps>(function Menu(
  { trigger, items = [], align = 'left', width = 200, className, style, ...rest },
  ref,
) {
  return (
    <BaseMenu.Root modal={false}>
      <span ref={ref} {...rest} className={cx('dt-menu-root', className)} style={{ position: 'relative', display: 'inline-flex', ...style }}>
        <BaseMenu.Trigger
          className="dt-menu-trigger"
          style={{ display: 'inline-flex', cursor: 'pointer', border: 'none', background: 'transparent', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' }}
        >
          {trigger}
        </BaseMenu.Trigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={6} align={align === 'left' ? 'start' : 'end'}>
            <BaseMenu.Popup className="dt-menu-popup" style={{
              zIndex: 'var(--dt-z-index-popover)', width, padding: 5, background: 'var(--dt-surface)', borderRadius: 'var(--dt-radius-card)',
              boxShadow: 'var(--dt-shadow-overlay)',
            }}>
              {items.map((it, i) => it.divider
                ? <BaseMenu.Separator key={`d${i}`} className="dt-menu-separator" style={{ height: 1, background: 'var(--dt-border)', margin: '5px 0' }} />
                : (
                  <BaseMenu.Item
                    key={i}
                    className="dt-menu-item"
                    onClick={it.onClick}
                    data-danger={it.danger ? '' : undefined}
                  >
                    {it.icon ? <span className="dt-menu-item-icon">{it.icon}</span> : null}
                    {it.label}
                  </BaseMenu.Item>
                ))}
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </span>
    </BaseMenu.Root>
  );
});
Menu.displayName = 'Menu';
