/* Bridger landing — part 2: convergence + Stripe-style tabbed code integration */

const { Icon, BrandMark } = window.LandingParts1;
const { useState: useState2 } = React;

/* ── Convergence: scattered agencies → one gateway → AI + servers ── */
const SOURCES = [
  { name: '기상청', sub: 'KMA · 날씨', logo: '../../../assets/agency-logos/kma.svg' },
  { name: '국토교통부', sub: 'MOLIT · 부동산·교통', logo: '../../../assets/agency-logos/molit.svg' },
  { name: '한국은행', sub: 'BOK · 금융', logo: '../../../assets/agency-logos/bok.svg' },
  { name: '서울특별시', sub: 'Seoul · 행정', logo: '../../../assets/agency-logos/seoul.svg' },
  { name: '공공데이터포털', sub: 'data.go.kr', logo: '../../../assets/agency-logos/gov.svg' },
];
const TARGETS = [
  { name: 'Claude', sub: 'MCP 커넥터', icon: 'Bot', tone: 'var(--dt-accent)' },
  { name: 'ChatGPT', sub: 'Remote MCP', icon: 'MessageSquare', tone: 'var(--dt-success)' },
  { name: 'REST 서버', sub: 'api.datari.kr', icon: 'Server', tone: 'var(--dt-cobalt)' },
];

