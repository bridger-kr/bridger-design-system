#!/usr/bin/env node
/*
 * slop-scan — mechanical anti-slop gate for DESIGN.md §11 (EDD-236).
 *
 * This file is the single source of truth for machine-checkable §11 rules.
 *
 * Rule families:
 *  - §6 icon policy (DS #47): Lucide-only iconography, banned decorative
 *    "AI" icon list, named-import-only enforcement — enforced inside
 *    packages/{react,tokens}.
 *  - §11 showcase hygiene (DS #48, EDD-236): datari remnants, emoji/dingbats,
 *    text arrow glyphs, gradients/blur/text-shadow, decorative uppercase,
 *    CDN runtimes, off-scale font-size/font-weight/radius/shadow/
 *    letter-spacing, infinite animations, fake live chrome — enforced inside
 *    examples/ and packages/figma-plugin. Legacy mirrors (tokens/,
 *    components/) are owned by EDD-235 and stay out of scope.
 *
 * Usage: node scripts/slop-scan.mjs [path ...]
 * Exit code is 1 when any `error`-severity finding exists; findings outside
 * a rule's enforced scope report as warnings.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));

const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.html', '.css', '.json', '.md']);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.changeset', 'assets', 'store-assets']);

/* §11 content rules target the showcase/plugin surfaces agents copy as
 * "official examples". Icon rules are scoped to the published packages. */
const PACKAGES_SCOPE = [/^packages[/\\](react|tokens)[/\\]/];
const SHOWCASE_SCOPE = [/^examples[/\\]/, /^packages[/\\]figma-plugin[/\\]/];
/* Inline-style hygiene (DS #37/#38/#39): no `style={{...}}` literals in shipped
 * code. Scoped `--dt-*` custom-property objects and `...style` spreads stay
 * legal — only plain property keys are flagged. Test/fixture files are
 * exempt: they pass style objects through props deliberately. */
const STYLE_SCOPE = [/^packages[/\\](react|tokens)[/\\]src[/\\]/, ...SHOWCASE_SCOPE];
/* Raw color literals are only legal where the palette itself is authored:
   tokens sources (css + index.ts), the canonical brand mark, and tests. */
const COLOR_EXEMPT =
  /packages[/\\]tokens[/\\](css|src)[/\\]|BrandLogo\.tsx$|\.(test|spec)\.[jt]sx?$|\.snap$/;

const STYLE_EXEMPT = /\.(test|spec|stories)\.[jt]sx?$|__tests__[/\\]|__snapshots__[/\\]/;

