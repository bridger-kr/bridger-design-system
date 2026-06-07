import { describe, expect, it } from 'vitest';

import {
  Alert,
  Dialog,
  Drawer,
  Toast,
  Tooltip,
} from './index';

describe('feedback component exports', () => {
  it('exports all feedback components', () => {
    expect(Alert).toBeDefined();
    expect(Dialog).toBeDefined();
    expect(Drawer).toBeDefined();
    expect(Toast).toBeDefined();
    expect(Tooltip).toBeDefined();
  });
});
