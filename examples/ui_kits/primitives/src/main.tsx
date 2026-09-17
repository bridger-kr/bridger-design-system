import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BUTTON_SIZE,
  BUTTON_VARIANT,
  Button,
  Card,
  Input,
  Sidebar,
} from '@bridger-kr/react';
import '@bridger-kr/react/styles.css';
import '@bridger-kr/tokens/css';
import './showcase.css';

const SIDEBAR_SECTIONS = [
  {
    heading: '처음 사용',
    items: [
      { label: '데이터 찾기', href: '#search', active: true },
      { label: '결과 확인', href: '#result' },
      { label: 'AI에 연결', href: '#connect' },
    ],
  },
] as const;

const THEME = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Theme = (typeof THEME)[keyof typeof THEME];

function PrimitiveShowcase() {
  const [theme, setTheme] = useState<Theme>(THEME.Light);
  const darkMode = theme === THEME.Dark;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, [theme]);

  return (
    <main className="showcase" aria-labelledby="showcase-title">
      <header className="showcase-intro">
        <div>
          <p className="showcase-eyebrow">공개 React 패키지 실행 예제</p>
          <h1 id="showcase-title">처음 써도 흐름이 보이는 기본 UI</h1>
          <p>
            이 화면은 <code>@bridger-kr/react</code> barrel에서 불러온 실제 Button, Input, Card, Sidebar를 렌더링합니다.
            표시된 데이터와 연결 상태는 예시입니다.
          </p>
        </div>
        <Button
          aria-pressed={darkMode}
          onClick={() => setTheme((current) => (current === THEME.Light ? THEME.Dark : THEME.Light))}
          variant={BUTTON_VARIANT.Secondary}
        >
          {darkMode ? 'Light 기본 보기' : 'Dark 대비 보기'}
        </Button>
      </header>

      <section className="showcase-theme" aria-label={darkMode ? 'Dark parity' : 'Light default'}>
        <div className="showcase-theme-label">{darkMode ? 'Dark parity' : 'Light default'}</div>
        <div className="showcase-shell">
          <Sidebar
            brand={<strong>데이터 시작하기</strong>}
            sections={SIDEBAR_SECTIONS.map((section) => ({ ...section, items: [...section.items] }))}
            footer="고급 설정은 나중에"
          />

          <div className="showcase-content">
            <section id="search" aria-labelledby="search-heading">
              <p className="showcase-eyebrow">1단계</p>
              <h2 id="search-heading">필요한 공공데이터를 찾아보세요</h2>
              <p>일상 표현으로 검색하고, 사용할 수 있는 항목부터 바로 시험합니다.</p>
              <Input id="public-data-search" label="무엇을 찾고 있나요?" hint="예: 서울 날씨, 사업자 정보, 미세먼지" defaultValue="서울 날씨" />
              <div className="showcase-actions" aria-label="Button variant and size states">
                <Button size={BUTTON_SIZE.Small}>작은 기본 버튼</Button>
                <Button>데이터 찾기</Button>
                <Button size={BUTTON_SIZE.Large}>큰 기본 버튼</Button>
                <Button variant={BUTTON_VARIANT.Secondary}>예시 보기</Button>
                <Button variant={BUTTON_VARIANT.Ghost}>낮은 강조</Button>
                <Button variant={BUTTON_VARIANT.Danger}>삭제</Button>
                <Button disabled>비활성 버튼</Button>
              </div>
            </section>

            <Card id="result" variant="default" className="showcase-result">
              <div>
                <p className="showcase-eyebrow">예시 데이터</p>
                <h2>단기예보 조회</h2>
                <p>지역과 날짜를 고르면 날씨 예보를 읽기 쉬운 표로 보여줍니다.</p>
              </div>
              <Button>바로 시험하기</Button>
            </Card>

            <Card id="connect" variant="raised" className="showcase-connect">
              <div>
                <p className="showcase-eyebrow">연결 준비</p>
                <h2>확인한 데이터를 AI에 연결하세요</h2>
                <p>시험한 결과를 보고 난 뒤 연결 방법을 선택할 수 있습니다.</p>
              </div>
              <Button variant={BUTTON_VARIANT.Secondary}>연결 방법 보기</Button>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<PrimitiveShowcase />);
