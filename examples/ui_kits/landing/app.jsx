/* Bridger landing — cinematic recreation. Self-contained; uses design-system tokens. */

const { useState, useEffect, useRef } = React;

/* Lucide icon helper */
function Icon({ name, size = 16, strokeWidth = 1.9, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide && window.lucide[name]) {
      const el = window.lucide.createElement(window.lucide[name]);
      el.setAttribute('width', size); el.setAttribute('height', size);
      el.setAttribute('stroke-width', strokeWidth);
      ref.current.innerHTML = ''; ref.current.appendChild(el);
    }
  }, [name, size, strokeWidth]);
  return <span ref={ref} style={{ display: 'inline-flex', ...style }} aria-hidden="true" />;
}

/* ── Theme + locale toggles ── */
function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="icon-btn" onClick={onToggle} aria-label="테마 전환" title="테마 전환">
      <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={17} />
    </button>
  );
}

function Navbar({ theme, onTheme, locale, onLocale }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = locale === 'ko'
    ? ['제품', '도구', '예시', '가이드']
    : ['Product', 'Tools', 'Examples', 'Guides'];
  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="dt-shell nav-inner">
        <BrandMark />
        <nav className="nav-links">
          {links.map((l) => <a key={l} className="nav-link" href="#">{l}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" style={{ width: 'auto', padding: '0 12px', fontSize: 12, fontWeight: 700, fontFamily: 'var(--dt-font-mono)' }}
            onClick={onLocale} aria-label="언어 전환">{locale === 'ko' ? 'EN' : '한'}</button>
          <ThemeToggle theme={theme} onToggle={onTheme} />
          <a className="btn-primary" href="#" style={{ padding: '10px 16px' }}>
            {locale === 'ko' ? '콘솔 열기' : 'Open console'}
            <Icon name="ArrowRight" size={15} strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </header>
  );
}

/* ── Brand wordmark (mark-only, persimmon period) ── */
function BrandMark({ size = 22 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: 'var(--dt-font-sans)', fontWeight: 780, fontSize: size, letterSpacing: '-0.025em', color: 'var(--dt-ink-strong)', lineHeight: 1, userSelect: 'none' }} aria-label="Bridger">
      Bridger<span style={{ color: 'var(--dt-accent)' }}>.</span>
    </span>
  );
}

/* ── Hero ── */
const HERO_WORDS_KO = ['하나로 잇다', 'Claude에 연결', 'REST로 호출', 'MCP로 노출'];
const HERO_WORDS_EN = ['into one', 'to Claude', 'over REST', 'through MCP'];

function Hero({ locale }) {
  const words = locale === 'ko' ? HERO_WORDS_KO : HERO_WORDS_EN;
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWi((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <section className="hero">
      <div className="hero-backdrop">
        <div className="hero-wash" />
        <div className="hero-dots" />
        <svg className="hero-lines" viewBox="0 0 1440 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path className="track" d="M-40 250 H560 C700 250 720 170 880 170 H1500" />
          <path className="track" d="M-40 430 H520 C660 430 690 540 860 540 H1500" />
          <path className="track" d="M-40 340 H600 C740 340 760 330 920 330 H1500" />
          <path className="flow a" d="M-40 250 H560 C700 250 720 170 880 170 H1500" />
          <path className="flow b" d="M-40 430 H520 C660 430 690 540 860 540 H1500" />
          <path className="flow c" d="M-40 340 H600 C740 340 760 330 920 330 H1500" />
        </svg>
      </div>
      <div className="dt-shell">
        <div className="hero-grid-wrap">
          <div className="reveal">
            <h1>
              {locale === 'ko' ? (
                <>어려운 공공 API를<br /><span className="swap accent">{words[wi]}</span></>
              ) : (
                <>Connect Korea's<br />public data <span className="swap accent">{words[wi]}</span></>
              )}
            </h1>
            <p className="hero-lede">
              {locale === 'ko'
                ? '공공데이터 OpenAPI를 MCP와 REST로 연결하고, 서비스키와 응답 정규화를 한곳에서 관리합니다.'
                : 'Connect public-data OpenAPI services over MCP and REST, with managed service keys and normalized responses in one place.'}
            </p>
            <div className="hero-cta">
              <a className="btn-primary" href="#" style={{ padding: '13px 22px', fontSize: 15 }}>
                {locale === 'ko' ? '콘솔 시작하기' : 'Start in console'}
                <Icon name="ArrowRight" size={16} strokeWidth={2.4} />
              </a>
              <a className="btn-secondary" href="#" style={{ padding: '13px 22px', fontSize: 15 }}>
                <Icon name="BookOpen" size={16} />
                {locale === 'ko' ? '가이드 보기' : 'Read the guides'}
              </a>
            </div>
            <div className="hero-signals">
              <div className="hero-signal"><b>230+</b><span>{locale === 'ko' ? '연동 프리셋' : 'presets'}</span></div>
              <div className="hero-signal"><b>14</b><span>{locale === 'ko' ? '데이터 카테고리' : 'categories'}</span></div>
              <div className="hero-signal"><b>MCP / REST</b><span>{locale === 'ko' ? '두 프로토콜' : 'two protocols'}</span></div>
            </div>
          </div>
          <HeroDemo locale={locale} />
        </div>
      </div>
    </section>
  );
}

function HeroDemo({ locale }) {
  return (
    <div className="demo reveal" style={{ animationDelay: '0.12s' }}>
      <div className="demo-bar">
        <div className="demo-dots"><i /><i /><i /></div>
        <span className="url">portal.datari.kr / government-apis</span>
      </div>
      <div className="demo-body">
        <div className="demo-q">
          <Icon name="Search" size={15} style={{ color: 'var(--dt-muted)' }} />
          <span>{locale === 'ko' ? '이번 주말 서울 날씨 데이터 있어?' : 'Any weather data for Seoul this weekend?'}</span>
          <span className="caret" />
        </div>
        <div className="demo-ans">
          <div className="demo-ans-head">
            <Icon name="Sparkles" size={13} style={{ color: 'var(--dt-accent)' }} />
            {locale === 'ko' ? '추천 공공 API · 2건' : 'Recommended APIs · 2'}
          </div>
          <div className="demo-api">
            <div>
              <div className="name">{locale === 'ko' ? '기상청 단기예보 조회서비스' : 'KMA Short-term Forecast'}</div>
              <div className="meta">GET · api.datari.kr/v1/weather/vilage-fcst</div>
            </div>
            <span className="badge badge-success" style={{ flex: '0 0 auto' }}>{locale === 'ko' ? '연결됨' : 'ready'}</span>
          </div>
          <div className="demo-api">
            <div>
              <div className="name">{locale === 'ko' ? '기상청 초단기실황 조회' : 'KMA Ultra-short Nowcast'}</div>
              <div className="meta">GET · api.datari.kr/v1/weather/ultra-ncst</div>
            </div>
            <span className="badge badge-accent" style={{ flex: '0 0 auto' }}>MCP</span>
          </div>
        </div>
        <div className="demo-line" />
        <div className="demo-foot">
          <span>req_8a72f1c0 · 142ms</span>
          <span style={{ color: 'var(--dt-success)' }}>● 200 OK</span>
        </div>
      </div>
    </div>
  );
}

window.LandingParts1 = { Icon, Navbar, BrandMark, Hero };
