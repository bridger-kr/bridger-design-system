/* Bridger landing — part 3: tool categories, examples, final CTA, footer, App root */

const { Icon: Ic, Navbar, Hero, BrandMark: Mark } = window.LandingParts1;
const { Convergence, IntegrationSection } = window.LandingParts2;
const { useState: useS } = React;

const CATEGORIES = [
  { key: 'weather', title: '날씨', en: 'Weather', icon: 'CloudSun', count: 36, tint: 'var(--dt-tint-cobalt)', color: 'var(--dt-cobalt)', tags: ['단기예보', '중기예보', '초단기실황', '생활기상'] },
  { key: 'realEstate', title: '부동산', en: 'Real estate', icon: 'Building2', count: 27, tint: 'var(--dt-tint-accent)', color: 'var(--dt-accent)', tags: ['실거래가', '전월세', '공시지가', '건축물대장'] },
  { key: 'finance', title: '금융', en: 'Finance', icon: 'TrendingUp', count: 19, tint: 'var(--dt-tint-success)', color: 'var(--dt-success)', tags: ['환율', '기준금리', '주가지수', '예금금리'] },
  { key: 'transport', title: '교통', en: 'Transport', icon: 'Bus', count: 21, tint: 'var(--dt-tint-warning)', color: 'var(--dt-warning)', tags: ['버스도착', '지하철', '주차장', '교통량'] },
  { key: 'health', title: '보건·의료', en: 'Health', icon: 'HeartPulse', count: 28, tint: 'var(--dt-tint-danger)', color: 'var(--dt-danger)', tags: ['병원찾기', '의약품', '감염병', '응급실'] },
  { key: 'civic', title: '행정·공공', en: 'Civic', icon: 'Landmark', count: 20, tint: 'var(--dt-tint-muted)', color: 'var(--dt-muted-strong)', tags: ['민원', '인허가', '통계', '재정'] },
  { key: 'culture', title: '문화·관광', en: 'Culture', icon: 'Palette', count: 18, tint: 'var(--dt-tint-accent)', color: 'var(--dt-accent)', tags: ['공연', '전시', '관광지', '축제'] },
  { key: 'food', title: '식품·안전', en: 'Food & safety', icon: 'UtensilsCrossed', count: 14, tint: 'var(--dt-tint-cobalt)', color: 'var(--dt-cobalt)', tags: ['식품안전', '원산지', '영양정보', '회수'] },
];

