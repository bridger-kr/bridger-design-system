// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/navigation/ConsoleShell.tsx
// Regenerate: pnpm generate

import { Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
import { Drawer } from '../feedback/Drawer.jsx';
import { Sidebar } from './Sidebar.jsx';
const BANNER_ORDER = {
    critical: 0,
    warning: 1,
    info: 2,
};
function useIsMobile(breakpoint) {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (typeof window.matchMedia !== 'function')
            return;
        const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
        const update = () => setIsMobile(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, [breakpoint]);
    return isMobile;
}
/**
 * Console application frame — navigation rail (or modal drawer on narrow
 * screens), topbar slots, status banners, skip link, and the content region.
 * Route consumers only supply slots; the shell owns focus order, drawer
 * dismissal on route select, and landmark semantics.
 * @startingPoint section="Navigation" subtitle="Console app shell" viewport="960x540"
 */
export const ConsoleShell = forwardRef(function ConsoleShell({ productName, logo, navigation = [], activeRoute, accountMenu, workspaceSwitcher, workspaceStatus = 'idle', workspaceNotice, globalActions, help, banners = [], mobileBreakpoint = 768, onNavigate, collapsed, defaultCollapsed = false, onCollapsedChange, collapsible = true, mainId, navLabel, routePending = false, className, children, ...rest }, ref) {
    const messages = useDSMessages();
    const generatedMainId = useId();
    const resolvedMainId = mainId ?? `dt-main-${generatedMainId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const isMobile = useIsMobile(mobileBreakpoint);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
    const isCollapsed = collapsed ?? internalCollapsed;
    const mainRef = useRef(null);
    const triggerRef = useRef(null);
    const previousRoute = useRef(activeRoute);
    const setCollapsed = (next) => {
        if (collapsed === undefined)
            setInternalCollapsed(next);
        onCollapsedChange?.(next);
    };
    const sections = navigation.map((section) => ({
        ...section,
        items: section.items.map((item) => ({
            ...item,
            active: item.active ?? (activeRoute !== undefined && item.href === activeRoute),
        })),
    }));
    const brand = logo || productName ? (<span className="dt-console-shell-brand">
      {logo}
      {productName ? <span className="dt-console-shell-product">{productName}</span> : null}
    </span>) : undefined;
    const sidebar = (<Sidebar brand={brand} sections={sections} collapsed={!isMobile && isCollapsed} aria-label={navLabel ?? messages.consoleShell.navLabel} onNavigate={(event, item) => {
            onNavigate?.(event, item);
            if (!event.defaultPrevented && !item.external)
                setDrawerOpen(false);
        }}/>);
    // Route transitions move focus to the main heading (h1, else the main
    // landmark) — the history/scroll restore itself stays with the app router.
    useEffect(() => {
        if (previousRoute.current === activeRoute)
            return;
        previousRoute.current = activeRoute;
        const main = mainRef.current;
        if (!main)
            return;
        const heading = main.querySelector('h1');
        const target = (heading ?? main);
        if (target.tabIndex < 0)
            target.tabIndex = -1;
        target.focus({ preventScroll: false });
    }, [activeRoute]);
    const orderedBanners = [...banners].sort((a, b) => BANNER_ORDER[a.tone ?? 'info'] - BANNER_ORDER[b.tone ?? 'info']);
    const showTopbar = isMobile ||
        workspaceSwitcher ||
        workspaceStatus !== 'idle' ||
        workspaceNotice ||
        globalActions ||
        help ||
        accountMenu;
    return (<div ref={ref} className={cx('dt-console-shell', !isMobile && isCollapsed && 'dt-console-shell-collapsed', className)} {...rest}>
      <a href={`#${resolvedMainId}`} className="dt-skip-link">
        {messages.consoleShell.skipToContent}
      </a>

      {!isMobile ? (<div className="dt-console-shell-rail">
          {sidebar}
          {collapsible ? (<button type="button" className="dt-console-shell-rail-toggle" aria-expanded={!isCollapsed} aria-label={isCollapsed ? messages.consoleShell.expandNav : messages.consoleShell.collapseNav} onClick={() => setCollapsed(!isCollapsed)}>
              <Icon icon={isCollapsed ? PanelLeftOpen : PanelLeftClose}/>
            </button>) : null}
        </div>) : null}

      <div className="dt-console-shell-column">
        {orderedBanners.length > 0 ? (<div className="dt-console-shell-banners">
            {orderedBanners.map((banner, index) => (<div key={index} className={cx('dt-console-shell-banner', banner.tone && `dt-console-shell-banner-${banner.tone}`)} role={banner.tone === 'critical' ? 'alert' : 'status'}>
                {banner.content}
              </div>))}
          </div>) : null}

        {showTopbar ? (<header className="dt-console-shell-topbar">
            {isMobile ? (<button ref={triggerRef} type="button" className="dt-console-shell-trigger" aria-label={messages.consoleShell.openNav} aria-haspopup="dialog" onClick={() => setDrawerOpen(true)}>
                <Icon icon={Menu}/>
              </button>) : null}
            {workspaceSwitcher || workspaceStatus !== 'idle' || workspaceNotice ? (<div className="dt-console-shell-workspace" data-status={workspaceStatus}>
                {workspaceSwitcher}
                {workspaceStatus !== 'idle' ? (<span className="dt-console-shell-workspace-status" role="status">
                    {messages.consoleShell.workspace[workspaceStatus]}
                  </span>) : null}
                {workspaceNotice}
              </div>) : null}
            <div className="dt-console-shell-topbar-end">
              {globalActions}
              {help}
              {accountMenu}
            </div>
          </header>) : null}

        <main ref={mainRef} id={resolvedMainId} tabIndex={-1} className="dt-console-shell-main" data-route-pending={routePending || undefined}>
          {children}
        </main>
      </div>

      {isMobile && drawerOpen ? (<div className="dt-console-shell-drawer-layer">
          <Drawer open side="left" title={productName} width={280} onOpenChange={(open) => {
                setDrawerOpen(open);
                if (!open)
                    triggerRef.current?.focus();
            }}>
            {sidebar}
          </Drawer>
        </div>) : null}
    </div>);
});
ConsoleShell.displayName = 'ConsoleShell';
