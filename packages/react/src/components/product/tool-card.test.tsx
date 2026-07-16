// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ToolCard } from './ToolCard';

describe('ToolCard stylesheet contract', () => {
  it('uses scoped hooks without injecting runtime styles', () => {
    const { container } = render(<ToolCard name="weather_getForecast" />);

    expect(container.querySelector('.dt-tool-card')).not.toBeNull();
    expect(container.querySelector('.dt-tool-card .dt-chip-muted')).not.toBeNull();
    expect(container.querySelector('.dt-tool-card .dt-chip-accent')).not.toBeNull();
    expect(container.querySelector('style')).toBeNull();
  });
});
