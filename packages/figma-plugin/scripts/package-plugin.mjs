#!/usr/bin/env node
/* ============================================================
   package-plugin.mjs — bundle the Figma plugin into dist/ for release.
   Copies the runtime files the plugin needs (manifest, code, ui) into
   packages/figma-plugin/dist/ so a release artifact / zip can be produced. The plugin
   fetches tokens + spec from GitHub at runtime, so they aren't bundled,
   but we copy them too for offline/manual import convenience.
   Run: node packages/figma-plugin/scripts/package-plugin.mjs
============================================================ */
import { mkdirSync, copyFileSync, rmSync, existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIGMA = resolve(__dirname, '..');
const DIST = resolve(FIGMA, 'dist');

const RUNTIME = [
  ['plugin/manifest.json', 'manifest.json'],
  ['plugin/code.js', 'code.js'],
  ['plugin/ui.html', 'ui.html'],
  ['bridger-tokens.tokens.json', 'bridger-tokens.tokens.json'],
  ['components.spec.json', 'components.spec.json'],
];

if (existsSync(DIST)) rmSync(DIST, { recursive: true });
mkdirSync(DIST, { recursive: true });

for (const [src, dest] of RUNTIME) {
  const from = resolve(FIGMA, src);
  if (!existsSync(from)) {
    console.error(`✗ 누락: ${src}`);
    process.exit(1);
  }
  copyFileSync(from, resolve(DIST, dest));
}

// minimal README inside the dist for anyone who downloads the zip
writeFileSync(resolve(DIST, 'INSTALL.txt'),
  [
    'Bridger Design System — Figma plugin',
    '',
    '설치(개발 모드):',
    '1. Figma 데스크톱 앱 → Plugins → Development → Import plugin from manifest…',
    '2. 이 폴더의 manifest.json 선택',
    '3. 플러그인 실행 → repo/branch 확인 → "동기화 실행"',
    '',
    '플러그인은 GitHub raw에서 토큰+스펙을 가져옵니다 (인터넷 필요).',
    'bridger-tokens.tokens.json / components.spec.json 은 오프라인 수동 import용 사본입니다.',
  ].join('\n'));

console.log(`✓ 패키징 완료 → ${DIST} (${RUNTIME.length}개 파일)`);
