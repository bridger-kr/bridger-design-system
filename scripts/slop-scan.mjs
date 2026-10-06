#!/usr/bin/env node
/*
 * slop-scan — mechanical anti-slop gate for DESIGN.md §11 (EDD-236).
 *
 * This file is the single source of truth for machine-checkable §11 rules.
 * Implemented here: the §6 icon policy (DS #47) — Lucide-only iconography,
 * the banned decorative "AI" icon list, and named-import-only enforcement.
 * CSS/copy rules (gradients, blur, eyebrow chrome, banned copy) land with
 * EDD-236 on top of this scaffold.
 *
 * Usage: node scripts/slop-scan.mjs [path ...]
 * Exit code is 1 when any `error`-severity finding exists; findings outside
 * the enforced scope report as warnings (transitional — see ENFORCED_SCOPE).
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));

const CODE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.html']);

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.changeset', 'assets', 'store-assets']);

/* Findings under the enforced scope are hard errors. Everything else is a
 * warning until the decorative cleanup lands (DS #48 owns examples/ and the
 * Figma plugin; generated mirrors under components/ follow their source). */
const ENFORCED_SCOPE = [/^packages[/\\](react|tokens)[/\\]/];

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
  {
    id: 'icon/no-namespace-import',
    message: 'Namespace/dynamic lucide-react imports defeat tree-shaking; use named imports only.',
    re: /import\s+\*\s+as\s+\w+\s+from\s*['"]lucide-react['"]/g,
  },
  {
    id: 'icon/no-dynamic-import',
    message: 'Dynamic lucide imports defeat tree-shaking; use named imports only.',
    re: /import\s*\{[^}]*\b(DynamicIcon|icons|createLucideIcon)\b[^}]*\}\s*from\s*['"]lucide-react['"]/g,
  },
  {
    id: 'icon/banned-decorative-import',
    message: 'Decorative "AI" icons are banned (DESIGN.md §6). Remove the import.',
    re: /import\s*\{([^}]*)\}\s*from\s*['"](?:lucide-react|lucide)['"]/g,
    names: (match) => match[1].split(',').map((s) => s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean),
  },
  {
    id: 'icon/banned-decorative-jsx',
    message: 'Decorative "AI" icon component is banned (DESIGN.md §6).',
    re: new RegExp(`<(${ICON_NAME})[\\s/>]`, 'g'),
    names: (match) => [match[1]],
  },
  {
    id: 'icon/banned-decorative-name',
    message: 'Decorative "AI" icon name is banned (DESIGN.md §6).',
    re: new RegExp(`<Icon\\s[^>]*name\\s*=\\s*\\{?\\s*['"](${ICON_NAME})['"]`, 'g'),
    names: (match) => [match[1]],
  },
  {
    id: 'icon/banned-decorative-attr',
    message: 'Decorative "AI" icon name is banned (DESIGN.md §6).',
    re: /data-lucide\s*=\s*['"]([\w-]+)['"]/g,
    names: (match) => (KEBAB_NAMES.has(match[1]) ? [match[1]] : []),
  },
  {
    id: 'icon/banned-decorative-option',
    message: 'Decorative "AI" icon name is banned (DESIGN.md §6).',
    re: new RegExp(`\\b(?:icon|iconName)\\s*:\\s*['"](${ICON_NAME})['"]`, 'g'),
    names: (match) => [match[1]],
  },
  {
    id: 'icon/banned-decorative-literal',
    message: 'Quoted decorative "AI" icon name is banned (DESIGN.md §6).',
    re: new RegExp(`['"](${ICON_NAME})['"]`, 'g'),
    names: (match) => [match[1]],
  },
];

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.github') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) yield* walk(path);
    } else if (CODE_EXTENSIONS.has(entry.name.slice(entry.name.lastIndexOf('.')))) {
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
    const content = readFileSync(file, 'utf8');
    for (const rule of RULES) {
      rule.re.lastIndex = 0;
      let match;
      while ((match = rule.re.exec(content)) !== null) {
        const names = rule.names ? rule.names(match) : [undefined];
        for (const name of names) {
          const banned = name === undefined || BANNED_SET.has(name) || KEBAB_NAMES.has(name);
          const severity = RESTRICTED_ICONS.includes(name ?? '') || !ENFORCED_SCOPE.some((re) => re.test(rel))
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
  console.log('Icon policy: Lucide only via named imports; banned decorative "AI" icons — see DESIGN.md §6.');
  process.exit(1);
}
