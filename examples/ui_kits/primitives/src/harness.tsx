import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Combobox, CommandPalette, Select } from '@bridger-kr/react';
import '@bridger-kr/react/styles.css';
import '@bridger-kr/tokens/css';

const SELECT_OPTIONS = [
  { value: 'kma', label: '기상청' },
  { value: 'molit', label: '국토교통부' },
  { value: 'bok', label: '한국은행' },
];

const COMBOBOX_OPTIONS = [
  { value: 'weather_getVilageFcst', label: '기상청 단기예보 조회서비스', meta: 'GET /v1/weather/vilage-fcst' },
  { value: 'realestate_getRTMSData', label: '국토부 실거래가', meta: 'GET /v1/realestate/rtms-trade' },
  { value: 'bok_statSearch', label: '한국은행 ECOS', meta: 'GET /v1/ecos/stat' },
];

const COMMAND_GROUPS = [
  {
    heading: '도구',
    items: [
      { label: 'weather_getVilageFcst', meta: '/v1/weather', shortcut: '↵' },
      { label: 'weather_getUltraSrtNcst', meta: '/v1/weather/ultra' },
    ],
  },
  {
    heading: '액션',
    items: [{ label: '새 API 등록', meta: 'action', shortcut: '⌘N' }],
  },
];

function Harness() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selVal, setSelVal] = useState('kma');
  const [cbVal, setCbVal] = useState('weather_getVilageFcst');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <main style={{ padding: '40px', display: 'grid', gap: '36px', maxWidth: '760px', fontFamily: 'var(--dt-font-sans)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 'var(--dt-h2-size)', margin: 0 }}>EDD-233 component CSS harness</h1>
        <Button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
          {theme === 'light' ? 'Dark 대비 보기' : 'Light 기본 보기'}
        </Button>
      </div>

      <section id="select-section">
        <h2 style={{ fontSize: 'var(--dt-h3-size)' }}>Select (trigger click → popup)</h2>
        <Select label="기관" value={selVal} onChange={setSelVal} options={SELECT_OPTIONS} />
      </section>

      <section id="combobox-section">
        <h2 style={{ fontSize: 'var(--dt-h3-size)' }}>Combobox (focus input → popup)</h2>
        <Combobox label="연동할 공공 API" value={cbVal} onChange={setCbVal} options={COMBOBOX_OPTIONS} hint="230+ API 검색" />
      </section>

      <section id="palette-section">
        <h2 style={{ fontSize: 'var(--dt-h3-size)' }}>CommandPalette (always open)</h2>
        <CommandPalette open groups={COMMAND_GROUPS} />
      </section>
    </main>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('harness root missing');
createRoot(rootElement).render(<Harness />);