function ToolCategories({ locale }) {
  return (
    <section className="section">
      <div className="dt-shell">
        <div className="section-head" style={{ marginBottom: 40 }}>
          <h2>{locale === 'ko' ? '카테고리로 바로 찾기' : 'Find it by category'}</h2>
          <p>{locale === 'ko' ? '230여 개 프리셋이 14개 카테고리로 정리되어 있습니다.' : 'Over 230 presets, organized into 14 categories.'}</p>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <div className="card cat-card" key={c.key}>
              <div className="cat-top">
                <span className="cat-icon" style={{ background: c.tint, color: c.color }}><Ic name={c.icon} size={20} strokeWidth={1.85} /></span>
                <span className="cat-count">{c.count}</span>
              </div>
              <h3>{locale === 'ko' ? c.title : c.en}</h3>
              <div className="cat-tags">{c.tags.slice(0, 4).map((t) => <span className="cat-tag" key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Example conversations ── */
function Examples({ locale }) {
  return (
    <section className="section section-tint">
      <div className="dt-shell">
        <div className="section-head">
          <h2>{locale === 'ko' ? 'AI가 공공데이터로 답합니다' : 'Your AI answers with public data'}</h2>
          <p>{locale === 'ko' ? '클라이언트에 브릿저를 연결하면, 일상 질문이 정식 공공 API 호출로 이어집니다.' : 'Connect Bridger to a client, and everyday questions become real public-API calls.'}</p>
        </div>
        <div className="ex-grid">
          <ChatCard client="Claude" tone="var(--dt-accent)" tint="var(--dt-tint-accent)"
            tool="weather_getVilageFcst"
            q={locale === 'ko' ? '토요일 서울 아침 기온 알려줘' : 'What is Seoul morning temp on Saturday?'}
            a={locale === 'ko' ? '기상청 단기예보 기준, 토요일 오전 6–9시 서울 기온은 18–21°C입니다. 강수확률은 20%로 낮습니다.' : 'Per KMA short-term forecast, Seoul reads 18–21°C from 6–9am Saturday, with a low 20% chance of rain.'} />
          <ChatCard client="ChatGPT" tone="var(--dt-success)" tint="var(--dt-tint-success)"
            tool="realestate_getRTMSData"
            q={locale === 'ko' ? '강남구 아파트 최근 실거래가 추세는?' : 'Recent apartment price trend in Gangnam?'}
            a={locale === 'ko' ? '국토교통부 실거래가 기준, 최근 3개월 강남구 아파트 평균 거래가는 소폭 상승했습니다. 표로 정리해 드릴게요.' : 'Per MOLIT transaction data, average Gangnam apartment prices rose slightly over 3 months. Here is a table.'} />
        </div>
      </div>
    </section>
  );
}

function ChatCard({ client, tone, tint, tool, q, a }) {
  return (
    <div className="card chat">
      <div className="chat-head">
        <span className="chat-avatar" style={{ background: tint, color: tone }}>{client[0]}</span>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-ink-strong)' }}>{client}</div>
        <span className="badge badge-accent" style={{ marginLeft: 'auto' }}>Bridger MCP</span>
      </div>
      <div className="chat-body">
        <div className="bubble user">{q}</div>
        <div className="bubble bot">
          <span className="tool"><Ic name="Wrench" size={11} strokeWidth={2.2} /> {tool}</span>
          <div>{a}</div>
        </div>
      </div>
    </div>
  );
}

function FinalCTA({ locale }) {
  return (
    <section className="section" style={{ borderTop: 'none' }}>
      <div className="dt-shell">
        <div className="cta">
          <div className="hero-dots" style={{ opacity: 0.5 }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}><Mark size={26} /></div>
            <h2>{locale === 'ko' ? '공공 API, 지금 이어보세요' : 'Bridge public APIs today'}</h2>
            <p>{locale === 'ko' ? '무료로 시작하고, 첫 호출부터 운영 키까지 한 흐름으로 검증하세요.' : 'Start free and validate from the first call to the operating key, in one flow.'}</p>
            <div className="cta-actions">
              <a className="btn-primary" href="#" style={{ padding: '13px 24px', fontSize: 15 }}>{locale === 'ko' ? '콘솔 시작하기' : 'Start in console'}<Ic name="ArrowRight" size={16} strokeWidth={2.4} /></a>
              <a className="btn-secondary" href="#" style={{ padding: '13px 24px', fontSize: 15 }}>{locale === 'ko' ? '문서 보기' : 'Read docs'}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ locale }) {
  const cols = [
    { h: locale === 'ko' ? '제품' : 'Product', items: ['콘솔', '연동 카탈로그', '정부 API', '사용량'] },
    { h: locale === 'ko' ? '개발자' : 'Developers', items: ['API 가이드', 'MCP 연결', 'REST 호출', 'OpenAPI'] },
    { h: locale === 'ko' ? '회사' : 'Company', items: ['소개', '개인정보처리방침', '이용약관', '문의'] },
  ];
  return (
    <footer className="footer">
      <div className="dt-shell">
        <div className="footer-grid">
          <div>
            <Mark size={22} />
            <p style={{ marginTop: 16, fontSize: 13, lineHeight: 1.6, color: 'var(--dt-muted)', maxWidth: 280 }}>
              {locale === 'ko' ? '어려운 공공 API를 하나로 이어주는 서비스. MCP와 REST로 연결합니다.' : 'One managed gateway for Korea\u2019s public-data APIs, over MCP and REST.'}
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4>{c.h}</h4>
              {c.items.map((i) => <a href="#" key={i}>{i}</a>)}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Bridger · datari.kr</span>
          <span>api.datari.kr · mcp.datari.kr · portal.datari.kr</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [theme, setTheme] = useS('light');
  const [locale, setLocale] = useS('ko');
  React.useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return (
    <div className="landing">
      <Navbar theme={theme} onTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        locale={locale} onLocale={() => setLocale((l) => (l === 'ko' ? 'en' : 'ko'))} />
      <Hero locale={locale} />
      <Convergence locale={locale} />
      <IntegrationSection locale={locale} />
      <ToolCategories locale={locale} />
      <Examples locale={locale} />
      <FinalCTA locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
