// @vitest-environment jsdom
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  BRAND_LOGO_LANGUAGE,
  PRODUCT_ACTION_PILL_SIZE,
  PRODUCT_ACTION_PILL_VARIANT,
  PRODUCT_SHELL_TONE,
  BrandLogo,
  ProductActionPill,
  ProductCinematicBackdrop,
  ProductMotionField,
  ProductPageHeader,
  ProductShell,
  ProductSideRail,
  ProductTopbar,
  SectionCard,
  ToolCard,
  productActionPillClassName,
} from './index';
import type { BrandLogoHandle } from './index';

describe('Product components', () => {
  describe('BrandLogo', () => {
    it('renders the bridge-line symbol and stable Bridger wordmark', () => {
      const { container } = render(<BrandLogo lang="ko" />);

      expect(screen.getByLabelText('브릿저')).toBeTruthy();
      expect(screen.getByText('Bridger')).toBeTruthy();
      expect(container.querySelector('svg[viewBox="0 0 44 24"]')).toBeTruthy();
      expect(container.textContent).not.toContain('Bridger.');
      expect(BRAND_LOGO_LANGUAGE.Korean).toBe('ko');
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

  describe('Product composition primitives', () => {
    it('renders product action pill variants through the shared contract', () => {
      render(
        <ProductActionPill href="/console" variant={PRODUCT_ACTION_PILL_VARIANT.Accent} size={PRODUCT_ACTION_PILL_SIZE.Hero}>
          콘솔 열기
        </ProductActionPill>,
      );

      const pill = screen.getByRole('link', { name: '콘솔 열기' });
      expect(pill.className).toContain('dt-product-action-pill');
      expect(pill.className).toContain('dt-product-action-pill-accent');
      expect(pill.className).toContain('dt-product-action-pill-hero');
      expect(productActionPillClassName()).toContain('dt-product-action-pill-compact');
      expect(productActionPillClassName({ variant: PRODUCT_ACTION_PILL_VARIANT.Outline })).toContain(
        'dt-product-action-pill-outline',
      );
      expect(productActionPillClassName({ size: PRODUCT_ACTION_PILL_SIZE.Hero })).toContain('dt-product-action-pill-hero');
    });

    it('renders the cinematic shell, backdrop, and side rail used by marketing pages', () => {
      const { container } = render(
        <ProductShell tone={PRODUCT_SHELL_TONE.Cinematic}>
          <ProductCinematicBackdrop />
          <ProductMotionField gridSrc="/grid.svg" />
          <ProductSideRail label="Sections" items={[{ key: 'features', href: '#features', label: 'Features' }]} />
        </ProductShell>,
      );

      expect(container.querySelector('.dt-product-shell-cinematic')).toBeTruthy();
      expect(container.querySelector('.dt-product-cinematic-lines')).toBeTruthy();
      expect(container.querySelector('.dt-product-motion-field')).toBeTruthy();
      expect(container.querySelector('.dt-product-motion-grid')?.getAttribute('src')).toBe('/grid.svg');
      expect(container.querySelector('.dt-product-motion-orbit')).toBeTruthy();
      expect(container.querySelector('.dt-product-motion-node')).toBeTruthy();
      expect(screen.getByRole('complementary', { name: 'Sections' })).toBeTruthy();
      expect(screen.getByRole('link', { name: 'Features' }).getAttribute('href')).toBe('#features');
    });

    it('renders the product topbar without app-local button wrappers', () => {
      const { container } = render(
        <ProductTopbar
          brand={<a href="/">Bridger</a>}
          actions={
            <ProductActionPill href="/console" variant={PRODUCT_ACTION_PILL_VARIANT.Accent} size={PRODUCT_ACTION_PILL_SIZE.Hero}>
              콘솔 열기
            </ProductActionPill>
          }
        />,
      );

      expect(screen.getByRole('banner').className).toContain('dt-product-topbar');
      expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy();
      expect(container.querySelector('.dt-product-topbar .dt-product-action-pill-hero')).toBeTruthy();
    });

    it('renders the console page header without app-local layout wrappers', () => {
      render(
        <ProductPageHeader
          eyebrow="API"
          title="연결 설정"
          description="운영 화면에서 사용할 엔드포인트를 관리합니다."
          actions={<button type="button">저장</button>}
        />,
      );

      expect(screen.getByRole('heading', { name: '연결 설정' })).toBeTruthy();
      expect(screen.getByText('API')).toBeTruthy();
      expect(screen.getByRole('button', { name: '저장' })).toBeTruthy();
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
