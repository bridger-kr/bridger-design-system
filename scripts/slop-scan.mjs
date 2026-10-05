#!/usr/bin/env node
/* ============================================================
   slop-scan.mjs — DESIGN.md §11 anti-slop gate.

   Scans the showcase/plugin surfaces that agents and designers copy as
   "official examples" — examples/** and packages/figma-plugin/** (added to
   the EDD-236 slop-scan scope by DS issue #48). Legacy mirrors (tokens/,
   components/) are owned by EDD-235 and stay out of scope here.

   Any hit exits non-zero so CI fails loudly.
   Run: pnpm check:slop   (repo root)
============================================================ */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SCAN_DIRS = ['examples', 'packages/figma-plugin'];
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git']);
const SCAN_EXT = new Set(['.css', '.html', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.json', '.md']);
const CSSISH = new Set(['.css', '.html']);
const CODEISH = new Set(['.css', '.html', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.json']);
const TYPE_SCALE = new Set(['12', '13', '14', '16', '20', '28', '36']);
const RADIUS_SCALE = new Set(['0', '4', '6', '8', '9999', '50']);

// [{ label, files, test(line) -> true = violation }]
const RULES = [
  {
    label: 'datari 잔재 — bridger.kr 도메인으로 (EDD-269)',
    files: null,
    test: (l) => /datari/i.test(l),
  },
  {
    label: '가짜 CLI/터미널 크롬 금지 ($ bridger …)',
    files: null,
    test: (l) => /\$\s*bridger\b/.test(l),
  },
  {
    label: '이모지/딩뱃 금지 — 텍스트 상태([완료]/[경고]) 또는 아이콘 사용',
    files: null,
    test: (l) => /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(l),
  },
  {
    label: '텍스트 화살표/도형 글리프 금지 — 벡터/Lucide 아이콘 사용',
    files: CODEISH,
    // ↵ (U+21B5) 허용 — ⌘K와 같은 키캡 표기는 장식 화살표가 아니다.
    test: (l) => /[\u2190-\u21B4\u21B6-\u21FF\u25A0-\u25FF]/.test(l),
  },
  {
    label: '그라데이션/그라데이션 텍스트 금지 (§11)',
    files: CODEISH,
    test: (l) => /(?:linear|radial|conic)-gradient\s*\(|background-clip:\s*text|-webkit-background-clip:\s*text|bg-clip-text/i.test(l),
  },
  {
    label: 'backdrop-filter/블러 금지 (§11)',
    files: CODEISH,
    test: (l) => /backdrop-filter|-webkit-backdrop-filter|backdropFilter|filter:\s*blur\(/i.test(l),
  },
  {
    label: 'text-shadow 금지 (§11)',
    files: CSSISH,
    test: (l) => /text-shadow\s*:/i.test(l),
  },
  {
    label: '장식 uppercase 금지 (§11)',
    files: CODEISH,
    test: (l) => /text-transform:\s*uppercase|textTransform:\s*['"]uppercase/i.test(l),
  },
  {
    label: 'CDN 런타임 금지 — Vite 빌드만 (unpkg/babel-standalone/UMD)',
    files: CODEISH,
    test: (l) => /unpkg\.com|cdn\.jsdelivr|babel[-/]standalone|babel\.min\.js|\/umd\/|\.umd\./i.test(l),
  },
  {
    label: 'type scale 외 font-size (12/13/14/16/20/28/36px만)',
    files: CSSISH,
    test: (l) => {
      const m = l.match(/font-size:\s*([\d.]+)px/);
      return m && !TYPE_SCALE.has(m[1]);
    },
  },
  {
    label: 'font-weight 400/500/600만 (§11)',
    files: CSSISH,
    test: (l) => /font-weight:\s*[7-9]\d\d/.test(l),
  },
  {
    label: 'radius는 4/6/8px + pill(9999)/원(50%)만',
    files: CSSISH,
    test: (l) => {
      const m = l.match(/border-radius:\s*([\d.]+)(px|%)/);
      return m && !RADIUS_SCALE.has(m[1]);
    },
  },
  {
    label: 'box-shadow는 overlay 토큰 1단뿐 (rest/hover shadow 금지)',
    files: CODEISH,
    test: (l) => {
      const m = l.match(/box-shadow:\s*([^;}]+)/) || l.match(/boxShadow:\s*['"]([^'"]+)['"]/);
      if (!m) return false;
      const v = m[1];
      return !v.includes('--dt-shadow-overlay') && !v.includes('shadow-overlay') && v.trim() !== 'none';
    },
  },
  {
    label: '장식 자간(positive letter-spacing) 금지 (§11)',
    files: CSSISH,
    test: (l) => {
      const m = l.match(/letter-spacing:\s*([-\d.]+)em/);
      return m && parseFloat(m[1]) > 0.02;
    },
  },
  {
    label: '무한/장식 애니메이션 금지 (§11)',
    files: CSSISH,
    test: (l) => /animation[^;{}]*\binfinite\b|animation-iteration-count:\s*infinite/i.test(l),
  },
  {
    label: '가짜 실시간 크롬 금지 (LIVE/DEMO 배지)',
    files: CODEISH,
    test: (l) => /\bLIVE\b|\bDEMO\b/.test(l),
  },
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(join(dir, entry.name), out);
    } else if (SCAN_EXT.has(extname(entry.name))) {
      out.push(join(dir, entry.name));
    }
  }
  return out;
}

const hits = [];
for (const dir of SCAN_DIRS) {
  for (const file of walk(resolve(ROOT, dir))) {
    const ext = extname(file);
    const rel = file.slice(ROOT.length + 1);
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      for (const rule of RULES) {
        if (rule.files && !rule.files.has(ext)) continue;
        if (rule.test(line)) hits.push(`${rel}:${i + 1}  ${rule.label}  |  ${line.trim().slice(0, 100)}`);
      }
    });
  }
}

if (hits.length) {
  console.error(`[실패] slop-scan: ${hits.length}건 위반 (${SCAN_DIRS.join(', ')})`);
  hits.forEach((h) => console.error('  ' + h));
  process.exit(1);
}
console.log(`[완료] slop-scan 통과 — ${SCAN_DIRS.join(', ')} (${RULES.length} rules)`);
