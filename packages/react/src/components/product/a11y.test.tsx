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
  ProductActionPill,
  ProductCinematicBackdrop,
  ProductMotionField,
  ProductPageHeader,
  ProductShell,
  ProductTopbar,
  SearchPill,
  SectionCard,
  ToolCard,
  WindowChrome,
  WindowFrame,
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
        <ProductActionPill href="/console">콘솔 열기</ProductActionPill>
        <ProductPageHeader title="공공데이터" description="카탈로그" />
        <ProductTopbar brand={<span>Bridger</span>} actions={<a href="/login">로그인</a>} />
        <SearchPill>검색어</SearchPill>
        <SectionCard title="사용량">내용</SectionCard>
        <ToolCard name="weather_getForecast" description="예보 조회" path="/tools/weather" />
        <WindowChrome title="Bridger" url="https://bridger.kr" />
        <WindowFrame>본문</WindowFrame>
      </>,
    );

    await expectNoViolations(container);
  });

  it('keeps decorative layers hidden from assistive technology', async () => {
    const { container } = render(
      <ProductShell>
        <ProductCinematicBackdrop />
        <ProductMotionField />
        <p>콘텐츠</p>
      </ProductShell>,
    );

    await expectNoViolations(container);
  });
});
