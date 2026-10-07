import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Alert,
  Button,
  DSLocaleProvider,
  Field,
  LogRow,
  Select,
  Sidebar,
  StatTile,
  Table,
  Textarea,
  UsageMeter,
} from '@bridger-kr/react';
import '@bridger-kr/react/styles.css';
import '@bridger-kr/tokens/css';
import './showcase.css';

/**
 * Release-gate matrix harness (DS #31). Renders real shipped components in
 * every contract state so the Playwright matrix can screenshot + assert each
 * viewport × theme × locale cell. ?theme=dark|light and ?locale=ko|en pin
 * the cell without any click-through.
 */
const params = new URLSearchParams(window.location.search);
const theme = params.get('theme') === 'dark' ? 'dark' : 'light';
const locale = params.get('locale') === 'en' ? 'en' : 'ko';

const NAV = [
  {
    heading: '콘솔',
    items: [
      { label: '홈', href: '#home', active: true },
      { label: '사용량', href: '#usage' },
      { label: '매우 긴 메뉴 이름으로 잘림 없이 표시되는지 확인하는 항목', href: '#long' },
    ],
  },
];

const ROWS = [
  { name: 'weather_getVilageFcst', calls: '1,204', status: '정상' },
  { name: 'realestate_getRTMSData', calls: '312', status: '경고' },
];

function Matrix() {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, []);

  return (
    <DSLocaleProvider locale={locale}>
      <main className="harness" data-matrix="root">
        <section data-matrix="button" className="harness-section">
          <h2>Button</h2>
          <div className="harness-row">
            <Button>기본</Button>
            <Button variant="secondary">보조</Button>
            <Button tone="danger">위험</Button>
            <Button loading>저장 중</Button>
            <Button disabled>비활성</Button>
          </div>
        </section>

        <section data-matrix="stat-tile" className="harness-section">
          <h2>StatTile</h2>
          <div className="harness-grid">
            <StatTile label="일일 호출" value="1,204" delta="+8.4%" deltaDirection="up" deltaValence="positive" />
            <StatTile label="오류율" value="0.4%" delta="-0.2%p" deltaDirection="down" deltaValence="positive" />
            <StatTile label="지연" value="182ms" delta="+12ms" deltaDirection="up" deltaValence="negative" />
            <StatTile label="월간 한도" value="0" state="error" reason="API 502" />
          </div>
        </section>

        <section data-matrix="usage-meter" className="harness-section">
          <h2>UsageMeter</h2>
          <UsageMeter label="일일 호출" value={420} max={1000} unit="req" limitSource="무료 체험" />
          <UsageMeter label="월간 호출" value={930} max={1000} unit="req" />
          <UsageMeter label="미확인 지표" max={1000} unit="req" />
        </section>

        <section data-matrix="table" className="harness-section">
          <h2>Table</h2>
          <Table
            columns={[
              { key: 'name', header: '도구' },
              { key: 'calls', header: '호출 수', align: 'right' },
              { key: 'status', header: '상태' },
            ]}
            rows={ROWS}
            state="partial"
            asOf="12:00"
            source="publicdata_federation"
          />
          <Table columns={[{ key: 'name', header: '도구' }]} rows={[]} state="loading" />
        </section>

        <section data-matrix="logrow" className="harness-section">
          <h2>LogRow</h2>
          <LogRow
            entries={[
              { time: '12:00:01', level: 'ok', tool: 'weather_getVilageFcst', latency: '142ms' },
              { time: '12:00:02', level: 'warn', tool: 'realestate_getRTMSData', latency: '890ms' },
              { time: '12:00:03', level: 'error', tool: 'bok_statSearch', message: 'timeout' },
              { time: '12:00:04', level: 'info', tool: 'sync_tick', message: 'queued', href: '#trace-4' },
            ]}
          />
        </section>

        <section data-matrix="forms" className="harness-section">
          <h2>Forms</h2>
          <Field label="서비스키" hint="공공데이터 포털에서 발급">
            <input placeholder="kma-service-key" />
          </Field>
          <Field label="오류 상태" error="필수 항목이에요">
            <input defaultValue="" />
          </Field>
          <Field label="비고">
            <Textarea placeholder="메모" />
          </Field>
          <Select label="기관" value="kma" options={[{ value: 'kma', label: '기상청' }]} />
        </section>

        <section data-matrix="feedback" className="harness-section">
          <h2>Alert</h2>
          <Alert tone="warning" title="일부 데이터만 표시">publicdata_federation 응답이 지연되고 있어요.</Alert>
        </section>

        <section data-matrix="sidebar" className="harness-section">
          <h2>Sidebar</h2>
          <div className="harness-narrow">
            <Sidebar sections={NAV} />
          </div>
        </section>
      </main>
    </DSLocaleProvider>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('release-harness root missing');
createRoot(rootElement).render(<Matrix />);
