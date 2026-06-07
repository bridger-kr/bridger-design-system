/* Bridger Console — sidebar, shell, dashboard overview */
const { useState, useEffect, useRef } = React;

function Icon({ name, size = 16, strokeWidth = 1.9, style }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide && window.lucide[name]) {
      const el = window.lucide.createElement(window.lucide[name]);
      el.setAttribute('width', size); el.setAttribute('height', size); el.setAttribute('stroke-width', strokeWidth);
      ref.current.innerHTML = ''; ref.current.appendChild(el);
    }
  }, [name, size, strokeWidth]);
  return <span ref={ref} style={{ display: 'inline-flex', ...style }} aria-hidden="true" />;
}

function BrandMark({ size = 20 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', fontFamily: 'var(--dt-font-sans)', fontWeight: 780, fontSize: size, letterSpacing: '-0.025em', color: 'var(--dt-ink-strong)', lineHeight: 1, userSelect: 'none' }} aria-label="Bridger">
      Bridger<span style={{ color: 'var(--dt-accent)' }}>.</span>
    </span>
  );
}

const NAV = [
  { label: '개요', items: [
    { id: 'dashboard', label: '대시보드', icon: 'LayoutDashboard' },
    { id: 'guide', label: '가이드', icon: 'BookOpen' },
  ]},
  { label: '도구 관리', items: [
    { id: 'marketplace', label: '마켓플레이스', icon: 'Store' },
    { id: 'tools', label: '도구 목록', icon: 'Wrench' },
    { id: 'presets', label: '연동 카탈로그', icon: 'Boxes' },
    { id: 'government', label: '정부 API', icon: 'LibraryBig' },
    { id: 'register', label: 'API 등록', icon: 'PlusCircle' },
  ]},
  { label: '모니터링', items: [
    { id: 'usage', label: '사용량', icon: 'Gauge' },
    { id: 'servers', label: '서버 상태', icon: 'Server' },
    { id: 'logs', label: '실행 로그', icon: 'FileClock' },
  ]},
  { label: '설정', items: [
    { id: 'apikeys', label: 'API 키', icon: 'KeyRound' },
    { id: 'settings', label: '계정 설정', icon: 'Settings' },
  ]},
];

