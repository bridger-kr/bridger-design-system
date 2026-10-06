// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { createRef, forwardRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';

import { Heading, Kbd, Link, Separator, Text } from './index';

async function expectNoViolations(html: Element | string) {
  const results = await axe(html, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  const matcher = toHaveNoViolations(results);
  expect(matcher.pass, matcher.message()).toBe(true);
}

afterEach(() => {
  cleanup();
});

describe('core primitives (DS-41)', () => {
  it('exports the new primitives as forwardRef components with displayName', () => {
    for (const component of [Heading, Kbd, Link, Separator, Text]) {
      expect(component).toBeTypeOf('object'); // forwardRef object, not a plain function
      expect(component.displayName).toBeTruthy();
    }
    expect(Heading.displayName).toBe('Heading');
    expect(Kbd.displayName).toBe('Kbd');
    expect(Link.displayName).toBe('Link');
    expect(Separator.displayName).toBe('Separator');
    expect(Text.displayName).toBe('Text');
  });

  it('forwards refs to the real DOM element', () => {
    const linkRef = createRef<HTMLAnchorElement>();
    const separatorRef = createRef<HTMLDivElement>();
    render(
      <>
        <Link ref={linkRef} href="/docs">
          문서
        </Link>
        <Separator ref={separatorRef} />
      </>,
    );

    expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
    expect(separatorRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('Kbd renders a real kbd element in the sans face with a size attribute', () => {
    render(<Kbd size="sm">⌘</Kbd>);
    const kbd = screen.getByText('⌘');

    expect(kbd.tagName).toBe('KBD');
    expect(kbd.className).toContain('dt-kbd');
    expect(kbd.getAttribute('data-size')).toBe('sm');
  });

  it('Separator exposes role=separator and the orientation state attribute', () => {
    render(<Separator orientation="vertical" />);
    const separator = screen.getByRole('separator');

    expect(separator.className).toContain('dt-separator');
    expect(separator.getAttribute('data-orientation')).toBe('vertical');
  });

  it('Link leaves internal hrefs as plain anchors', () => {
    render(<Link href="/guide">가이드</Link>);
    const link = screen.getByRole('link', { name: '가이드' });

    expect(link.className).toContain('dt-link');
    expect(link.getAttribute('href')).toBe('/guide');
    expect(link.getAttribute('target')).toBeNull();
    expect(link.getAttribute('rel')).toBeNull();
    expect(link.querySelector('svg')).toBeNull();
  });

  it('Link auto-detects cross-origin hrefs and secures them', () => {
    render(<Link href="https://example.com/docs">문서</Link>);
    const link = screen.getByRole('link');

    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');

    const icon = link.querySelector('svg');
    expect(icon).not.toBeNull();
    expect(icon?.getAttribute('aria-hidden')).toBe('true');

    // The new-context cue is text for screen readers, not the icon alone.
    expect(link.textContent).toContain('(새 창)');
    expect(link.querySelector('.dt-visually-hidden')).not.toBeNull();
  });

  it('Link does not mark same-origin absolute URLs as external', () => {
    render(<Link href={`${window.location.origin}/guide`}>가이드</Link>);
    const link = screen.getByRole('link');

    expect(link.getAttribute('target')).toBeNull();
  });

  it('Link honors the external override in both directions', () => {
    render(
      <>
        <Link href="/guide" external>
          외부 취급
        </Link>
        <Link href="https://example.com" external={false}>
          내부 취급
        </Link>
      </>,
    );

    expect(screen.getByRole('link', { name: /외부 취급/ }).getAttribute('target')).toBe('_blank');
    expect(screen.getByRole('link', { name: '내부 취급' }).getAttribute('target')).toBeNull();
  });

  it('Link lets a router inject its own element through render', () => {
    const RouterLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
      function RouterLink(props, ref) {
        return <a ref={ref} data-router-link="" {...props} />;
      },
    );

    render(
      <Link href="/guide" render={<RouterLink />}>
        가이드
      </Link>,
    );

    const link = screen.getByRole('link', { name: '가이드' });
    expect(link.getAttribute('data-router-link')).toBe('');
    expect(link.getAttribute('href')).toBe('/guide');
    expect(link.className).toContain('dt-link');
  });

  it('Text enforces the 12/13/14/16 scale via data attributes', () => {
    render(
      <>
        <Text size={12} as="p">
          캡션
        </Text>
        <Text>기본 본문</Text>
        <Text size={16} weight={600} tone="accent">
          강조
        </Text>
      </>,
    );

    const caption = screen.getByText('캡션');
    expect(caption.tagName).toBe('P');
    expect(caption.getAttribute('data-size')).toBe('12');
    expect(caption.getAttribute('data-tone')).toBeNull();

    const body = screen.getByText('기본 본문');
    expect(body.tagName).toBe('SPAN');
    expect(body.getAttribute('data-size')).toBe('16');

    const accent = screen.getByText('강조');
    expect(accent.getAttribute('data-weight')).toBe('600');
    expect(accent.getAttribute('data-tone')).toBe('accent');
  });

  it('Text rejects off-scale sizes at the type level', () => {
    // @ts-expect-error — 11 is outside the fixed scale
    const badSize = <Text size={11} />;
    // @ts-expect-error — 450 is not an allowed weight
    const badWeight = <Text weight={450} />;
    // @ts-expect-error — headings never render through Text
    const badAs = <Text as="h2" />;

    expect(badSize.type).toBe(Text);
    expect(badWeight.type).toBe(Text);
    expect(badAs.type).toBe(Text);
  });

  it('Heading renders the semantic level and decouples the visual size', () => {
    render(
      <>
        <Heading level={2}>기본 H2</Heading>
        <Heading level={3} size={36}>
          시각적 H1 크기의 H3
        </Heading>
      </>,
    );

    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.tagName).toBe('H2');
    expect(h2.className).toContain('dt-heading');
    expect(h2.getAttribute('data-size')).toBe('28');

    const h3 = screen.getByRole('heading', { level: 3 });
    expect(h3.getAttribute('data-size')).toBe('36');
  });

  it('has no axe violations across the new core primitives', async () => {
    const { container } = render(
      <main>
        <Heading level={1}>페이지 제목</Heading>
        <Heading level={3}>섹션 제목</Heading>
        <Text as="p" size={16}>
          본문 첫 문단. <Link href="/guide">가이드로 이동</Link>하고{' '}
          <Link href="https://example.com">외부 문서</Link>를 참고하세요.
        </Text>
        <Text as="p" size={13} tone="muted">
          <Kbd>⌘</Kbd> <Kbd>K</Kbd> 를 눌러 명령 팔레트를 엽니다.
        </Text>
        <Separator />
        <Text as="p" size={12} tone="danger">
          한도를 초과했습니다.
        </Text>
        <Separator orientation="vertical" />
      </main>,
    );

    await expectNoViolations(container);
  });
});
