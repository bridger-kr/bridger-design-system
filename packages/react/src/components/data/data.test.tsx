// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

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
});
