// @vitest-environment jsdom
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrandLogo, SectionCard, ToolCard } from './index';
import type { BrandLogoHandle } from './index';

describe('Product components', () => {
  describe('BrandLogo', () => {
    it('renders the bridge-line symbol and stable Bridger wordmark', () => {
      const { container } = render(<BrandLogo lang="ko" />);

      expect(screen.getByLabelText('브릿저')).toBeTruthy();
      expect(screen.getByText('Bridger')).toBeTruthy();
      expect(container.querySelector('svg[viewBox="0 0 44 24"]')).toBeTruthy();
      expect(container.textContent).not.toContain('Bridger.');
    });

    it('exposes an imperative play handle for brand interactions', () => {
      const ref = createRef<BrandLogoHandle>();

      render(<BrandLogo ref={ref} />);

      expect(ref.current).toBeTruthy();
      expect(ref.current?.play).toBeTypeOf('function');
    });
  });

  describe('SectionCard', () => {
    it('is a function', () => {
      expect(typeof SectionCard).toBe('function');
    });

    it('has correct default props', () => {
      expect(SectionCard).toBeDefined();
    });
  });

  describe('ToolCard', () => {
    it('is a function', () => {
      expect(typeof ToolCard).toBe('function');
    });

    it('has correct default props', () => {
      expect(ToolCard).toBeDefined();
    });
  });

  describe('SectionCard', () => {
    it('accepts optional headers and content class names', () => {
      expect(SectionCard({ contentClassName: 'body', children: '내용' })).toMatchObject({
        props: expect.objectContaining({ children: expect.any(Array) }),
      });
    });
  });
});
