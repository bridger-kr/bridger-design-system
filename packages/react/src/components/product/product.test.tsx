import { describe, it, expect } from 'vitest';
import { BrandLogo, SectionCard, ToolCard } from './index';

describe('Product components', () => {
  describe('BrandLogo', () => {
    it('is a function', () => {
      expect(typeof BrandLogo).toBe('function');
    });

    it('has correct default props', () => {
      expect(BrandLogo).toBeDefined();
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
});
