// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Breadcrumb,
  CommandPalette,
  Menu,
  Sidebar,
  Stepper,
} from './index';

describe('navigation exports', () => {
  it('exports all navigation components as functions', () => {
    expect(Breadcrumb).toBeTypeOf('function');
    expect(CommandPalette).toBeTypeOf('function');
    expect(Menu).toBeTypeOf('function');
    expect(Sidebar).toBeTypeOf('function');
    expect(Stepper).toBeTypeOf('function');
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

