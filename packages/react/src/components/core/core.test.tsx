// @vitest-environment jsdom
import type { ReactElement } from 'react';
import { Children, isValidElement } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import {
  Badge,
  Button,
  Card,
  CardButton,
  CardLink,
  CardTone,
  Chip,
  FilterChip,
  Input,
  MetricAccent,
  Panel,
  Section,
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
    expect(Chip).toBeTypeOf('function');
    expect(Panel).toBeTypeOf('function');
    expect(FilterChip).toBeTypeOf('function');
    expect(Input).toBeTypeOf('function');
    expect(Section).toBeTypeOf('function');
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

  it('keeps Card non-actionable and exposes native action variants', () => {
    const defaultCard = Card({ children: 'x' });
    const cardButton = CardButton({ children: '실행' });
    const cardLink = CardLink({ href: '/tools', children: '도구 열기' });

    expect(defaultCard.type).toBe('div');
    expect(defaultCard.props.style.padding).toBe(20);
    expect(defaultCard.props.style.border).toBe('1px solid var(--dt-border)');
    expect(defaultCard.props.style.boxShadow).toBe('none');
    expect(Card({ padding: 8, children: 'x' }).props.style.padding).toBe(8);
    expect(cardButton.type).toBe('button');
    expect(cardButton.props.type).toBe('button');
    expect(cardButton.props.className).toContain('dt-card-action');
    expect(cardButton.props.style.minHeight).toBe('var(--dt-space-5)');
    expect(cardLink.type).toBe('a');
    expect(cardLink.props.href).toBe('/tools');
    expect(Children.toArray(cardButton.props.children).some((child) => isValidElement(child) && child.type === 'style')).toBe(false);
  });

  it('activates CardButton with Enter and Space while respecting disabled state', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CardButton onClick={onClick}>도구 실행</CardButton>);

    const action = screen.getByRole('button', { name: '도구 실행' });
    action.focus();
    expect(document.activeElement).toBe(action);
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);

    render(<CardButton disabled onClick={onClick}>비활성 도구</CardButton>);
    await user.click(screen.getByRole('button', { name: '비활성 도구' }));
    expect(onClick).toHaveBeenCalledTimes(2);
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

  it('Button md size follows the shared 44px touch target', () => {
    const el = Button({ children: '저장' });
    expect(el.props.style.height).toBe(44);
    expect(el.props.style.padding).toBe('0 18px');
  });

  it('exports chip, section, and pill tabs as additive contracts', () => {
    expect(Chip({ variant: 'accent', size: 'sm', children: 'MCP' }).props.className).toContain('dt-chip-accent');
    expect(Section({ variant: 'proof', tone: 'grid', children: '증거' }).props.className).toContain('dt-section-proof');
    expect(Tabs({ variant: 'pill', tabs: [{ id: 'a', label: 'A' }] }).props.children.props.className).toContain('dt-tabs-list-pill');
  });

  it('renders static chips as spans and actionable chips as native buttons', () => {
    const staticChip = Chip({ children: '상태' });
    const actionChip = Chip({ children: '재시도', onClick: () => undefined });

    expect(staticChip.type).toBe('span');
    expect(staticChip.props.className).not.toContain('dt-chip-interactive');
    expect(actionChip.type).toBe('button');
    expect(actionChip.props.type).toBe('button');
    expect(actionChip.props.className).toContain('dt-chip-interactive');
    expect(actionChip.props.style.minHeight).toBe('var(--dt-space-5)');
    expect(actionChip.props.style.minWidth).toBe('var(--dt-space-5)');
    expect(actionChip.props.variant).toBeUndefined();
    expect(staticChip.props.size).toBeUndefined();
    expect(FilterChip({ label: '날씨' }).props.className).toContain('dt-filter-chip');
    expect(FilterChip({ label: '날씨', active: true }).props.className).toContain('dt-filter-chip-active');
  });

  it('activates actionable chips with Enter and Space and blocks disabled actions', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>재시도</Chip>);

    const action = screen.getByRole('button', { name: '재시도' });
    action.focus();
    expect(document.activeElement).toBe(action);
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);

    render(<Chip disabled onClick={onClick}>사용 불가</Chip>);
    await user.click(screen.getByRole('button', { name: '사용 불가' }));
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('uses stylesheet state hooks without injecting Tabs styles', () => {
    const tabs = Tabs({ tabs: [{ id: 'weather', label: '날씨' }] });
    const list = tabs.props.children;
    const tab = Children.toArray(list.props.children).find(
      (child) => isValidElement(child) && child.props.className?.includes('dt-tabs-tab'),
    );

    expect(list.props.className).toContain('dt-tabs-list-underline');
    expect(isValidElement(tab) && tab.props.className).toContain('dt-tabs-tab-underline');
    expect(Children.toArray(list.props.children).some((child) => isValidElement(child) && child.type === 'style')).toBe(false);
  });

  it('gives FilterChip toggle and remove controls canonical target hooks', () => {
    const toggle = FilterChip({ label: '날씨' });
    const removable = FilterChip({ label: '날씨', removable: true });

    expect(toggle.props.className).toContain('dt-filter-chip');
    expect(toggle.props.style.minHeight).toBe('var(--dt-space-5)');
    expect(removable.props.className).toContain('dt-filter-chip-group');
    expect(removable.props.children[1].props.className).toContain('dt-filter-chip-remove');
  });

  it('marks input controls and pulses live statuses by default', () => {
    const input = Input({ disabled: true });
    const inputControl = input.props.children[1].props.children[1];
    const liveStatus = StatusPill({ status: 'connected', children: '연결됨' });

    expect(inputControl.props.className).toContain('dt-input-control');
    expect(inputControl.props.disabled).toBe(true);
    expect(liveStatus.props.children[0].props.className).toBe('dt-status-pulse');
  });

  it('renders status motion without injecting a style tag', () => {
    const liveStatus = StatusPill({ status: 'reconnecting', children: '재연결 중' });

    expect(Children.toArray(liveStatus.props.children).some((child) => isValidElement(child) && child.type === 'style')).toBe(false);
  });
});
