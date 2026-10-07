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
  it('exports all data components as forwardRef objects', () => {
    for (const component of [Avatar, CodeBlock, CodePane, KeyValue, LogRow, Pagination, StatPanel, StatTile, Table, UsageMeter]) {
      expect(component).toBeDefined();
      expect((component as { $$typeof?: symbol }).$$typeof).toBe(Symbol.for('react.forward_ref'));
    }
  });

  it('renders tokenized code pane and stat panel contracts', () => {
    const { container } = render(
      <>
        <CodePane label="response" lines={[{ segments: [{ text: 'status', tone: 'key' }] }]} />
        <StatPanel items={[{ value: '47.2%', label: '성공률' }]} />
      </>,
    );

    expect(container.querySelector('.dt-code-pane-token-key')).toBeTruthy();
    expect(container.querySelector('.dt-stat-panel-card')).toBeTruthy();
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

describe('data-trust contract (#29)', () => {
  it('UsageMeter renders unknown as text, never as 0, with meter ARIA', () => {
    const { container } = render(<UsageMeter label="일일 호출" max={1000} unit="req" />);
    const meter = container.querySelector('[role="meter"]');
    expect(meter).not.toBeNull();
    expect(meter?.getAttribute('aria-valuetext')).toBe('확인 안 됨');
    expect(meter?.getAttribute('aria-valuenow')).toBeNull();
    expect(container.textContent).not.toContain('0 /');
    expect(container.querySelector('.dt-usage-meter-fill-unknown')).not.toBeNull();
  });

  it('UsageMeter reports value + limit source when known', () => {
    const { container } = render(<UsageMeter label="일일 호출" value={420} max={1000} unit="req" limitSource="무료 체험" />);
    const meter = container.querySelector('[role="meter"]');
    expect(meter?.getAttribute('aria-valuenow')).toBe('420');
    expect(container.textContent).toContain('무료 체험');
  });

  it('StatTile splits direction icon from business valence', () => {
    const { container } = render(<StatTile label="지연" value="182ms" delta="-12ms" deltaDirection="down" deltaValence="positive" />);
    const el = container.querySelector('.dt-stat-tile-delta');
    expect(el?.className).toContain('delta-positive');
    expect(el?.getAttribute('data-direction')).toBe('down');
    expect(el?.querySelector('svg')).not.toBeNull();
  });

  it('StatTile renders unknown instead of the value for error states', () => {
    const { container } = render(<StatTile label="호출 수" value="0" state="error" reason="API 500" />);
    expect(container.querySelector('.dt-stat-tile-unknown')?.textContent).toBe('확인 안 됨');
    expect(container.textContent).toContain('API 500');
  });

  it('LogRow renders severity icon + text, not color only', () => {
    const { container } = render(<LogRow entries={[{ time: '12:00:01', level: 'error', tool: 'weather_get' }]} />);
    const chip = container.querySelector('.dt-logrow-level');
    expect(chip?.textContent).toContain('오류');
    expect(chip?.querySelector('svg')).not.toBeNull();
  });

  it('Table renders a localized state row for loading and keeps headers scoped', () => {
    const { container } = render(
      <Table columns={[{ key: 'name', header: '이름' }]} rows={[]} state="loading" />,
    );
    const stateCell = container.querySelector('.dt-table-state-row td');
    expect(stateCell?.textContent).toContain('불러오는 중');
    expect(container.querySelector('th')?.getAttribute('scope')).toBe('col');
  });

  it('Table renders rows plus a partial notice and meta footer', () => {
    const { container } = render(
      <Table
        columns={[{ key: 'name', header: '이름' }]}
        rows={[{ name: 'weather' }]}
        state="partial"
        asOf="12:00"
        source="publicdata_federation"
      />,
    );
    expect(container.querySelector('.dt-table-state-row')).not.toBeNull();
    expect(container.querySelectorAll('tbody tr.dt-tr').length).toBe(1);
    const meta = container.querySelector('.dt-data-meta');
    expect(meta?.textContent).toContain('기준 시각');
    expect(meta?.textContent).toContain('publicdata_federation');
  });
});
