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

