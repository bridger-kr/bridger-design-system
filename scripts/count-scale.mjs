#!/usr/bin/env node
/* EDD-231 완료기준 카운트: contract.css의 스케일 토큰 개수를 검증한다.
   기대값: radius 값 4종, font-size 7종, weight ⊆ {400,500,600},
   shadow 토큰 1종(overlay), motion 토큰 3종, clamp() 0,
   dark 블록 = overlay 그림자만(DS #44: 색은 :root의 light-dark() 단일 정의).
   Run: node scripts/count-scale.mjs */
import { readFileSync } from 'node:fs';

const css = readFileSync('packages/tokens/css/contract.css', 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '');
const light = css.slice(css.indexOf(':root {'),
  css.indexOf(":root[data-theme='light']"));
const dark = css.slice(css.indexOf(":root[data-theme='dark']"));

const vals = (re, src) => (re.global ? [...src.matchAll(re)].map((m) => m[1].trim())
  : (src.match(re) ? [src.match(re)[1].trim()] : []));
const num = (v) => parseFloat(v);

const radius = new Set(vals(/--dt-radius-\w+:\s*([^;]+);/g, light));
const radiusLiteral = [...radius].filter((v) => !v.includes('var('));
const sizes = [...new Set(vals(/--dt-(?:h1|h2|h3|body|label|small|caption|mono)-size:\s*([^;]+);/g, light))];
const weights = vals(/--dt-(?:h1|h2|h3|body|label|small|caption|mono)-weight:\s*([^;]+);/g, light);
const leadings = [...new Set(vals(/--dt-(?:h1|h2|h3|body|label|small|caption|mono)-leading:\s*([^;]+);/g, light))];
const shadowsL = new Set(light.match(/--dt-shadow-\w+/g) || []);
const shadowsD = new Set(dark.match(/--dt-shadow-\w+/g) || []);
const motion = new Set(light.match(/--dt-(?:duration-\w+|ease)\b/g) || []);
const clampCount = (light.match(/clamp\(/g) || []).length;

const COLOR = /^--dt-(bg|surface(-[\w-]+)?|text(-[\w-]+)?|border(-[\w-]+)?|divider|accent(-[\w-]+)?|cobalt|success|warning|danger|info|status-[\w-]+|code-[\w-]+|tint-[\w-]+|brand-[\w-]+|syntax-[\w-]+|chrome-[\w-]+|hotspot-[\w-]+|glass-[\w-]+)$/;
const darkKeys = vals(/(--dt-[\w-]+):/g, dark);
const darkOffenders = darkKeys.filter((k) => k !== '--dt-shadow-overlay' && !COLOR.test(k));

const checks = [
  ['radius 값 4종', radiusLiteral.length === 4, radiusLiteral.join(' / ')],
  ['font-size 7종', sizes.length === 7, sizes.join(' / ')],
  ['weight ⊆ {400,500,600}', weights.every((w) => ['400', '500', '600'].includes(w)), weights.join(' / ')],
  ['line-height 7종', leadings.length === 7, leadings.join(' / ')],
  ['shadow 토큰 1종(overlay)', shadowsL.size === 1 && shadowsL.has('--dt-shadow-overlay'), [...shadowsL].join(' / ')],
  ['motion 토큰 3종', motion.size === 3, [...motion].join(' / ')],
  ['clamp() 0건', clampCount === 0, String(clampCount)],
  ['dark: overlay만 (색은 light-dark()로 통합)', darkOffenders.length === 0 && shadowsD.size === 1, `${darkKeys.length}개 키 (offenders: ${darkOffenders.join(', ') || 'none'})`],
  ['H1 ≤ 36px', num(vals(/--dt-h1-size:\s*([^;]+);/, light)[0]) <= 36, vals(/--dt-h1-size:\s*([^;]+);/, light)[0]],
];

let fail = 0;
for (const [name, ok, detail] of checks) {
  console.log(`${ok ? '✓' : '✗'} ${name}: ${detail}`);
  if (!ok) fail += 1;
}
if (fail) { console.error(`\n${fail}건 실패`); process.exit(1); }
console.log('\n✓ 스케일 카운트 통과');
