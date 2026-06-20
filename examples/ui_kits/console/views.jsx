/* Bridger Console — catalog, logs views + App root */
const { Icon: CIcon, Sidebar: CSidebar, Dashboard: CDashboard } = window.ConsoleParts;
const { useState: useCS, useEffect: useCE } = React;

const TOOLS = [
  { name: 'weather_getVilageFcst', method: 'GET', cat: 'weather', desc: '기상청 단기예보 — 3일 이내 시간별 기온·강수·풍속.', path: '/v1/weather/vilage-fcst', state: 'available' },
  { name: 'weather_getUltraSrtNcst', method: 'GET', cat: 'weather', desc: '초단기실황 — 현재 기온, 습도, 강수형태 실황값.', path: '/v1/weather/ultra-ncst', state: 'managed' },
  { name: 'realestate_getRTMSData', method: 'GET', cat: 'realestate', desc: '국토교통부 아파트 매매 실거래가 상세 자료.', path: '/v1/realestate/rtms-trade', state: 'locked' },
  { name: 'finance_getExchangeRate', method: 'GET', cat: 'finance', desc: '한국은행 일별 매매기준율 환율 통계.', path: '/v1/finance/exchange-rate', state: 'available' },
  { name: 'transport_getBusArrival', method: 'GET', cat: 'transport', desc: 'TAGO 정류소별 버스 도착 예정 정보.', path: '/v1/transport/bus-arrival', state: 'available' },
  { name: 'health_getHospitalInfo', method: 'GET', cat: 'health', desc: '건강보험심사평가원 병원 기본정보 검색.', path: '/v1/health/hospital-info', state: 'managed' },
];
const CAT_LABEL = { weather: '날씨', realestate: '부동산', finance: '금융', transport: '교통', health: '보건' };
const STATE = {
  available: { c: 'var(--dt-success)', ko: '사용 가능', en: 'available' },
  managed: { c: 'var(--dt-success)', ko: '관리형 키', en: 'managed' },
  locked: { c: 'var(--dt-warning)', ko: '키 등록', en: 'key needed' },
};

function ToolCard({ t, locale }) {
  const st = STATE[t.state];
  return (
    <article className="panel panel-int panel-pad" style={{ display: 'grid', gap: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="chip">{CAT_LABEL[t.cat] ?? t.cat}</span>
            <span className="chip" style={{ color: 'var(--dt-accent)' }}>{t.method}</span>
          </div>
          <h4 style={{ marginTop: 12, fontSize: 15, fontWeight: 600, color: 'var(--dt-ink-strong)', letterSpacing: '-0.01em', wordBreak: 'break-all' }}>{t.name}</h4>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flex: '0 0 auto', fontSize: 12, fontWeight: 600, color: st.c }}>
          <span className="dot" style={{ background: st.c }} />{locale === 'ko' ? st.ko : st.en}
        </span>
      </div>
      <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.5, color: 'var(--dt-muted-strong)' }}>{t.desc}</p>
      <div style={{ marginTop: 14, paddingTop: 13, borderTop: '1px solid color-mix(in srgb, var(--dt-border) 80%, transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <code style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 12, color: 'var(--dt-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.path}</code>
        <button className="cbtn-ghost" style={{ padding: '6px 10px', fontSize: 12, flex: '0 0 auto' }}><CIcon name="Code2" size={13} />{locale === 'ko' ? 'API' : 'API'}</button>
      </div>
    </article>
  );
}

function Catalog({ locale }) {
  const [filter, setFilter] = useCS('all');
  const cats = ['all', 'weather', 'realestate', 'finance', 'transport', 'health'];
  const shown = filter === 'all' ? TOOLS : TOOLS.filter((t) => t.cat === filter);
  return (
    <>
      <div className="page-head">
        <div>
          <h1>{locale === 'ko' ? '정부 API' : 'Government APIs'}</h1>
          <p>{locale === 'ko' ? '공공데이터 카탈로그에서 도구를 찾아 연결하세요.' : 'Find and connect tools from the public-data catalog.'}</p>
        </div>
        <button className="cbtn"><CIcon name="PlusCircle" size={15} />{locale === 'ko' ? 'API 등록' : 'Register'}</button>
      </div>
      <div className="search-bar" style={{ background: 'var(--dt-surface)' }}>
        <CIcon name="Search" size={16} style={{ color: 'var(--dt-muted)' }} />
        <input placeholder={locale === 'ko' ? '도구 이름 또는 설명 검색…' : 'Search tools…'} />
      </div>
      <div className="filter-bar">
        <div className="seg">
          {cats.map((c) => (
            <button key={c} className={filter === c ? 'on' : ''} onClick={() => setFilter(c)}>
              {c === 'all' ? (locale === 'ko' ? '전체' : 'All') : (CAT_LABEL[c] ?? c)}
            </button>
          ))}
        </div>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--dt-muted)', fontFamily: 'var(--dt-font-mono)' }}>{shown.length} / {TOOLS.length}</span>
      </div>
      <div className="cat-results">
        {shown.map((t) => <ToolCard key={t.name} t={t} locale={locale} />)}
      </div>
    </>
  );
}

