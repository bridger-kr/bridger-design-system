// Assembles the comparison canvas. Components come from window (dirA/B/C.jsx).
const { DesignCanvas, DCSection, DCArtboard } = window;

const HERO_W = 1280, HERO_H = 760;
const SHEET_W = 1280, SHEET_H = 880;

function App() {
  return (
    <DesignCanvas>
      <DCSection id="dirA" title="A · Editorial Grid" subtitle="헤어라인 룰 + 0 라운드 + 그림자 0. 타이포가 주인공, 감색은 외과적으로.">
        <DCArtboard id="a-hero" label="A · 랜딩 히어로" width={HERO_W} height={HERO_H}><DirA_Hero /></DCArtboard>
        <DCArtboard id="a-sheet" label="A · 시스템 명세" width={SHEET_W} height={SHEET_H}><DirA_Sheet /></DCArtboard>
      </DCSection>

      <DCSection id="dirB" title="B · Instrument" subtitle="모노 중심 계기판. 보더 셀 그리드, 탭ular 수치, 라이브 상태. 감색 = 활성/실행.">
        <DCArtboard id="b-hero" label="B · 랜딩 히어로" width={HERO_W} height={HERO_H}><DirB_Hero /></DCArtboard>
        <DCArtboard id="b-sheet" label="B · 시스템 명세" width={SHEET_W} height={SHEET_H}><DirB_Sheet /></DCArtboard>
      </DCSection>

      <DCSection id="dirC" title="C · Bold Blocks" subtitle="컬러 블로킹(잉크블랙 + 감색 + 페이퍼). 포스터급 타이포, 극단적 위계 대비.">
        <DCArtboard id="c-hero" label="C · 랜딩 히어로" width={HERO_W} height={HERO_H}><DirC_Hero /></DCArtboard>
        <DCArtboard id="c-sheet" label="C · 시스템 명세" width={SHEET_W} height={SHEET_H}><DirC_Sheet /></DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
