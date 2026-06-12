import { describe, expect, it } from 'vitest';

import {
  Badge,
  Button,
  Card,
  CardTone,
  FilterChip,
  Input,
  MetricAccent,
  Panel,
  StatusPill,
  SurfaceTone,
  Tabs,
  cx,
  metricAccentColor,
} from './index';

describe('core exports', () => {
  it('exports all core components as functions', () => {
    expect(Badge).toBeTypeOf('function');
    expect(Button).toBeTypeOf('function');
    expect(Card).toBeTypeOf('function');
    expect(Panel).toBeTypeOf('function');
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

  it('exports enum-like surface contracts used by apps', () => {
    expect(Card({ tone: CardTone.Raised, children: '상태' }).props.style.background).toBe('var(--dt-surface-raised)');
    expect(Panel({ tone: SurfaceTone.Raised, children: '패널' }).props.className).toContain('bg-[var(--dt-surface-raised)]');
    expect(metricAccentColor(MetricAccent.Success)).toBe('text-[var(--dt-success)]');
    expect(cx('a', false, 'b')).toBe('a b');
  });
});
