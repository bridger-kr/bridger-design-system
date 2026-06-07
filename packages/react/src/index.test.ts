import { describe, expect, it } from 'vitest';

import * as api from './index';

describe('@bridger-ds/react package barrel', () => {
  it('loads without side-effect errors', () => {
    expect(api).toBeTypeOf('object');
  });

  it('re-exports migrated core components once Wave 4 lands', () => {
    // These assertions tighten as categories are migrated. Button is the first
    // core component and proves the barrel -> category -> component chain works.
    expect(api).toHaveProperty('Button');
  });
});
