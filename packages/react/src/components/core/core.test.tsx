import { describe, expect, it } from 'vitest';

import {
  Badge,
  Button,
  Card,
  FilterChip,
  Input,
  StatusPill,
  Tabs,
} from './index';

describe('core exports', () => {
  it('exports all core components as functions', () => {
    expect(Badge).toBeTypeOf('function');
    expect(Button).toBeTypeOf('function');
    expect(Card).toBeTypeOf('function');
    expect(FilterChip).toBeTypeOf('function');
    expect(Input).toBeTypeOf('function');
    expect(StatusPill).toBeTypeOf('function');
    expect(Tabs).toBeTypeOf('function');
  });

  it('creates a valid Button React element with minimal props', () => {
    expect(Button({ children: '저장' })).toMatchObject({
      type: 'button',
      props: expect.objectContaining({ type: 'button' }),
    });
  });
});
