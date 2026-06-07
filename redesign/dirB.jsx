// Direction B — Instrument. Exports DirB_Hero, DirB_Sheet to window.
const DirB_Hero = () => (
  <div className="dir dirB">
    <div className="panel">
      <div className="topbar">
        <div className="tb-l">
          <div className="wordmark">Bridger<span className="dot">.</span></div>
          <span className="tag">PUBLIC-DATA GATEWAY</span>
        </div>
        <div className="tb-r">
          <span className="live"><i className="pulse"></i>LIVE</span>
          <span>api.datari.kr</span>
        </div>
      </div>
      <div className="body">
        <div className="b-l">
          <div className="kicker">MCP 도입 전 API 운영 계층</div>
          <h1 className="disp">어려운 공공 API를<br/><em>하나로</em> 잇다</h1>
          <p className="lede">// OpenAPI 스펙을 MCP 도구로 변환.<br/>// 키는 게이트웨이에서 보호.<br/>// selected/configured 도구 상태 점검.</p>
          <div className="specrow">
            <div><div className="n tnum">230+</div><div className="k">연동 API</div></div>
            <div><div className="n tnum">14</div><div className="k">분야</div></div>
            <div><div className="n tnum">99.9%</div><div className="k">uptime</div></div>
          </div>
          <div className="cta-row">
            <button className="btn-b solid">콘솔 시작 →</button>
            <button className="btn-b plain">$ bridger init</button>
          </div>
        </div>
        <div className="readout">
          <div className="ro-head"><span>datari · mcp probe</span><span className="grn">● 200 OK</span></div>
          <div className="ro-body">
            <div><span className="g">$</span> <span className="c">bridger probe</span> <span className="o">--tool</span> weather_getVilageFcst</div>
            <div><span className="g">→</span> resolving service key… <span className="grn">ok</span></div>
            <div><span className="g">→</span> normalizing response… <span className="grn">ok</span></div>
            <div><span className="g">→</span> exposing as MCP tool… <span className="grn">ok</span></div>
            <div className="g">────────────────────────────</div>
            <div><span className="o">tool</span> <span className="c">weather.getVilageFcst</span></div>
            <div><span className="o">method</span> GET <span className="g">·</span> <span className="o">auth</span> gateway</div>
            <div><span className="g">$</span> <span className="c">_</span></div>
          </div>
          <div className="ro-foot">
            <span className="lab">latency</span><span className="val tnum">142ms</span>
            <span className="lab">tools selected</span><span className="val tnum">230 / 412</span>
            <span className="lab">free tier</span><span className="val">100회/일</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DirB_Sheet = () => (
  <div className="dir dirB">
    <div className="sheet">
      <div className="sh-head"><span className="t">SYSTEM SPEC · INSTRUMENT</span><span className="c">B · mono / cells / tabular</span></div>
      <div className="grid2">
        <div className="cell br">
          <div className="clbl">TYPOGRAPHY</div>
          <div className="typerow"><span className="sz">52 / 830</span><span className="ex" style={{fontSize:'26px',fontWeight:830,letterSpacing:'-0.04em'}}>하나로 잇다</span></div>
          <div className="typerow"><span className="sz">18 / 600</span><span className="ex" style={{fontSize:'16px',fontWeight:600}}>연결 상태</span></div>
          <div className="typerow"><span className="sz">MONO 12</span><span className="ex mono" style={{fontSize:'12px'}}>GET /v1/weather</span></div>
          <div className="typerow"><span className="sz">MONO 11</span><span className="ex mono" style={{fontSize:'11px',color:'var(--muted)'}}>req_8f2a · 142ms · tnum</span></div>
        </div>
        <div className="cell">
          <div className="clbl">COLOR</div>
          <div className="swrow">
            <div className="sw" style={{background:'#ec5e1f'}}>ec5e1f</div>
            <div className="sw" style={{background:'#1b1a16'}}>1b1a16</div>
            <div className="sw l" style={{background:'#f4f3ef'}}>f4f3ef</div>
            <div className="sw l" style={{background:'#fff'}}>fff</div>
          </div>
          <div className="badgeset" style={{marginTop:'14px'}}>
            <span className="bdg ac"><i className="d"></i>ACTIVE</span>
            <span className="bdg ok"><i className="d"></i>200 OK</span>
            <span className="bdg wr"><i className="d"></i>RETRY</span>
          </div>
        </div>
        <div className="cell br">
          <div className="clbl">CONTROLS</div>
          <div className="btnset">
            <button className="btn-b solid">키 등록</button>
            <button className="btn-b plain">$ 로그 열기</button>
            <button className="btn-b plain" style={{borderColor:'var(--line-x)',color:'var(--muted-x)'}}>재시도</button>
          </div>
          <div className="badgeset" style={{marginTop:'14px'}}>
            <span className="bdg">MCP</span><span className="bdg">REST</span><span className="bdg">GET</span><span className="bdg">SSE</span>
          </div>
        </div>
        <div className="cell" style={{borderBottom:'none'}}>
          <div className="clbl">DATA</div>
          <table className="minitable">
            <thead><tr><th>TOOL</th><th>FIELD</th><th className="r">REQ/D</th></tr></thead>
            <tbody>
              <tr><td>weather_getVilageFcst</td><td>날씨</td><td className="r">1,284</td></tr>
              <tr><td>molit_rtMng</td><td>부동산</td><td className="r">932</td></tr>
              <tr><td>bok_statSearch</td><td>경제</td><td className="r">418</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { DirB_Hero, DirB_Sheet });
