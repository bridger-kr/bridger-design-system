import { describe, expect, it } from 'vitest';

import * as api from './index';

describe('@bridger-kr/react package barrel', () => {
  it('loads without side-effect errors', () => {
    expect(api).toBeTypeOf('object');
  });

  it('re-exports migrated core components once Wave 4 lands', () => {
    // These assertions tighten as categories are migrated. Button is the first
    // core component and proves the barrel -> category -> component chain works.
    expect(api).toHaveProperty('Button');
  });

  it('re-exports the DS-41 primitives (issue #41)', () => {
    for (const name of ['CopyButton', 'Heading', 'Kbd', 'Link', 'Separator', 'Text']) {
      expect(api, `missing export: ${name}`).toHaveProperty(name);
    }
    // Token enums and companion types ride along with the components.
    expect(api).toHaveProperty('TEXT_SIZE');
    expect(api).toHaveProperty('TEXT_TONE');
    expect(api).toHaveProperty('TEXT_WEIGHT');
    expect(api).toHaveProperty('HEADING_SIZE');
    expect(api).toHaveProperty('KBD_SIZE');
  });
});
