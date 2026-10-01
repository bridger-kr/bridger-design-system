// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Breadcrumb,
  CommandPalette,
  ConsolePageHeader,
  Menu,
  Sidebar,
  Stepper,
} from './index';

describe('navigation exports', () => {
  it('exports all navigation components as functions', () => {
    expect(Breadcrumb).toBeTypeOf('function');
    expect(CommandPalette).toBeTypeOf('function');
    expect(ConsolePageHeader).toBeTypeOf('function');
    expect(Menu).toBeTypeOf('function');
    expect(Sidebar).toBeTypeOf('function');
    expect(Stepper).toBeTypeOf('function');
  });
});

describe('ConsolePageHeader semantics', () => {
  it('renders a single h1 with optional description and actions', () => {
    const { container } = render(
      <ConsolePageHeader
        title="Usage"
        description="Calls and quota for this key"
        actions={<button type="button">Refresh</button>}
      />,
    );

    const headings = container.querySelectorAll('h1');
    expect(headings.length).toBe(1);
    expect(headings[0]?.textContent).toBe('Usage');
    expect(container.textContent).toContain('Calls and quota for this key');
    expect(container.querySelector('button')?.textContent).toBe('Refresh');
  });
});

describe('Sidebar semantics', () => {
  it('marks the active item and reports navigation through onNavigate', () => {
    let navigated: string | null = null;
    const { container } = render(
      <Sidebar
        sections={[{
          heading: 'Find',
          items: [
            { label: 'Home', href: '/', active: true },
            { label: 'Public data', href: '/government-apis' },
          ],
        }]}
        onNavigate={(event, item) => {
          event.preventDefault();
          navigated = item.href ?? null;
        }}
      />,
    );

    const active = container.querySelector('[aria-current="page"]');
    expect(active?.textContent).toContain('Home');

    const link = Array.from(container.querySelectorAll('a')).find((el) => el.getAttribute('href') === '/government-apis');
    link?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(navigated).toBe('/government-apis');
  });

  it('opens external items in a new tab with noreferrer semantics', () => {
    const { container } = render(
      <Sidebar sections={[{ items: [{ label: 'Admin console', href: 'https://admin.bridger.kr', external: true }] }]} />,
    );

    const link = container.querySelector('a');
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toContain('noreferrer');
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

