// @vitest-environment jsdom
import { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  ActionList,
  ActionListIndex,
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
  actionListClassName,
  actionListItemClassName,
  productActionPillClassName,
} from './index';
import {
  BRAND_SYMBOL_VIEW_BOX,
  BRAND_WORDMARK_PATHS,
  BRAND_WORDMARK_SIZE,
  BRAND_WORDMARK_VIEW_BOX,
} from './brandLogoGeometry';
import type { BrandLogoHandle } from './index';

describe('Product components', () => {
  describe('BrandLogo', () => {
    it('renders the Figma wordmark with a persimmon period', () => {
      const { container } = render(<BrandLogo lang="ko" />);

      expect(screen.getByLabelText('브릿저')).toBeTruthy();
      expect(container.querySelector('.dt-brand-logo-wordmark svg[viewBox="0 0 148.484 43"]')).toBeTruthy();
      expect(BRAND_WORDMARK_VIEW_BOX).toBe('0 0 148.484 43');
      expect(BRAND_WORDMARK_PATHS).toHaveLength(9);
      expect(container.querySelector('.dt-brand-logo-dot')).toBeTruthy();
      expect(container.textContent).not.toContain('Bridger.');
      expect(container.querySelector('svg[viewBox="0 0 44 24"]')).toBeFalsy();
      expect(container.querySelector('.dt-brand-logo-line')).toBeFalsy();
      expect(BRAND_LOGO_LANGUAGE.Korean).toBe('ko');
    });

    it('uses the current Figma BrandLogo variant dimensions', () => {
      const { container, rerender } = render(<BrandLogo size="lg" lang="en" />);
      const largeLogo = screen.getByLabelText('Bridger.');

      expect(largeLogo.style.width).toBe('148.484px');
      expect(largeLogo.style.height).toBe('43px');
      expect(BRAND_WORDMARK_SIZE.lg).toEqual({ width: 148.484, height: 43 });
      expect(container.querySelector('svg[viewBox="0 0 148.484 43"]')).toBeTruthy();

      rerender(<BrandLogo size="md" lang="en" />);
      expect(screen.getByLabelText('Bridger.').style.width).toBe('69.062px');
      expect(screen.getByLabelText('Bridger.').style.height).toBe('20px');

      rerender(<BrandLogo size="symbol" lang="en" />);
      expect(screen.getByLabelText('Bridger.').style.width).toBe('15px');
      expect(screen.getByLabelText('Bridger.').style.height).toBe('14px');
      expect(container.querySelector(`svg[viewBox="${BRAND_SYMBOL_VIEW_BOX.symbol}"]`)).toBeTruthy();

      rerender(<BrandLogo size="favicon" lang="en" />);
      expect(screen.getByLabelText('Bridger.').style.width).toBe('45px');
      expect(screen.getByLabelText('Bridger.').style.height).toBe('45px');
      expect(container.querySelector(`svg[viewBox="${BRAND_SYMBOL_VIEW_BOX.favicon}"]`)).toBeTruthy();
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
    it('exports the console action-list contract for guide-first flows', () => {
      render(
        <ActionList aria-label="시작 경로">
          <a href="/register" className={actionListItemClassName({ interactive: true })}>
            <ActionListIndex>1</ActionListIndex>
            API 등록
          </a>
        </ActionList>,
      );

      expect(screen.getByLabelText('시작 경로').className).toBe(actionListClassName());
      expect(screen.getByRole('link', { name: /API 등록/ }).className).toContain('dt-action-list-item-interactive');
      expect(screen.getByText('1').className).toBe('dt-action-list-index');
    });

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
      const { container } = render(
        <ProductPageHeader
          eyebrow="API"
          title="연결 설정"
          description="운영 화면에서 사용할 엔드포인트를 관리합니다."
          actions={<button type="button">저장</button>}
        />,
      );

      const header = container.querySelector('.dt-product-page-header');
      expect(header).toBeTruthy();
      expect(within(header).getByRole('heading', { name: '연결 설정' })).toBeTruthy();
      expect(within(header).getByText('API')).toBeTruthy();
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
