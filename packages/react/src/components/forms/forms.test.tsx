import { describe, expect, it } from 'vitest';

import {
  Checkbox,
  Combobox,
  FileUpload,
  RadioGroup,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  ToggleSwitch,
  Textarea,
} from './index';

describe('forms exports', () => {
  it('exports all form components as functions', () => {
    expect(Checkbox).toBeTypeOf('function');
    expect(Combobox).toBeTypeOf('function');
    expect(FileUpload).toBeTypeOf('function');
    expect(RadioGroup).toBeTypeOf('function');
    expect(SegmentedControl).toBeTypeOf('function');
    expect(Select).toBeTypeOf('function');
    expect(Slider).toBeTypeOf('function');
    expect(Switch).toBeTypeOf('function');
    expect(ToggleSwitch).toBeTypeOf('function');
    expect(Textarea).toBeTypeOf('function');
  });
});
