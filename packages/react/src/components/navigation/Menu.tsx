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
      <span ref={ref} {...rest} className={cx('dt-menu-root', className)} style={style}>
        <BaseMenu.Trigger className="dt-menu-trigger">
          {trigger}
        </BaseMenu.Trigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={6} align={align === 'left' ? 'start' : 'end'}>
            <BaseMenu.Popup
              className="dt-menu-popup"
              style={{ '--dt-menu-width': `${width}px` } as CSSProperties}
            >
              {items.map((it, i) => it.divider
                ? <BaseMenu.Separator key={`d${i}`} className="dt-menu-separator" />
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
