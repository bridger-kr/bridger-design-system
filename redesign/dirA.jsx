// Direction A — Editorial Grid. Exports DirA_Hero, DirA_Sheet to window.
const DirA_Hero = () => (
  <div className="dir dirA">
    <div className="frame">
      <div className="nav">
        <div className="wordmark">Bridger<span className="dot">.</span></div>
        <nav className="navlinks">
          <span className="on">제품</span><span>도구</span><span>예시</span><span>가이드</span>
        </nav>
        <div className="navmeta">portal.datari.kr</div>
      </div>
      <div className="hero">
        <div className="hero-l">
          <div>
            <div className="idx"><span>공공데이터 게이트웨이</span><b>001 / 04</b></div>
            <h1 className="disp">어려운<br/>공공 API를<br/><span className="mark">하나로</span> 잇다</h1>
            <p className="lede">OpenAPI 스펙을 MCP·REST로 연결하고, 서비스키와 응답 정규화를 한곳에서 관리합니다.</p>
            <div className="cta-row">
              <button className="btn-a solid">콘솔 시작하기 →</button>
              <button className="btn-a plain">가이드 보기</button>
            </div>
          </div>
          <div className="footnums">
            <div><div className="n tnum">230+</div><div className="k">연동 API</div></div>
            <div><div className="n tnum">14</div><div className="k">데이터 분야</div></div>
            <div><div className="n">MCP·REST</div><div className="k">두 프로토콜</div></div>
          </div>
        </div>
        <div className="hero-r">
          <div className="rhead"><span className="t">연동 카탈로그</span><span className="c">data.go.kr</span></div>
          {[
            ['01','기상청 단기예보','weather_getVilageFcst','ok','선택됨'],
            ['02','국토교통부 실거래가','molit_rtMng','run','실행중'],
            ['03','한국은행 ECOS','bok_statSearch','ok','선택됨'],
            ['04','서울 실시간 도시데이터','seoul_citydata','ok','선택됨'],
            ['05','공공데이터포털 검색','gov_dataSearch','run','실행중'],
            ['06','도로교통공단 사고정보','koroad_accident','ok','선택됨'],
          ].map(([ix,nm,id,st,lab]) => (
            <div className="arow" key={ix}>
              <span className="ix">{ix}</span>
              <span className="nm">{nm}<small>{id}</small></span>
              <span className="st"><i className={`dot ${st}`}></i>{lab}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DirA_Sheet = () => (
  <div className="dir dirA">
    <div className="sheet">
      <div className="sh-head">
        <h2>시스템 명세 · Editorial Grid</h2>
        <span className="cap">A · hairline / 0 radius / no shadow</span>
      </div>
      <div className="sh-grid">
        <div className="cell br">
          <div className="lbl"><span>TYPOGRAPHY</span><b>위계</b></div>
          <div className="typerow"><span className="sz">78 / 850</span><span className="ex" style={{fontSize:'30px',fontWeight:850,letterSpacing:'-0.04em'}}>공공 API를 잇다</span></div>
          <div className="typerow"><span className="sz">26 / 800</span><span className="ex" style={{fontSize:'20px',fontWeight:800,letterSpacing:'-0.03em'}}>연결 상태 점검</span></div>
          <div className="typerow"><span className="sz">16 / 600</span><span className="ex" style={{fontSize:'15px',fontWeight:600}}>최근 파이프라인</span></div>
          <div className="typerow"><span className="sz">14 / 400</span><span className="ex" style={{fontSize:'13.5px',color:'var(--muted-x)'}}>게이트웨이 응답 정규화</span></div>
          <div className="typerow"><span className="sz">MONO 12</span><span className="ex mono" style={{fontSize:'12px',color:'var(--muted)'}}>service_key · GET /v1</span></div>
        </div>
        <div className="cell">
          <div className="lbl"><span>COLOR</span><b>팔레트 유지</b></div>
          <div className="swatches">
            <div className="sw" style={{background:'#ec5e1f'}}>#ec5e1f</div>
            <div className="sw" style={{background:'#d24e13'}}>#d24e13</div>
            <div className="sw" style={{background:'#1b1a16'}}>#1b1a16</div>
            <div className="sw l" style={{background:'#f4f3ef'}}>#f4f3ef</div>
            <div className="sw l" style={{background:'#fcfbf9',boxShadow:'inset 0 0 0 1px var(--line-x)'}}>paper</div>
          </div>
          <div className="badgeset" style={{marginTop:'18px'}}>
            <span className="bdg ac">PERSIMMON</span><span className="bdg ok">SUCCESS</span>
            <span className="bdg wr">WARNING</span><span className="bdg">NEUTRAL</span>
          </div>
        </div>
        <div className="cell br">
          <div className="lbl"><span>CONTROLS</span><b>샤프</b></div>
          <div className="btnset">
            <span style={{display:'inline-flex',border:'1px solid var(--ink-x)'}}>
              <button className="btn-a solid" style={{height:'40px',fontSize:'13px'}}>키 등록</button>
              <button className="btn-a plain" style={{height:'40px',fontSize:'13px'}}>로그 열기</button>
            </span>
            <button className="btn-a" style={{height:'40px',fontSize:'13px',background:'var(--sunken)',color:'var(--ink-x)'}}>재시도</button>
          </div>
          <div className="badgeset" style={{marginTop:'16px'}}>
            <span className="bdg ac">MCP</span><span className="bdg">REST</span><span className="bdg">GET</span><span className="bdg">SSE</span>
          </div>
        </div>
        <div className="cell" style={{borderBottom:'none'}}>
          <div className="lbl"><span>DATA + CODE</span><b>밀도</b></div>
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

Object.assign(window, { DirA_Hero, DirA_Sheet });
