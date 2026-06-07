import { describe, expect, it } from 'vitest';

describe('verification harness', () => {
  it('runs a trivial passing assertion', () => {
    expect(true).toBe(true);
  });

  it('exports callable smoke helpers', async () => {
    const pack = await import('../scripts/smoke-pack.mjs');
    const smokeImport = await import('../scripts/smoke-import.mjs');

    expect(pack.smokePack).toEqual(expect.any(Function));
    expect(smokeImport.smokeImport).toEqual(expect.any(Function));
  });
});
