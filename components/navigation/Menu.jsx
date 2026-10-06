// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/Menu.tsx
// Regenerate: pnpm generate

import { Menu as BaseMenu } from '@base-ui-components/react/menu';
import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
export const Menu = forwardRef(function Menu({ trigger, items = [], align = 'left', width = 200, className, style, ...rest }, ref) {
    return (<BaseMenu.Root modal={false}>
      <span ref={ref} {...rest} className={cx('dt-menu-root', className)} style={{ position: 'relative', display: 'inline-flex', ...style }}>
        <BaseMenu.Trigger className="dt-menu-trigger" style={{ display: 'inline-flex', cursor: 'pointer', border: 'none', background: 'transparent', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' }}>
          {trigger}
        </BaseMenu.Trigger>
        <BaseMenu.Portal>
          <BaseMenu.Positioner sideOffset={6} align={align === 'left' ? 'start' : 'end'}>
            <BaseMenu.Popup className="dt-menu-popup" style={{
            zIndex: 'var(--dt-z-index-popover)', width, padding: 5, background: 'var(--dt-surface)', borderRadius: 'var(--dt-radius-card)',
            boxShadow: 'var(--dt-shadow-overlay)',
        }}>
              {items.map((it, i) => it.divider
            ? <BaseMenu.Separator key={`d${i}`} className="dt-menu-separator" style={{ height: 1, background: 'var(--dt-border)', margin: '5px 0' }}/>
            : (<BaseMenu.Item key={i} className="dt-menu-item" onClick={it.onClick} data-danger={it.danger ? '' : undefined}>
                    {it.icon ? <span className="dt-menu-item-icon">{it.icon}</span> : null}
                    {it.label}
                  </BaseMenu.Item>))}
            </BaseMenu.Popup>
          </BaseMenu.Positioner>
        </BaseMenu.Portal>
      </span>
    </BaseMenu.Root>);
});
Menu.displayName = 'Menu';