function Logs({ locale }) {
  const rows = [
    { t: '14:22:07', tool: 'weather_getVilageFcst', code: 200, ms: 142, client: 'claude' },
    { t: '14:21:55', tool: 'finance_getExchangeRate', code: 200, ms: 88, client: 'rest' },
    { t: '14:21:40', tool: 'transport_getBusArrival', code: 200, ms: 204, client: 'chatgpt' },
    { t: '14:20:12', tool: 'realestate_getRTMSData', code: 403, ms: 31, client: 'rest' },
    { t: '14:19:08', tool: 'weather_getUltraSrtNcst', code: 200, ms: 119, client: 'claude' },
    { t: '14:18:44', tool: 'health_getHospitalInfo', code: 500, ms: 5012, client: 'chatgpt' },
    { t: '14:18:02', tool: 'weather_getVilageFcst', code: 200, ms: 137, client: 'claude' },
  ];
  const codeColor = (c) => (c < 300 ? 'var(--dt-success)' : c < 500 ? 'var(--dt-warning)' : 'var(--dt-danger)');
  return (
    <>
      <div className="page-head">
        <div>
          <h1>{locale === 'ko' ? '실행 로그' : 'Execution logs'}</h1>
          <p>{locale === 'ko' ? '도구 호출, 지연, 오류를 실시간으로 추적합니다.' : 'Trace tool calls, latency, and errors live.'}</p>
        </div>
        <span className="chip chip-ok"><span className="dot" style={{ background: 'var(--dt-success)' }} />{locale === 'ko' ? '실시간 스트림' : 'live stream'}</span>
      </div>
      <div className="panel">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr>
              <th>{locale === 'ko' ? '시각' : 'Time'}</th>
              <th>{locale === 'ko' ? '도구' : 'Tool'}</th>
              <th>{locale === 'ko' ? '클라이언트' : 'Client'}</th>
              <th>{locale === 'ko' ? '상태' : 'Status'}</th>
              <th style={{ textAlign: 'right' }}>{locale === 'ko' ? '지연' : 'Latency'}</th>
            </tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 12, color: 'var(--dt-muted)' }}>{r.t}</td>
                  <td style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 12, color: 'var(--dt-ink)' }}>{r.tool}</td>
                  <td><span className="chip">{r.client}</span></td>
                  <td><span className="cell-status" style={{ color: codeColor(r.code) }}><span className="dot" style={{ background: codeColor(r.code) }} />{r.code}</span></td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--dt-font-mono)', fontSize: 12, color: r.ms > 1000 ? 'var(--dt-danger)' : 'var(--dt-muted-strong)' }}>{r.ms}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Placeholder({ title, locale }) {
  return (
    <>
      <div className="page-head"><div><h1>{title}</h1><p>{locale === 'ko' ? '이 화면은 데모 범위에 포함되지 않았습니다.' : 'This screen is outside the demo scope.'}</p></div></div>
      <div className="panel panel-pad" style={{ display: 'grid', placeItems: 'center', minHeight: 220, gap: 10, textAlign: 'center' }}>
        <span className="nav-item-ico" style={{ width: 44, height: 44 }}><CIcon name="LayoutDashboard" size={20} /></span>
        <p style={{ color: 'var(--dt-muted)', fontSize: 13, maxWidth: 320 }}>{locale === 'ko' ? '대시보드 · 정부 API · 실행 로그 화면이 구현되어 있습니다. 사이드바에서 전환해 보세요.' : 'Dashboard, Government APIs, and Logs are implemented. Switch from the sidebar.'}</p>
      </div>
    </>
  );
}

const TITLES = { guide: '가이드', marketplace: '마켓플레이스', tools: '도구 목록', presets: '연동 카탈로그', register: 'API 등록', usage: '사용량', servers: '서버 상태', apikeys: 'API 키', settings: '계정 설정' };

function App() {
  const [active, setActive] = useCS('dashboard');
  const [theme, setTheme] = useCS('light');
  const [locale, setLocale] = useCS('ko');
  useCE(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  let view;
  if (active === 'dashboard') view = <CDashboard locale={locale} />;
  else if (active === 'government') view = <Catalog locale={locale} />;
  else if (active === 'logs') view = <Logs locale={locale} />;
  else view = <Placeholder title={TITLES[active] ?? active} locale={locale} />;

  return (
    <div className="console">
      <CSidebar active={active} onNav={setActive} theme={theme}
        onTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        locale={locale} onLocale={() => setLocale((l) => (l === 'ko' ? 'en' : 'ko'))} />
      <main className="main">
        <div className="main-inner">
          <div className="gw-strip">
            <span className="dot" style={{ background: 'var(--dt-success)' }} />
            <span className="lbl">Gateway</span>
            <span className="val">https://api.datari.kr</span>
          </div>
          {view}
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
