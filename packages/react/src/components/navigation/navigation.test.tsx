// @vitest-environment jsdom
import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Breadcrumb,
  CommandPalette,
  ConsoleShell,
  ConsolePageHeader,
  Menu,
  Sidebar,
  Stepper,
} from './index';

describe('navigation exports', () => {
  it('exports all navigation components as forwardRef objects', () => {
    for (const component of [Breadcrumb, CommandPalette, ConsolePageHeader, ConsoleShell, Menu, Sidebar, Stepper]) {
      expect(component).toBeDefined();
      expect((component as { $$typeof?: symbol }).$$typeof).toBe(Symbol.for('react.forward_ref'));
    }
  });
});

describe('Breadcrumb semantics', () => {
  it('uses nav > ol > li structure with aria labels', () => {
    const { container } = render(<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Docs' }, { label: 'Current' }]} />);

    const nav = container.querySelector('nav[aria-label="breadcrumb"]');
    expect(nav).not.toBeNull();

    const ol = nav?.querySelector(':scope > ol');
    expect(ol).not.toBeNull();

    const items = nav?.querySelectorAll('ol > li');
    expect(items?.length).toBe(3);
  });

  it('marks only the last item as current and keeps non-current links', () => {
    const { container } = render(
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Current' }]}
      />,
    );

    const links = container.querySelectorAll('ol > li > a');
    expect(links.length).toBe(2);
    expect(links[0]?.getAttribute('href')).toBe('/');
    expect(links[1]?.getAttribute('href')).toBe('/docs');

    const current = container.querySelector('ol > li [aria-current="page"]');
    expect(current).not.toBeNull();
    expect(current?.textContent).toBe('Current');

    const ariaCurrentCount = container.querySelectorAll('[aria-current="page"]');
    expect(ariaCurrentCount.length).toBe(1);
  });
});


describe('ConsoleShell contract', () => {
  const nav = [{ heading: 'Console', items: [{ label: 'Home', href: '/' }, { label: 'Tools', href: '/tools' }] }];

  it('renders landmarks, product name, and a skip link targeting main', () => {
    const { container } = render(
      <ConsoleShell productName="Bridger" navigation={nav} mainId="main">
        <h1>Page</h1>
      </ConsoleShell>,
    );
    expect(container.querySelector('nav')).not.toBeNull();
    expect(container.querySelector('main#main')).not.toBeNull();
    const skip = container.querySelector('.dt-skip-link');
    expect(skip?.getAttribute('href')).toBe('#main');
    expect(container.textContent).toContain('Bridger');
  });

  it('marks the activeRoute item aria-current=page', () => {
    const { container } = render(
      <ConsoleShell productName="Bridger" navigation={nav} activeRoute="/tools">
        <h1>Tools</h1>
      </ConsoleShell>,
    );
    const current = container.querySelector('[aria-current="page"]');
    expect(current?.textContent).toContain('Tools');
  });

  it('stacks banners critical first regardless of input order', () => {
    const { container } = render(
      <ConsoleShell
        productName="Bridger"
        banners={[
          { tone: 'info', content: 'info banner' },
          { tone: 'critical', content: 'critical banner' },
        ]}
      >
        <h1>Page</h1>
      </ConsoleShell>,
    );
    const banners = container.querySelectorAll('.dt-console-shell-banner');
    expect(banners[0]?.textContent).toContain('critical banner');
    expect(banners[0]?.getAttribute('role')).toBe('alert');
    expect(banners[1]?.getAttribute('role')).toBe('status');
  });

  it('renders localized workspace status and keeps context on error', () => {
    const { container } = render(
      <ConsoleShell productName="Bridger" workspaceSwitcher={<span>ws</span>} workspaceStatus="error">
        <h1>Page</h1>
      </ConsoleShell>,
    );
    const ws = container.querySelector('.dt-console-shell-workspace');
    expect(ws?.getAttribute('data-status')).toBe('error');
    expect(ws?.textContent).toContain('유지합니다');
  });

  it('collapse toggle flips the rail into the collapsed state', () => {
    const { container } = render(
      <ConsoleShell productName="Bridger" navigation={nav} collapsible>
        <h1>Page</h1>
      </ConsoleShell>,
    );
    const toggle = container.querySelector('.dt-console-shell-rail-toggle') as HTMLElement;
    expect(toggle).not.toBeNull();
    fireEvent.click(toggle);
    expect(container.querySelector('.dt-console-shell-collapsed')).not.toBeNull();
    expect(container.querySelector('.dt-sidebar-collapsed')).not.toBeNull();
    expect(container.querySelector('.dt-sidebar-item')?.getAttribute('title')).toBe('Home');
  });

  it('routePending dims the main region', () => {
    const { container } = render(
      <ConsoleShell productName="Bridger" routePending>
        <h1>Page</h1>
      </ConsoleShell>,
    );
    expect(container.querySelector('main[data-route-pending]')).not.toBeNull();
  });
});