function Convergence({ locale }) {
  return (
    <section className="section">
      <div className="dt-shell">
        <div className="section-head">
          <h2>{locale === 'ko' ? '흩어진 공공데이터를 하나의 연결로' : 'Scattered public data, one connection'}</h2>
          <p>{locale === 'ko'
            ? '부처마다 다른 인증·포맷·엔드포인트를 브릿저가 흡수합니다. 서비스키는 게이트웨이에서 보호되고, 응답은 정규화되어 도착합니다.'
            : 'Bridger absorbs the per-agency auth, formats, and endpoints. Keys stay protected in the gateway; responses arrive normalized.'}</p>
        </div>
        <div className="converge">
          <div className="source-stack">
            {SOURCES.map((s) => (
              <div className="source" key={s.name}>
                <img src={s.logo} alt="" />
                <div style={{ minWidth: 0 }}>
                  <div className="s-name">{s.name}</div>
                  <div className="s-sub">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="converge-core">
            <div className="ring"><Icon name="Network" size={26} strokeWidth={1.8} /></div>
            <BrandMark size={20} />
            <span className="badge badge-accent">{locale === 'ko' ? '정규화 · 키 보호' : 'normalized · keys safe'}</span>
          </div>
          <div className="target-stack">
            {TARGETS.map((t) => (
              <div className="source" key={t.name}>
                <span className="cat-icon" style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--dt-surface-raised)', color: t.tone }}>
                  <Icon name={t.icon} size={17} />
                </span>
                <div style={{ minWidth: 0 }}>
                  <div className="s-name">{t.name}</div>
                  <div className="s-sub">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Stripe-style tabbed integration code block ──
   Each line is an array of [text, type] segments.
   types: ink | com | str | num | key | punc | meth */
const CODE_TABS = [
  { id: 'mcp', label: 'MCP · JSON-RPC' },
  { id: 'rest', label: 'REST · curl' },
  { id: 'claude', label: 'Claude 커넥터' },
];
const T = (text, type = 'ink') => [text, type];
const CODE = {
  mcp: [
    [T('// mcp.datari.kr/mcp — tools/call', 'com')],
    [T('POST ', 'meth'), T('/mcp')],
    [T('{', 'punc')],
    [T('  "jsonrpc"', 'key'), T(': '), T('"2.0"', 'str'), T(',')],
    [T('  "method"', 'key'), T(': '), T('"tools/call"', 'str'), T(',')],
    [T('  "params"', 'key'), T(': '), T('{', 'punc')],
    [T('    "name"', 'key'), T(': '), T('"weather_getVilageFcst"', 'str'), T(',')],
    [T('    "arguments"', 'key'), T(': { '), T('"nx"', 'key'), T(': '), T('60', 'num'), T(', '), T('"ny"', 'key'), T(': '), T('127', 'num'), T(' }')],
    [T('  }', 'punc')],
    [T('}', 'punc')],
  ],
  rest: [
    [T('# api.datari.kr — managed key injected by gateway', 'com')],
    [T('curl ', 'meth'), T('https://api.datari.kr/v1/weather/vilage-fcst', 'str'), T(' \\')],
    [T('  -H ', 'ink'), T('"Authorization: Bearer $DATARI_KEY"', 'str'), T(' \\')],
    [T('  -G --data-urlencode ', 'ink'), T('"nx=60"', 'str'), T(' \\')],
    [T('     --data-urlencode ', 'ink'), T('"ny=127"', 'str')],
    [T('')],
    [T('# → 200 OK · normalized JSON · 142ms', 'com')],
  ],
  claude: [
    [T('// ~/.claude/connectors — remote MCP', 'com')],
    [T('{', 'punc')],
    [T('  "bridger"', 'key'), T(': '), T('{', 'punc')],
    [T('    "url"', 'key'), T(': '), T('"https://mcp.datari.kr/mcp"', 'str'), T(',')],
    [T('    "transport"', 'key'), T(': '), T('"sse"', 'str')],
    [T('  }', 'punc')],
    [T('}', 'punc')],
    [T('')],
    [T('// 승인된 도구만 노출됩니다', 'com')],
  ],
};
const TOK_COLOR = {
  ink: '#e8e6df', com: '#7c8699', str: '#7ee0a3',
  num: '#8ab4ff', key: '#fbbf6b', punc: '#9aa3b2',
  meth: '#fb923c',
};

function IntegrationSection({ locale }) {
  const [tab, setTab] = useState2('mcp');
  const lines = CODE[tab];
  return (
    <section className="section section-tint">
      <div className="dt-shell">
        <div className="integration-grid">
          <div>
            <h2 style={{ fontSize: 'clamp(26px,3.2vw,36px)', letterSpacing: '-0.035em', whiteSpace: 'pre-line' }}>
              {locale === 'ko' ? 'AI에는 MCP로,\n서버에는 REST로.' : 'MCP for AI,\nREST for servers.'}
            </h2>
            <p style={{ marginTop: 14, color: 'var(--dt-muted-strong)', fontSize: 16, lineHeight: 1.6, maxWidth: 420 }}>
              {locale === 'ko'
                ? '하나의 게이트웨이가 두 인터페이스를 동시에 제공합니다. 서비스키 주입, 응답 정규화, 감사 로그는 공통입니다.'
                : 'One gateway serves both interfaces at once. Key injection, response normalization, and audit logs are shared.'}
            </p>
            <ul style={{ marginTop: 24, display: 'grid', gap: 12, listStyle: 'none', padding: 0 }}>
              {(locale === 'ko'
                ? ['서비스키는 게이트웨이에서만 보관', '승인된 도구만 클라이언트에 노출', '모든 호출은 실행 로그로 추적']
                : ['Keys live only in the gateway', 'Only approved tools reach clients', 'Every call is traced in logs']).map((t) => (
                <li key={t} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 14, color: 'var(--dt-ink)' }}>
                  <span style={{ color: 'var(--dt-accent)', display: 'inline-flex' }}><Icon name="Check" size={16} strokeWidth={2.6} /></span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="code-card">
            <div className="code-tabs">
              {CODE_TABS.map((c) => (
                <button key={c.id} className={`code-tab${tab === c.id ? ' active' : ''}`} onClick={() => setTab(c.id)}>{c.label}</button>
              ))}
            </div>
            <pre className="code-body"><code>
              {lines.map((segs, li) => (
                <div className="code-line" key={li}>
                  {segs.map(([text, type], si) => (
                    <span key={si} style={{ color: TOK_COLOR[type] || TOK_COLOR.ink }}>{text}</span>
                  ))}
                </div>
              ))}
            </code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}

window.LandingParts2 = { Convergence, IntegrationSection };
