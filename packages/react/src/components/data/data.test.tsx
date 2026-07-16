// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import {
  Avatar,
  CodeBlock,
  CodePane,
  KeyValue,
  LogRow,
  Pagination,
  StatPanel,
  StatTile,
  Table,
  UsageMeter,
} from './index';

describe('data exports', () => {
  it('exports all data components as functions', () => {
    expect(Avatar).toBeTypeOf('function');
    expect(CodeBlock).toBeTypeOf('function');
    expect(CodePane).toBeTypeOf('function');
    expect(KeyValue).toBeTypeOf('function');
    expect(LogRow).toBeTypeOf('function');
    expect(Pagination).toBeTypeOf('function');
    expect(StatPanel).toBeTypeOf('function');
    expect(StatTile).toBeTypeOf('function');
    expect(Table).toBeTypeOf('function');
    expect(UsageMeter).toBeTypeOf('function');
  });

  it('renders tokenized code pane and stat panel contracts', () => {
    const { container } = render(<CodePane label="response" lines={[{ segments: [{ text: 'status', tone: 'key' }] }]} />);

    expect(container.querySelector('.dt-code-pane-token-key')).toBeTruthy();
    expect(StatPanel({ items: [{ value: '47.2%', label: '성공률' }] }).props.className).toContain('dt-stat-panel-card');
  });

  it('renders table interaction hooks without injecting a style tag', () => {
    const { container } = render(
      <Table
        columns={[{ key: 'name', header: '이름' }]}
        rows={[{ name: '서울' }]}
      />,
    );

    expect(container.querySelector('.dt-table')).toBeTruthy();
    expect(container.querySelector('style')).toBeNull();
  });

  it('renders row actions as native buttons inside valid table cells', () => {
    render(
      <Table
        columns={[{ key: 'name', header: '이름' }]}
        rows={[{ name: '서울' }]}
        rowAction={{
          kind: 'button',
          label: (row) => `${row.name} 열기`,
          onActivate: () => undefined,
        }}
      />,
    );

    const action = screen.getByRole('button', { name: '서울 열기' });
    expect(action.closest('td')).toBeTruthy();
    expect(action.closest('tr')?.children[0]?.tagName).toBe('TD');
  });

  it('activates button row actions with Enter and Space and respects disabled rows', async () => {
    const user = userEvent.setup();
    const onActivate = vi.fn();
    render(
      <Table
        columns={[{ key: 'name', header: '이름' }]}
        rows={[{ name: '서울' }, { name: '부산' }]}
        rowAction={{
          kind: 'button',
          label: (row) => `${row.name} 열기`,
          onActivate,
          disabled: (row) => row.name === '부산',
        }}
      />,
    );

    const action = screen.getByRole('button', { name: '서울 열기' });
    action.focus();
    expect(document.activeElement).toBe(action);
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onActivate).toHaveBeenCalledTimes(2);

    await user.click(screen.getByRole('button', { name: '부산 열기' }));
    expect(onActivate).toHaveBeenCalledTimes(2);
  });

  it('renders navigation row actions as native links', () => {
    render(
      <Table
        columns={[{ key: 'name', header: '이름' }]}
        rows={[{ name: '서울' }]}
        rowAction={{
          kind: 'link',
          label: (row) => `${row.name} 상세`,
          href: () => '/regions/seoul',
        }}
      />,
    );

    expect(screen.getByRole('link', { name: '서울 상세' }).getAttribute('href')).toBe('/regions/seoul');
  });
});
