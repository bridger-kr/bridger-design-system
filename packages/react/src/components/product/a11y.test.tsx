// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';

import {
  ActionList,
  actionListItemClassName,
  AnnotationHotspot,
  BrandLogo,
  ChatBubble,
  ProductPageHeader,
  ProductShell,
  ProductSideRail,
  ProductTopbar,
  SearchPill,
  SectionCard,
  ToolCard,
} from './index';

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

describe('product a11y', () => {
  it('has no axe violations across product surfaces', async () => {
    const { container } = render(
      <>
        <ActionList>
          <a className={actionListItemClassName({ interactive: true })} href="/docs">문서</a>
        </ActionList>
        <AnnotationHotspot x="10%" y="20%" label="주석" />
        <BrandLogo />
        <ChatBubble role="assistant">안녕하세요</ChatBubble>
        <ProductPageHeader title="공공데이터" description="카탈로그" />
        <ProductTopbar brand={<span>Bridger</span>} actions={<a href="/login">로그인</a>} />
        <SearchPill>검색어</SearchPill>
        <SectionCard title="사용량">내용</SectionCard>
        <ToolCard name="weather_getForecast" description="예보 조회" path="/tools/weather" />
      </>,
    );

    await expectNoViolations(container);
  });

  it('renders the side rail as a labeled landmark', async () => {
    const { container } = render(
      <ProductShell>
        <ProductSideRail
          label="섹션"
          items={[{ key: 'overview', href: '#overview', label: '개요' }]}
        />
        <p>콘텐츠</p>
      </ProductShell>,
    );

    await expectNoViolations(container);
  });
});