const CSSISH = new Set(['.css', '.html']);
const CODEISH = new Set(['.css', '.html', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.json']);
const TYPE_SCALE = new Set(['12', '13', '14', '16', '20', '28', '36']);
const RADIUS_SCALE = new Set(['0', '4', '6', '8', '9999', '50']);

/* Decorative "AI" iconography is design slop (DESIGN.md §6): sparkle/magic-
 * wand/rocket metaphors for AI features. Hard ban. */
const BANNED_ICONS = ['Sparkles', 'Sparkle', 'WandSparkles', 'Wand2', 'Wand', 'Stars', 'Rocket', 'Zap', 'Flame'];
/* `Bot` is allowed only for an actual bot/agent account glyph. Mark the usage
 * with a `slop-allow: Bot` comment; otherwise it reports as a warning. */
const RESTRICTED_ICONS = ['Bot'];

const ICON_NAME = [...BANNED_ICONS, ...RESTRICTED_ICONS].join('|');
const BANNED_SET = new Set(BANNED_ICONS);

/* Kebab-case twins for data-lucide / UMD attribute usage. */
const KEBAB_NAMES = new Set([...BANNED_ICONS, ...RESTRICTED_ICONS].map((name) =>
  name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase(),
));

const RULES = [
  /* ---- §6 icon policy (enforced scope: published packages) ---- */
  {
    id: 'icon/no-namespace-import',
    message: 'Namespace/dynamic lucide-react imports defeat tree-shaking; use named imports only.',
    scope: PACKAGES_SCOPE,
    re: /import\s+\*\s+as\s+\w+\s+from\s*['"]lucide-react['"]/g,
  },
  {
    id: 'icon/no-dynamic-import',
    message: 'Dynamic lucide imports defeat tree-shaking; use named imports only.',
    scope: PACKAGES_SCOPE,
    re: /import\s*\{[^}]*\b(DynamicIcon|icons|createLucideIcon)\b[^}]*\}\s*from\s*['"]lucide-react['"]/g,
  },
  {
    id: 'icon/banned-decorative-import',
    message: 'Decorative "AI" icons are banned (DESIGN.md §6). Remove the import.',
    scope: PACKAGES_SCOPE,
    re: /import\s*\{([^}]*)\}\s*from\s*['"](?:lucide-react|lucide)['"]/g,
    names: (match) => match[1].split(',').map((s) => s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean),
  },
  {
    id: 'icon/banned-decorative-jsx',
    message: 'Decorative "AI" icon component is banned (DESIGN.md §6).',
    scope: PACKAGES_SCOPE,
    re: new RegExp(`<(${ICON_NAME})[\\s/>]`, 'g'),
    names: (match) => [match[1]],
  },
  {
    id: 'icon/banned-decorative-name',
    message: 'Decorative "AI" icon name is banned (DESIGN.md §6).',
    scope: PACKAGES_SCOPE,
    re: new RegExp(`<Icon\\s[^>]*name\\s*=\\s*\\{?\\s*['"](${ICON_NAME})['"]`, 'g'),
    names: (match) => [match[1]],
  },
  {
    id: 'icon/banned-decorative-attr',
    message: 'Decorative "AI" icon name is banned (DESIGN.md §6).',
    scope: PACKAGES_SCOPE,
    re: /data-lucide\s*=\s*['"]([\w-]+)['"]/g,
    names: (match) => (KEBAB_NAMES.has(match[1]) ? [match[1]] : []),
  },
  {
    id: 'icon/banned-decorative-option',
    message: 'Decorative "AI" icon name is banned (DESIGN.md §6).',
    scope: PACKAGES_SCOPE,
    re: new RegExp(`\\b(?:icon|iconName)\\s*:\\s*['"](${ICON_NAME})['"]`, 'g'),
    names: (match) => [match[1]],
  },
  {
    id: 'icon/banned-decorative-literal',
    message: 'Quoted decorative "AI" icon name is banned (DESIGN.md §6).',
    scope: PACKAGES_SCOPE,
    re: new RegExp(`['"](${ICON_NAME})['"]`, 'g'),
    names: (match) => [match[1]],
  },

  /* ---- §11 showcase hygiene (enforced scope: examples/, figma-plugin) ---- */
  {
    id: 'slop/no-datari-remnants',
    message: 'datari 잔재 — bridger.kr 도메인으로 (EDD-269).',
    scope: SHOWCASE_SCOPE,
    re: /datari/ig,
  },
  {
    id: 'slop/no-fake-cli-chrome',
    message: '가짜 CLI/터미널 크롬 금지 ($ bridger …).',
    scope: SHOWCASE_SCOPE,
    re: /\$\s*bridger\b/g,
  },
  {
    id: 'slop/no-emoji-dingbats',
    message: '이모지/딩뱃 금지 — 텍스트 상태([완료]/[경고]) 또는 아이콘 사용.',
    scope: SHOWCASE_SCOPE,
    re: /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
  },
  {
    id: 'slop/no-text-glyph-icons',
    message: '텍스트 화살표/도형 글리프 금지 — 벡터/Lucide 아이콘 사용. ↵ 허용 (키캡 표기).',
    scope: SHOWCASE_SCOPE,
    exts: CODEISH,
    re: /[\u2190-\u21B4\u21B6-\u21FF\u25A0-\u25FF]/g,
  },
  {
    id: 'slop/no-gradients',
    message: '그라데이션/그라데이션 텍스트 금지 (§11).',
    scope: SHOWCASE_SCOPE,
    exts: CODEISH,
    re: /(?:linear|radial|conic)-gradient\s*\(|background-clip:\s*text|-webkit-background-clip:\s*text|bg-clip-text/ig,
  },
  {
    id: 'slop/no-backdrop-blur',
    message: 'backdrop-filter/블러 금지 (§11).',
    scope: SHOWCASE_SCOPE,
    exts: CODEISH,
    re: /backdrop-filter|-webkit-backdrop-filter|backdropFilter|filter:\s*blur\(/ig,
  },
  {
    id: 'slop/no-text-shadow',
    message: 'text-shadow 금지 (§11).',
    scope: SHOWCASE_SCOPE,
    exts: CSSISH,
    re: /text-shadow\s*:/ig,
  },
  {
    id: 'slop/no-decorative-uppercase',
    message: '장식 uppercase 금지 (§11).',
    scope: SHOWCASE_SCOPE,
    exts: CODEISH,
    re: /text-transform:\s*uppercase|textTransform:\s*['"]uppercase/ig,
  },
  {
    id: 'slop/no-cdn-runtime',
    message: 'CDN 런타임 금지 — Vite 빌드만 (unpkg/babel-standalone/UMD).',
    scope: SHOWCASE_SCOPE,
    exts: CODEISH,
    re: /unpkg\.com|cdn\.jsdelivr|babel[-/]standalone|babel\.min\.js|\/umd\/|\.umd\./ig,
  },
  {
    id: 'slop/type-scale',
    message: 'type scale 외 font-size (12/13/14/16/20/28/36px만).',
    scope: SHOWCASE_SCOPE,
    exts: CSSISH,
    re: /font-size:\s*([\d.]+)px/g,
    test: (match) => !TYPE_SCALE.has(match[1]),
  },
  {
    id: 'slop/font-weight',
    message: 'font-weight 400/500/600만 (§11).',
    scope: SHOWCASE_SCOPE,
    exts: CSSISH,
    re: /font-weight:\s*[7-9]\d\d/g,
  },
  {
    id: 'slop/radius-scale',
    message: 'radius는 4/6/8px + pill(9999)/원(50%)만.',
    scope: SHOWCASE_SCOPE,
    exts: CSSISH,
    re: /border-radius:\s*([\d.]+)(px|%)/g,
    test: (match) => !RADIUS_SCALE.has(match[1]),
  },
  {
    id: 'slop/overlay-shadow-only',
    message: 'box-shadow는 overlay 토큰 1단뿐 (rest/hover shadow 금지).',
    scope: SHOWCASE_SCOPE,
    exts: CODEISH,
    re: /box-shadow:\s*([^;}]+)|boxShadow:\s*['"]([^'"]+)['"]/g,
    test: (match) => {
      const v = match[1] ?? match[2];
      return !v.includes('--dt-shadow-overlay') && !v.includes('shadow-overlay') && v.trim() !== 'none';
    },
  },
  {
    id: 'slop/no-decorative-tracking',
    message: '장식 자간(positive letter-spacing) 금지 (§11).',
    scope: SHOWCASE_SCOPE,
    exts: CSSISH,
    re: /letter-spacing:\s*([-\d.]+)em/g,
    test: (match) => parseFloat(match[1]) > 0.02,
  },
  {
    id: 'slop/no-infinite-animation',
    message: '무한/장식 애니메이션 금지 (§11) — 유일한 예외는 기능적 dt-spin 스피너.',
    scope: [...SHOWCASE_SCOPE, ...PACKAGES_SCOPE],
    exclude: /\.(test|spec)\.[jt]sx?$|\.snap$/,
    exts: CSSISH,
    re: /animation[^;{}]*\binfinite\b|animation-iteration-count:\s*infinite/ig,
    // dt-spin is the functional progress spinner — the only permitted loop.
    test: (match) => !match[0].includes('dt-spin'),
  },
  {
    id: 'slop/no-raw-color',
    message: 'Raw 색상 리터럴 금지 — --dt-* semantic token 사용 (DS #28).',
    scope: PACKAGES_SCOPE,
    exclude: COLOR_EXEMPT,
    exts: new Set(['.css', '.ts', '.tsx']),
    re: /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\(/g,
  },
  {
    id: 'slop/no-fake-live-chrome',
    message: '가짜 실시간 크롬 금지 (LIVE/DEMO 배지).',
    scope: SHOWCASE_SCOPE,
    exts: CODEISH,
    re: /\bLIVE\b|\bDEMO\b/g,
  },

  /* ---- inline-style hygiene (enforced scope: shipped sources + examples) ---- */
  {
    id: 'style/no-inline-style-literal',
    message:
      'Inline style={{...}} literals are banned — move statics to .dt-* classes and dynamics to scoped --dt-* custom properties (DS #37/#38/#39).',
    scope: STYLE_SCOPE,
    exclude: STYLE_EXEMPT,
    exts: new Set(['.ts', '.tsx', '.js', '.jsx']),
    re: /style=\{\{([\s\S]*?)\}\}/g,
    // Report only when the object contains a plain property key (`width:`,
    // `padding:`, `'font-size':` ...). Scoped `'--dt-*':` keys, `...spread`
    // entries and `as CSSProperties` casts stay allowed.
    test: (match) => /(?:^|[,{])\s*(?:[a-zA-Z_$][\w$]*|'(?!-)[^']*'|"(?!-)[^"]*")\s*:/.test(match[1]),
  },
];

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.github') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(path);
    } else if (SCAN_EXTENSIONS.has(extname(entry.name))) {
      yield path;
    }
  }
}

function lineNumberAt(content, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) if (content[i] === '\n') line += 1;
  return line;
}

function lineTextAt(content, index) {
  const start = content.lastIndexOf('\n', index - 1) + 1;
  const end = content.indexOf('\n', index);
  return content.slice(start, end === -1 ? content.length : end);
}

function isAllowed(lineText, name) {
  return lineText.includes('slop-allow:') && (name === undefined || lineText.includes(`slop-allow: ${name}`));
}

const targets = process.argv.slice(2);
const roots = targets.length > 0 ? targets.map((t) => join(process.cwd(), t)) : [REPO_ROOT];

const findings = [];
const seen = new Set();

for (const root of roots) {
  const files = statSync(root).isDirectory() ? [...walk(root)] : [root];
  for (const file of files) {
    const rel = relative(REPO_ROOT, file).split(sep).join('/');
    if (rel === 'scripts/slop-scan.mjs') continue;
    const ext = extname(file);
    const content = readFileSync(file, 'utf8');
    for (const rule of RULES) {
      if (rule.exts && !rule.exts.has(ext)) continue;
      if (rule.exclude && rule.exclude.test(rel)) continue;
      rule.re.lastIndex = 0;
      let match;
      while ((match = rule.re.exec(content)) !== null) {
        if (rule.test && !rule.test(match)) continue;
        const names = rule.names ? rule.names(match) : [undefined];
        for (const name of names) {
          const banned = name === undefined || BANNED_SET.has(name) || KEBAB_NAMES.has(name);
          const inScope = !rule.scope || rule.scope.some((re) => re.test(rel));
          const severity = RESTRICTED_ICONS.includes(name ?? '') || !inScope
            ? 'warn'
            : banned ? 'error' : 'warn';
          if (!banned && !RESTRICTED_ICONS.includes(name ?? '')) continue;
          const line = lineNumberAt(content, match.index);
          if (isAllowed(lineTextAt(content, match.index), name)) continue;
          const key = `${file}:${line}:${name ?? rule.id}`;
          if (seen.has(key)) continue;
          seen.add(key);
          findings.push({ file: rel, line, severity, rule: rule.id, name, message: rule.message });
        }
      }
    }
  }
}

findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

let errors = 0;
let warnings = 0;
for (const f of findings) {
  const tag = f.severity === 'error' ? 'error' : 'warn ';
  const name = f.name ? ` (${f.name})` : '';
  console.log(`${tag} ${f.file}:${f.line} [${f.rule}]${name} ${f.message}`);
  if (f.severity === 'error') errors += 1; else warnings += 1;
}

console.log(`\nslop-scan: ${errors} error(s), ${warnings} warning(s) across ${seen.size ? findings.length : 0} findings.`);

if (errors > 0) {
  console.log('Policies: §6 icon policy (Lucide only via named imports) in packages; §11 anti-slop in examples/ and packages/figma-plugin — see DESIGN.md.');
  process.exit(1);
}