function Sidebar({ active, onNav, theme, onTheme, locale, onLocale }) {
  return (
    <aside className="side">
      <div className="side-head">
        <div className="side-head-top">
          <div>
            <BrandMark size={20} />
            <div className="side-sub">{locale === 'ko' ? '운영 콘솔' : 'Operations console'}</div>
          </div>
          <div className="side-toggles">
            <button className="icon-btn-sm" style={{ width: 'auto', padding: '0 10px', fontFamily: 'var(--dt-font-mono)', fontSize: 11, fontWeight: 700 }} onClick={onLocale}>{locale === 'ko' ? 'EN' : '한'}</button>
            <button className="icon-btn-sm" onClick={onTheme} aria-label="테마"><Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={16} /></button>
          </div>
        </div>
        <div className="side-stream">
          <div style={{ minWidth: 0 }}>
            <div className="side-stream-label">{locale === 'ko' ? '실시간 연결' : 'Live stream'}</div>
            <div className="side-stream-val">{locale === 'ko' ? '실시간 연결 정상' : 'Connected'}</div>
          </div>
          <span className="chip chip-ok"><span className="dot" style={{ background: 'var(--dt-success)' }} />{locale === 'ko' ? '실시간' : 'live'}</span>
        </div>
      </div>
      <nav className="side-nav">
        {NAV.map((g) => (
          <div key={g.label}>
            <div className="nav-group-label">{g.label}</div>
            <div style={{ display: 'grid', gap: 4 }}>
              {g.items.map((it) => (
                <button key={it.id} className={`nav-item${active === it.id ? ' active' : ''}`} onClick={() => onNav(it.id)}>
                  <span className="nav-item-ico"><Icon name={it.icon} size={15} /></span>
                  <span style={{ flex: 1 }}>{it.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="side-foot">
        <button className="cbtn-ghost" style={{ width: '100%', justifyContent: 'flex-start', fontSize: 12 }}>
          <Icon name="LogOut" size={15} />{locale === 'ko' ? '로그아웃' : 'Sign out'}
        </button>
      </div>
    </aside>
  );
}

/* ── Dashboard overview ── */
function Dashboard({ locale }) {
  const stats = [
    { label: locale === 'ko' ? '연결된 서버' : 'Servers', value: '12', hint: locale === 'ko' ? '정상 11 · 점검 1' : '11 ok · 1 check', dot: 'var(--dt-success)' },
    { label: locale === 'ko' ? '노출 도구' : 'Tools', value: '248', hint: locale === 'ko' ? '선택 86 · 구성 162' : '86 selected', dot: 'var(--dt-accent)' },
    { label: locale === 'ko' ? '오늘 호출' : 'Calls today', value: '34.2K', hint: locale === 'ko' ? '+8.4% 전일 대비' : '+8.4% vs. yesterday', dot: 'var(--dt-cobalt)' },
    { label: locale === 'ko' ? '평균 지연' : 'p50 latency', value: '142ms', hint: locale === 'ko' ? '정상 범위' : 'within range', dot: 'var(--dt-success)' },
  ];
  const jobs = [
    { name: '기상청 단기예보 조회서비스', id: 'kma/vilage-fcst', status: 'success', t: '2분 전' },
    { name: '국토교통부 실거래가 조회', id: 'molit/rtms-trade', status: 'running', t: '5분 전' },
    { name: '한국은행 환율 통계', id: 'bok/exchange-rate', status: 'success', t: '21분 전' },
    { name: '서울시 따릉이 실시간', id: 'seoul/bike-live', status: 'failed', t: '1시간 전' },
    { name: '식약처 의약품 정보', id: 'mfds/drug-info', status: 'success', t: '3시간 전' },
  ];
  const statusColor = { success: 'var(--dt-success)', running: 'var(--dt-info)', failed: 'var(--dt-danger)' };
  return (
    <>
      <div className="page-head">
        <div>
          <h1>{locale === 'ko' ? '대시보드' : 'Dashboard'}</h1>
          <p>{locale === 'ko' ? '게이트웨이 연결 상태와 최근 운영 작업.' : 'Gateway status and recent operations.'}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="cbtn-sec"><Icon name="RefreshCw" size={15} />{locale === 'ko' ? '새로고침' : 'Refresh'}</button>
          <button className="cbtn"><Icon name="PlusCircle" size={15} />{locale === 'ko' ? 'API 등록' : 'Register API'}</button>
        </div>
      </div>

      <div className="workbench">
        <div className="wb-copy">
          <div>
            <div className="wb-title">{locale === 'ko' ? '공공 API를 도구로 만드세요' : 'Turn a public API into tools'}</div>
            <p className="wb-desc">{locale === 'ko' ? 'OpenAPI 스펙을 가져와 MCP 도구로 변환하고, 서비스키를 검증한 뒤 승인된 도구만 노출합니다.' : 'Import an OpenAPI spec, convert it to MCP tools, validate the key, and expose only approved tools.'}</p>
          </div>
          <div className="wb-actions">
            <button className="cbtn"><Icon name="Wrench" size={15} />{locale === 'ko' ? '도구 만들기' : 'Build tools'}</button>
            <button className="cbtn-sec"><Icon name="BookOpen" size={15} />{locale === 'ko' ? '가이드' : 'Guide'}</button>
          </div>
          <div className="wb-chips">
            <span className="chip chip-ok"><Icon name="Check" size={12} strokeWidth={2.6} />{locale === 'ko' ? '키 검증됨' : 'key valid'}</span>
            <span className="chip"><Icon name="Boxes" size={12} />{locale === 'ko' ? '프리셋 230+' : '230+ presets'}</span>
            <span className="chip chip-warn"><Icon name="AlertTriangle" size={12} />{locale === 'ko' ? '점검 1' : '1 check'}</span>
          </div>
        </div>
        <div className="wb-screen">
          <div className="wb-screen-head"><span>{locale === 'ko' ? '게이트웨이 점검' : 'gateway probe'}</span><span className="term-ok">● 200</span></div>
          <div className="terminal">
            <div className="terminal-bar"><span>datari · mcp probe</span><span>sse</span></div>
            <pre><span className="term-mut">$</span> bridger probe <span className="term-acc">--tool</span> weather_getVilageFcst{'\n'}<span className="term-mut">→ resolving service key…</span> <span className="term-ok">ok</span>{'\n'}<span className="term-mut">→ GET /v1/weather/vilage-fcst</span>{'\n'}<span className="term-mut">→ normalize · 142ms</span> <span className="term-ok">200 OK</span>{'\n'}<span className="term-acc">✓ tool ready</span> · req_8a72f1c0</pre>
          </div>
        </div>
      </div>

      <div className="stat-row">
        {stats.map((s) => (
          <div className="stat-cell" key={s.label}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-hint"><span className="dot" style={{ background: s.dot }} />{s.hint}</div>
          </div>
        ))}
      </div>

      <SemanticSearch locale={locale} />

      <div className="panel">
        <div className="panel-head">
          <div>
            <div className="panel-title">{locale === 'ko' ? '최근 파이프라인' : 'Recent pipelines'}</div>
            <div className="panel-desc">{locale === 'ko' ? '등록과 검증 작업 상태.' : 'Registration and validation jobs.'}</div>
          </div>
        </div>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr>
              <th>{locale === 'ko' ? '작업' : 'Job'}</th>
              <th>{locale === 'ko' ? '상태' : 'Status'}</th>
              <th style={{ textAlign: 'right' }}>{locale === 'ko' ? '업데이트' : 'Updated'}</th>
            </tr></thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id}>
                  <td><div className="cell-name">{j.name}</div><div className="cell-id">{j.id}</div></td>
                  <td><span className="cell-status"><span className="dot" style={{ background: statusColor[j.status] }} />{j.status}</span></td>
                  <td style={{ textAlign: 'right', color: 'var(--dt-muted)', fontSize: 12 }}>{j.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function SemanticSearch({ locale }) {
  return (
    <div className="search-panel">
      <div className="panel-title" style={{ marginBottom: 14 }}>{locale === 'ko' ? '필요한 공공 API를 질문으로 찾기' : 'Find a public API by asking'}</div>
      <div className="search-bar">
        <Icon name="Search" size={16} style={{ color: 'var(--dt-muted)' }} />
        <input defaultValue={locale === 'ko' ? '주말 서울 날씨 예보 데이터' : 'weekend Seoul weather forecast'} />
        <button className="cbtn" style={{ padding: '7px 14px' }}><Icon name="Sparkles" size={14} />{locale === 'ko' ? '검색' : 'Search'}</button>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(locale === 'ko' ? ['기상청 단기예보', '초단기실황', '중기예보'] : ['KMA forecast', 'nowcast', 'mid-term']).map((t) => (
          <span className="chip" key={t}><Icon name="LibraryBig" size={12} />{t}</span>
        ))}
      </div>
    </div>
  );
}

window.ConsoleParts = { Icon, BrandMark, Sidebar, Dashboard };
