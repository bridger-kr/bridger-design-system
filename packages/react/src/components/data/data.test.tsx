import { describe, expect, it } from 'vitest';

import {
  Avatar,
  CodeBlock,
  KeyValue,
  LogRow,
  Pagination,
  StatTile,
  Table,
  UsageMeter,
} from './index';

describe('data exports', () => {
  it('exports all data components as functions', () => {
    expect(Avatar).toBeTypeOf('function');
    expect(CodeBlock).toBeTypeOf('function');
    expect(KeyValue).toBeTypeOf('function');
    expect(LogRow).toBeTypeOf('function');
    expect(Pagination).toBeTypeOf('function');
    expect(StatTile).toBeTypeOf('function');
    expect(Table).toBeTypeOf('function');
    expect(UsageMeter).toBeTypeOf('function');
  });
});
