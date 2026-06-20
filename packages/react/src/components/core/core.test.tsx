import type { ReactElement } from 'react';
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

function reactElementSymbol(element: ReactElement): symbol | undefined {
  const descriptor = Object.getOwnPropertyDescriptor(element, '$$typeof');
  const value: unknown = descriptor?.value;
  return typeof value === 'symbol' ? value : undefined;
}

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

  it('emits React 18 element symbols for peer compatibility', () => {
    expect(reactElementSymbol(Card({ children: 'x' }))).toBe(Symbol.for('react.element'));
    expect(reactElementSymbol(Badge({ children: 'x' }))).toBe(Symbol.for('react.element'));
  });

  it('exports enum-like surface contracts used by apps', () => {
    expect(Card({ tone: CardTone.Raised, children: '상태' }).props.style.background).toBe('var(--dt-surface-raised)');
    expect(Panel({ tone: SurfaceTone.Raised, children: '패널' }).props.className).toContain('bg-[var(--dt-surface-raised)]');
    expect(metricAccentColor(MetricAccent.Success)).toBe('text-[var(--dt-success)]');
    expect(cx('a', false, 'b')).toBe('a b');
  });

  it('maps every Card tone to its surface token (contract apps depend on)', () => {
    expect(Card({ tone: CardTone.Default, children: 'x' }).props.style.background).toBe('var(--dt-surface)');
    expect(Card({ tone: CardTone.Muted, children: 'x' }).props.style.background).toBe('var(--dt-surface-sunken)');
    expect(Card({ tone: CardTone.Raised, children: 'x' }).props.style.background).toBe('var(--dt-surface-raised)');
    expect(Card({ tone: CardTone.Panel, children: 'x' }).props.style.background).toBe('var(--dt-surface)');
    expect(Card({ variant: CardTone.Muted, children: 'x' }).props.style.background).toBe('var(--dt-surface-sunken)');
    expect(Card({ children: 'x' }).props.style.background).toBe('var(--dt-surface)');
  });

  it('honors Card padding default and interactive flag', () => {
    expect(Card({ children: 'x' }).props.style.padding).toBe(20);
    expect(Card({ padding: 8, children: 'x' }).props.style.padding).toBe(8);
    expect(Card({ interactive: true, children: 'x' }).props.className).toContain('dt-card-interactive');
    expect(Card({ children: 'x' }).props.className ?? '').not.toContain('dt-card-interactive');
  });

  it('maps every Badge tone to its status class (status-only, never decorative)', () => {
    expect(Badge({ children: 'x' }).props.className).toBe('badge');
    expect(Badge({ tone: 'accent', children: 'x' }).props.className).toBe('badge badge-accent');
    expect(Badge({ tone: 'info', children: 'x' }).props.className).toBe('badge badge-info');
    expect(Badge({ tone: 'success', children: 'x' }).props.className).toBe('badge badge-success');
    expect(Badge({ tone: 'warning', children: 'x' }).props.className).toBe('badge badge-warning');
    expect(Badge({ tone: 'danger', children: 'x' }).props.className).toBe('badge badge-danger');
  });

  it('Button forwards variant/size without dropping the native button type', () => {
    const el = Button({ variant: 'secondary', size: 'lg', children: '연결' });
    expect(el.type).toBe('button');
    expect(el.props.type).toBe('button');
  });
});
