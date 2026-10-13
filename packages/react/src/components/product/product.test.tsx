// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRef } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  ActionList,
  ActionListIndex,
  AnnotationHotspot,
  BRAND_LOGO_LANGUAGE,
  SEARCH_PILL_SIZE,
  SEARCH_PILL_TONE,
  BrandLogo,
  ChatBubble,
  ProductPageHeader,
  ProductShell,
  ProductSideRail,
  ProductTopbar,
  SearchPill,
  SectionCard,
  ToolCard,
  actionListClassName,
  actionListItemClassName,
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
    it('preserves every letter position from the canonical SVG instead of stacking the paths', () => {
      const source = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../assets/brand/logo.svg'), 'utf8');
      const canonical = new DOMParser().parseFromString(source, 'image/svg+xml');
      const { container } = render(<BrandLogo />);
      const paths = [...container.querySelectorAll('.dt-brand-logo-wordmark path')];
      const canonicalPaths = [...canonical.querySelectorAll('path')];

      expect(paths).toHaveLength(canonicalPaths.length);
      expect(paths.map((path) => path.getAttribute('transform')))
        .toEqual(canonicalPaths.map((path) => path.getAttribute('transform')));
      expect(paths.map((path) => path.getAttribute('d')))
        .toEqual(canonicalPaths.map((path) => path.getAttribute('d')));
    });

    it('renders the canonical Bridger wordmark without the retired persimmon period', () => {
      const { container } = render(<BrandLogo lang="ko" />);

      expect(screen.getByLabelText('브릿저')).toBeTruthy();
      expect(screen.getByRole('img', { name: '브릿저' })).toBeTruthy();
      expect(
        container.querySelector(`.dt-brand-logo-wordmark svg[viewBox="${BRAND_WORDMARK_VIEW_BOX}"]`),
      ).toBeTruthy();
      expect(BRAND_WORDMARK_VIEW_BOX).toBe('0 0 6958 2444');
      expect(BRAND_WORDMARK_PATHS).toHaveLength(7);
      expect(container.querySelector('.dt-brand-logo-wordmark g')).toBeTruthy();
      expect(container.querySelector('.dt-brand-logo-dot')).toBeFalsy();
      expect(container.querySelector('.dt-brand-logo-line')).toBeFalsy();
      expect(BRAND_LOGO_LANGUAGE.Korean).toBe('ko');
    });

    it('keeps the canonical wordmark aspect ratio across sizes', () => {
      const { container, rerender } = render(<BrandLogo size="lg" lang="en" />);
      const largeLogo = screen.getByLabelText('Bridger');

      expect(largeLogo.style.getPropertyValue('--dt-brand-logo-width')).toBe('122.42px');
      expect(largeLogo.style.getPropertyValue('--dt-brand-logo-height')).toBe('43px');
      expect(BRAND_WORDMARK_SIZE.lg.height).toBe(43);
      expect(container.querySelector(`svg[viewBox="${BRAND_WORDMARK_VIEW_BOX}"]`)).toBeTruthy();

      rerender(<BrandLogo size="md" lang="en" />);
      expect(screen.getByLabelText('Bridger').style.getPropertyValue('--dt-brand-logo-width')).toBe('56.939px');
      expect(screen.getByLabelText('Bridger').style.getPropertyValue('--dt-brand-logo-height')).toBe('20px');

      rerender(<BrandLogo size="symbol" lang="en" />);
      const symbolLogo = screen.getByLabelText('Bridger');
      expect(symbolLogo.style.getPropertyValue('--dt-brand-logo-width')).toBe('20px');
      expect(symbolLogo.style.getPropertyValue('--dt-brand-logo-height')).toBe('20px');
      expect(symbolLogo.getAttribute('data-variant')).toBe('symbol');
      expect(container.querySelector(`svg[viewBox="${BRAND_SYMBOL_VIEW_BOX}"]`)).toBeTruthy();

      rerender(<BrandLogo size="favicon" lang="en" />);
      const faviconLogo = screen.getByLabelText('Bridger');
      expect(faviconLogo.style.getPropertyValue('--dt-brand-logo-width')).toBe('45px');
      expect(faviconLogo.style.getPropertyValue('--dt-brand-logo-height')).toBe('45px');
      expect(faviconLogo.getAttribute('data-variant')).toBe('favicon');
    });

    it('pins the square-b mark contract: persimmon square, paper glyph, never inverted', () => {
      const { container } = render(<BrandLogo size="symbol" theme="dark" lang="en" />);
      const svg = container.querySelector(`svg[viewBox="${BRAND_SYMBOL_VIEW_BOX}"]`);

      expect(svg).toBeTruthy();
      expect(svg?.querySelector('rect')?.getAttribute('fill')).toBe('var(--dt-accent)');
      expect(svg?.querySelector('path')?.getAttribute('fill')).toBe('#ffffff');
      expect(screen.getByLabelText('Bridger').getAttribute('data-brand-theme')).toBe('dark');
    });

    it('exposes an imperative play handle for brand interactions', () => {
      const ref = createRef<BrandLogoHandle>();

      render(<BrandLogo ref={ref} />);

      expect(ref.current).toBeTruthy();
      expect(ref.current?.play).toBeTypeOf('function');
    });
  });

  describe('SectionCard', () => {
    it('renders content', () => {
      render(<SectionCard>내용</SectionCard>);
      expect(screen.getByText('내용')).toBeDefined();
    });

    it('has correct default props', () => {
      expect(SectionCard).toBeDefined();
    });
  });

  describe('ToolCard', () => {
    it('renders content', () => {
      render(<ToolCard name="air_quality" description="도구 설명" />);
      expect(screen.getByText('도구 설명')).toBeDefined();
    });

    it('has correct default props', () => {
      expect(ToolCard).toBeDefined();
    });
  });

  describe('Product composition primitives', () => {
    it('publishes enum-like search specimen variants for consumers', () => {
      render(
        <SearchPill tone={SEARCH_PILL_TONE.Accent} size={SEARCH_PILL_SIZE.Large}>
          날씨 데이터 찾기
        </SearchPill>,
      );

      const pill = screen.getByText('날씨 데이터 찾기').closest('.dt-search-pill');
      expect(pill).not.toBeNull();
      if (!pill) return;
      expect(pill.className).toContain('dt-search-pill-accent');
      expect(pill.className).toContain('dt-search-pill-lg');
    });

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

    it('exports product proof primitives for landing visual artifacts', () => {
      const { container } = render(
        <div>
          <AnnotationHotspot x="24%" y="40%" label="활성">
            <SearchPill artifactLabel="검색" tone="accent">OpenAPI 검색</SearchPill>
          </AnnotationHotspot>
          <ChatBubble role="assistant">응답 준비 완료</ChatBubble>
        </div>,
      );

      expect(container.querySelector('.dt-annotation-hotspot-dot')).toBeTruthy();
      expect(container.querySelector('.dt-search-pill-artifact')).toBeTruthy();
      expect(container.querySelector('.dt-chat-message-assistant')).toBeTruthy();
    });

    it('renders the flat product shell and side rail used by marketing pages', () => {
      const { container } = render(
        <ProductShell>
          <ProductSideRail label="Sections" items={[{ key: 'features', href: '#features', label: 'Features' }]} />
        </ProductShell>,
      );

      expect(container.querySelector('.dt-product-shell')).toBeTruthy();
      expect(screen.getByRole('complementary', { name: 'Sections' })).toBeTruthy();
      expect(screen.getByRole('link', { name: 'Features' }).getAttribute('href')).toBe('#features');
    });

    it('renders the product topbar without app-local button wrappers', () => {
      const { container } = render(
        <ProductTopbar
          brand={<a href="/">Bridger</a>}
          mobileMenuCloseLabel="메뉴 닫기"
          mobileMenuLabel="메뉴 열기"
          mobileActions={<a href="/docs">문서 보기</a>}
          actions={<a href="/console">콘솔 열기</a>}
        />,
      );

      expect(screen.getByRole('banner').className).toContain('dt-product-topbar');
      expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy();
      fireEvent.click(screen.getByLabelText('메뉴 열기'));
      expect(within(container).getByRole('dialog', { name: 'Mobile menu' })).toBeTruthy();
      expect(within(container).getByRole('navigation', { name: 'Mobile primary' })).toBeTruthy();
      expect(screen.getByLabelText('메뉴 닫기')).toBeTruthy();
      expect(screen.getByText('문서 보기')).toBeTruthy();
    });

    it('closes the mobile menu after a menu link is selected', () => {
      const { container } = render(
        <ProductTopbar
          brand={<a href="/">Bridger</a>}
          mobileMenuLabel="메뉴 열기"
          mobileActions={<a href="#how">작동 방식</a>}
          actions={<a href="/console">콘솔 열기</a>}
        />,
      );

      fireEvent.click(within(container).getByLabelText('메뉴 열기'));
      expect(within(container).getByRole('navigation', { name: 'Mobile primary' })).toBeTruthy();

      fireEvent.click(within(container).getByRole('link', { name: '작동 방식' }));

      expect(within(container).queryByRole('navigation', { name: 'Mobile primary' })).toBeNull();
    });

    it('closes the mobile menu from Escape and outside pointer interactions', () => {
      const { container } = render(
        <ProductTopbar
          brand={<a href="/">Bridger</a>}
          mobileMenuLabel="메뉴 열기"
          mobileActions={<a href="#how">작동 방식</a>}
          actions={<a href="/console">콘솔 열기</a>}
        />,
      );

      const menuButton = within(container).getByLabelText('메뉴 열기');
      fireEvent.click(menuButton);
      const menuLink = within(container).getByRole('link', { name: '작동 방식' });
      expect(within(container).getByRole('navigation', { name: 'Mobile primary' })).toBeTruthy();

      menuLink.focus();
      expect(document.activeElement).toBe(menuLink);

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(within(container).queryByRole('navigation', { name: 'Mobile primary' })).toBeNull();
      expect(document.activeElement).toBe(menuButton);

      fireEvent.click(menuButton);
      expect(within(container).getByRole('navigation', { name: 'Mobile primary' })).toBeTruthy();

      fireEvent.pointerDown(document.body);
      expect(within(container).queryByRole('navigation', { name: 'Mobile primary' })).toBeNull();
    });

    it('keeps keyboard focus inside the open mobile menu', () => {
      const { container } = render(
        <ProductTopbar
          brand={<a href="/">Bridger</a>}
          mobileMenuLabel="메뉴 열기"
          mobileActions={
            <>
              <a href="#how">작동 방식</a>
              <button type="button">콘솔 열기</button>
              <a href="#excluded" tabIndex={-1}>탭 제외</a>
              <div style={{ display: 'none' }}>
                <a href="#hidden">숨김 링크</a>
              </div>
            </>
          }
          actions={<a href="/console">콘솔 열기</a>}
        />,
      );

      const menuButton = within(container).getByLabelText('메뉴 열기');
      fireEvent.click(menuButton);
      const finalAction = within(container).getByRole('button', { name: '콘솔 열기' });

      finalAction.focus();
      fireEvent.keyDown(document, { key: 'Tab' });
      expect(document.activeElement).toBe(menuButton);

      fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(finalAction);
    });

    it('closes a hidden mobile menu and restores the isolated page', () => {
      document.body.style.overflow = 'auto';
      document.body.style.overscrollBehavior = 'contain';
      const { container } = render(
        <>
          <ProductTopbar
            brand={<a href="/">Bridger</a>}
            mobileMenuCloseLabel="메뉴 닫기"
            mobileMenuLabel="메뉴 열기"
            mobileActions={<a href="#how">작동 방식</a>}
            actions={<a href="/console">콘솔 열기</a>}
          />
          <main>페이지 본문</main>
        </>,
      );

      const menuButton = within(container).getByLabelText('메뉴 열기');
      const main = within(container).getByRole('main');
      fireEvent.click(menuButton);

      expect(within(container).getByRole('dialog', { name: 'Mobile menu' }).getAttribute('aria-modal')).toBe('true');
      expect(main.hasAttribute('inert')).toBe(true);
      expect(main.getAttribute('aria-hidden')).toBe('true');
      expect(document.body.style.overflow).toBe('hidden');

      const menu = container.querySelector('.dt-product-topbar-menu');
      expect(menu).toBeInstanceOf(HTMLElement);
      if (!(menu instanceof HTMLElement)) throw new TypeError('ProductTopbar menu missing');
      menu.style.display = 'none';
      fireEvent(window, new Event('resize'));

      expect(within(container).queryByRole('dialog', { name: 'Mobile menu' })).toBeNull();
      expect(main.hasAttribute('inert')).toBe(false);
      expect(main.hasAttribute('aria-hidden')).toBe(false);
      expect(document.body.style.overflow).toBe('auto');
      expect(document.body.style.overscrollBehavior).toBe('contain');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('overscroll-behavior');
    });

    it('locks body scrolling only while the mobile menu is open', () => {
      document.body.style.overflow = 'auto';
      document.body.style.overscrollBehavior = 'contain';
      const { container, unmount } = render(
        <ProductTopbar
          brand={<a href="/">Bridger</a>}
          mobileMenuLabel="메뉴 열기"
          mobileActions={<a href="#how">작동 방식</a>}
          actions={<a href="/console">콘솔 열기</a>}
        />,
      );

      const menuButton = within(container).getByLabelText('메뉴 열기');
      fireEvent.click(menuButton);
      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.overscrollBehavior).toBe('none');

      fireEvent.click(within(container).getByRole('link', { name: '작동 방식' }));
      expect(document.body.style.overflow).toBe('auto');
      expect(document.body.style.overscrollBehavior).toBe('contain');

      unmount();
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('overscroll-behavior');
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
      if (!(header instanceof HTMLElement)) {
        throw new TypeError('ProductPageHeader root missing');
      }
      expect(within(header).getByRole('heading', { name: '연결 설정' })).toBeTruthy();
      expect(within(header).getByText('API')).toBeTruthy();
      expect(screen.getByRole('button', { name: '저장' })).toBeTruthy();
    });
  });

  describe('SectionCard', () => {
    it('accepts optional headers and content class names', () => {
      const { container } = render(<SectionCard contentClassName="body">내용</SectionCard>);
      expect(container.querySelector('.body')).not.toBeNull();
      expect(screen.getByText('내용')).toBeDefined();
    });
  });
});
