// @vitest-environment jsdom
import { createRef } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  ActionList,
  ActionListIndex,
  AnnotationHotspot,
  BRAND_LOGO_LANGUAGE,
  PRODUCT_ACTION_PILL_SIZE,
  PRODUCT_ACTION_PILL_VARIANT,
  PRODUCT_SHELL_TONE,
  SEARCH_PILL_SIZE,
  SEARCH_PILL_TONE,
  BrandLogo,
  ChatBubble,
  ProductActionPill,
  ProductCinematicBackdrop,
  ProductMotionField,
  ProductPageHeader,
  ProductShell,
  ProductSideRail,
  ProductTopbar,
  SearchPill,
  SectionCard,
  ToolCard,
  WindowChrome,
  WindowFrame,
  actionListClassName,
  actionListItemClassName,
  productActionPillClassName,
} from './index';
import { DS_MESSAGES_KO } from '../../locale/messages';
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

      expect(screen.getByLabelText(DS_MESSAGES_KO.brand.wordmark.ko)).toBeTruthy();
      expect(screen.getByRole('img', { name: DS_MESSAGES_KO.brand.wordmark.ko })).toBeTruthy();
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
    it('publishes enum-like search specimen variants for consumers', () => {
      const pill = SearchPill({
        tone: SEARCH_PILL_TONE.Accent,
        size: SEARCH_PILL_SIZE.Large,
        children: 'Find weather data',
      });

      expect(pill.props.className).toContain('dt-search-pill-accent');
      expect(pill.props.className).toContain('dt-search-pill-lg');
    });

    it('exports the console action-list contract for guide-first flows', () => {
      render(
        <ActionList aria-label="Getting started">
          <a href="/register" className={actionListItemClassName({ interactive: true })}>
            <ActionListIndex>1</ActionListIndex>
            Register API
          </a>
        </ActionList>,
      );

      expect(screen.getByLabelText('Getting started').className).toBe(actionListClassName());
      expect(screen.getByRole('link', { name: /Register API/ }).className).toContain('dt-action-list-item-interactive');
      expect(screen.getByText('1').className).toBe('dt-action-list-index');
    });

    it('renders product action pill variants through the shared contract', () => {
      render(
        <ProductActionPill href="/console" variant={PRODUCT_ACTION_PILL_VARIANT.Accent} size={PRODUCT_ACTION_PILL_SIZE.Hero}>
          Open console
        </ProductActionPill>,
      );

      const pill = screen.getByRole('link', { name: 'Open console' });
      expect(pill.className).toContain('dt-product-action-pill');
      expect(pill.className).toContain('dt-product-action-pill-accent');
      expect(pill.className).toContain('dt-product-action-pill-hero');
      expect(productActionPillClassName()).toContain('dt-product-action-pill-compact');
      expect(productActionPillClassName({ variant: PRODUCT_ACTION_PILL_VARIANT.Outline })).toContain(
        'dt-product-action-pill-outline',
      );
      expect(productActionPillClassName({ size: PRODUCT_ACTION_PILL_SIZE.Hero })).toContain('dt-product-action-pill-hero');
    });

    it('exports product mockup primitives for landing visual artifacts', () => {
      const { container } = render(
        <WindowFrame chrome={<WindowChrome title="bridger.kr" trailing="200" />}>
          <AnnotationHotspot x="24%" y="40%" label="Active">
            <SearchPill artifactLabel="Search" tone="accent">OpenAPI search</SearchPill>
          </AnnotationHotspot>
          <ChatBubble role="assistant">Response ready</ChatBubble>
        </WindowFrame>,
      );

      expect(container.querySelector('.dt-window-frame')).toBeTruthy();
      expect(container.querySelector('.dt-window-chrome-dot-3')).toBeTruthy();
      expect(container.querySelector('.dt-annotation-hotspot-dot')).toBeTruthy();
      expect(container.querySelector('.dt-search-pill-artifact')).toBeTruthy();
      expect(container.querySelector('.dt-chat-message-assistant')).toBeTruthy();
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
          mobileMenuCloseLabel="Close menu"
          mobileMenuLabel="Open menu"
          mobileActions={
            <ProductActionPill href="/docs" leadingIcon={<span aria-hidden="true">?</span>}>
              View docs
            </ProductActionPill>
          }
          actions={
            <ProductActionPill href="/console" variant={PRODUCT_ACTION_PILL_VARIANT.Accent} size={PRODUCT_ACTION_PILL_SIZE.Hero}>
              Open console
            </ProductActionPill>
          }
        />,
      );

      expect(screen.getByRole('banner').className).toContain('dt-product-topbar');
      expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy();
      fireEvent.click(screen.getByLabelText('Open menu'));
      expect(within(container).getByRole('dialog', { name: 'Mobile menu' })).toBeTruthy();
      expect(within(container).getByRole('navigation', { name: 'Mobile primary' })).toBeTruthy();
      expect(screen.getByLabelText('Close menu')).toBeTruthy();
      expect(screen.getByText('View docs')).toBeTruthy();
      expect(container.querySelector('.dt-product-topbar .dt-product-action-pill-hero')).toBeTruthy();
    });

    it('closes the mobile menu after a menu link is selected', () => {
      const { container } = render(
        <ProductTopbar
          brand={<a href="/">Bridger</a>}
          mobileMenuLabel="Open menu"
          mobileActions={<a href="#how">How it works</a>}
          actions={<a href="/console">Open console</a>}
        />,
      );

      fireEvent.click(within(container).getByLabelText('Open menu'));
      expect(within(container).getByRole('navigation', { name: 'Mobile primary' })).toBeTruthy();

      fireEvent.click(within(container).getByRole('link', { name: 'How it works' }));

      expect(within(container).queryByRole('navigation', { name: 'Mobile primary' })).toBeNull();
    });

    it('closes the mobile menu from Escape and outside pointer interactions', () => {
      const { container } = render(
        <ProductTopbar
          brand={<a href="/">Bridger</a>}
          mobileMenuLabel="Open menu"
          mobileActions={<a href="#how">How it works</a>}
          actions={<a href="/console">Open console</a>}
        />,
      );

      const menuButton = within(container).getByLabelText('Open menu');
      fireEvent.click(menuButton);
      const menuLink = within(container).getByRole('link', { name: 'How it works' });
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
          mobileMenuLabel="Open menu"
          mobileActions={
            <>
              <a href="#how">How it works</a>
              <button type="button">Open console</button>
              <a href="#excluded" tabIndex={-1}>Skipped link</a>
              <div style={{ display: 'none' }}>
                <a href="#hidden">Hidden link</a>
              </div>
            </>
          }
          actions={<a href="/console">Open console</a>}
        />,
      );

      const menuButton = within(container).getByLabelText('Open menu');
      fireEvent.click(menuButton);
      const finalAction = within(container).getByRole('button', { name: 'Open console' });

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
            mobileMenuCloseLabel="Close menu"
            mobileMenuLabel="Open menu"
            mobileActions={<a href="#how">How it works</a>}
            actions={<a href="/console">Open console</a>}
          />
          <main>Page body</main>
        </>,
      );

      const menuButton = within(container).getByLabelText('Open menu');
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
          mobileMenuLabel="Open menu"
          mobileActions={<a href="#how">How it works</a>}
          actions={<a href="/console">Open console</a>}
        />,
      );

      const menuButton = within(container).getByLabelText('Open menu');
      fireEvent.click(menuButton);
      expect(document.body.style.overflow).toBe('hidden');
      expect(document.body.style.overscrollBehavior).toBe('none');

      fireEvent.click(within(container).getByRole('link', { name: 'How it works' }));
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
          title="Connection settings"
          description="Manage the endpoints used on the console."
          actions={<button type="button">Save</button>}
        />,
      );

      const header = container.querySelector('.dt-product-page-header');
      expect(header).toBeTruthy();
      if (!(header instanceof HTMLElement)) {
        throw new TypeError('ProductPageHeader root missing');
      }
      expect(within(header).getByRole('heading', { name: 'Connection settings' })).toBeTruthy();
      expect(within(header).getByText('API')).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy();
    });
  });

  describe('SectionCard', () => {
    it('accepts optional headers and content class names', () => {
      expect(SectionCard({ contentClassName: 'body', children: 'Content' })).toMatchObject({
        props: expect.objectContaining({ children: expect.any(Array) }),
      });
    });
  });
});
