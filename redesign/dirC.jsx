// Direction C — Bold Blocks. Exports DirC_Hero, DirC_Sheet to window.
const DirC_Hero = () => (
  <div className="dir dirC">
    <div className="nav">
      <div className="wordmark">Bridger<span className="dot">.</span></div>
      <nav className="navlinks"><span>제품</span><span>도구</span><span>예시</span><span>가이드</span></nav>
      <a className="navcta">콘솔 열기</a>
    </div>
    <div className="hero">
      <div className="block">
        <div className="tagline">공공데이터 OpenAPI → MCP · REST</div>
        <h1 className="disp">어려운 공공 API를<br/><span className="o">하나로</span> 잇다</h1>
        <p className="lede">OpenAPI 스펙을 MCP·REST로 연결하고, 서비스키와 응답 정규화를 한곳에서 관리합니다.</p>
        <div className="cta-row">
          <button className="btn-c solid">콘솔 시작하기 →</button>
          <button className="btn-c ghost">가이드 보기</button>
        </div>
        <div className="bignum tnum">230</div>
      </div>
      <div className="strip">
        <div><div className="n tnum">230+</div><div className="k">연동 API</div></div>
        <div><div className="n tnum">14</div><div className="k">데이터 분야</div></div>
        <div><div className="n">MCP·REST</div><div className="k">두 프로토콜</div></div>
        <div><div className="n">100회/일</div><div className="k">무료 한도</div></div>
      </div>
    </div>
  </div>
);

const DirC_Sheet = () => (
  <div className="dir dirC">
    <div className="sheet">
      <div className="sh-head">
        <h2>시스템 명세<span className="dot">.</span></h2>
        <span className="cap">C · bold blocks / 4px radius / no shadow</span>
      </div>
      <div className="sh-grid">
        <div className="cell br">
          <div className="clbl">TYPOGRAPHY — 극단적 위계 대비</div>
          <div className="typerow"><span className="sz">92 / 880</span><span className="ex" style={{fontSize:'34px',fontWeight:880,letterSpacing:'-0.05em'}}>하나로 잇다</span></div>
          <div className="typerow"><span className="sz">30 / 850</span><span className="ex" style={{fontSize:'22px',fontWeight:850,letterSpacing:'-0.035em'}}>연결 상태 점검</span></div>
          <div className="typerow"><span className="sz">17 / 400</span><span className="ex" style={{fontSize:'15px',color:'var(--muted-x)'}}>응답 정규화를 한곳에서</span></div>
          <div className="typerow"><span className="sz">MONO 12</span><span className="ex mono" style={{fontSize:'12px',color:'var(--muted)'}}>service_key · GET /v1</span></div>
        </div>
        <div className="cell">
          <div className="clbl">COLOR — 블록으로 사용</div>
          <div className="swrow">
            <div className="sw" style={{background:'#ec5e1f'}}>#ec5e1f</div>
            <div className="sw" style={{background:'#1b1a16'}}>#1b1a16</div>
            <div className="sw l" style={{background:'#f4f3ef'}}>#f4f3ef</div>
            <div className="sw l" style={{background:'#fbfaf8',boxShadow:'inset 0 0 0 1px var(--line)'}}>paper</div>
          </div>
          <div className="badgeset" style={{marginTop:'18px'}}>
            <span className="bdg ac">PERSIMMON</span><span className="bdg ok">SUCCESS</span>
            <span className="bdg wr">WARNING</span><span className="bdg">NEUTRAL</span>
          </div>
        </div>
        <div className="cell br">
          <div className="clbl">CONTROLS — 청키하고 대담하게</div>
          <div className="btnset">
            <button className="btn-c solid" style={{height:'44px',fontSize:'14px'}}>키 등록</button>
            <button className="btn-c" style={{height:'44px',fontSize:'14px',background:'var(--ink-x)',color:'#fff'}}>로그 열기</button>
            <button className="btn-c" style={{height:'44px',fontSize:'14px',background:'var(--sunken)',color:'var(--ink-x)'}}>재시도</button>
          </div>
          <div className="badgeset" style={{marginTop:'16px'}}>
            <span className="bdg ac">MCP</span><span className="bdg">REST</span><span className="bdg">GET</span><span className="bdg">SSE</span>
          </div>
        </div>
        <div className="cell" style={{borderBottom:'none'}}>
          <div className="clbl">DATA — 강한 헤더 룰</div>
          <table className="minitable">
            <thead><tr><th>도구</th><th>분야</th><th style={{textAlign:'right'}}>호출/일</th></tr></thead>
            <tbody>
              <tr><td>기상청 단기예보</td><td>날씨</td><td className="r">1,284</td></tr>
              <tr><td>실거래가 조회</td><td>부동산</td><td className="r">932</td></tr>
              <tr><td>ECOS 통계</td><td>경제</td><td className="r">418</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { DirC_Hero, DirC_Sheet });
