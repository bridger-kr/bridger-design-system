#!/usr/bin/env node
/* ============================================================
   validate.mjs — CI gate for the Bridger Figma artifacts.
   Checks:
     1. bridger-tokens.tokens.json is valid + has required groups/modes.
     2. components.spec.json is valid + has 40 components.
     3. Every "{color/...}" / "{var}" ref in the spec resolves to a token.
     4. Every variant has a complete props map (Figma needs matching keys).
   Exits non-zero on any failure so CI fails loudly.
   Run: node packages/figma-plugin/scripts/validate.mjs
============================================================ */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIGMA = resolve(__dirname, '..');
const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);

function loadJson(rel) {
  try { return JSON.parse(readFileSync(resolve(FIGMA, rel), 'utf8')); }
  catch (e) { err(`${rel} 파싱 실패: ${e.message}`); return null; }
}

const tokens = loadJson('bridger-tokens.tokens.json');
const spec = loadJson('components.spec.json');

// ---- 1. token structure ---------------------------------------------------
const TOKEN_PATHS = new Set();
if (tokens) {
  if (!tokens.color || !tokens.color.light || !tokens.color.dark) {
    err('tokens: color.light / color.dark 누락');
  }
  const flatten = (group, prefix) => {
    for (const k in group) {
      if (k.startsWith('$')) continue;
      const node = group[k];
      if (node && node.$value !== undefined) TOKEN_PATHS.add(`${prefix}/${k}`);
      else if (node && typeof node === 'object') flatten(node, prefix ? `${prefix}/${k}` : k);
    }
  };
  if (tokens.color && tokens.color.light) flatten(tokens.color.light, 'color');
  ['spacing', 'radius'].forEach((g) => { if (tokens[g]) flatten(tokens[g], g); });

  // parity: every light color must exist in dark
  if (tokens.color && tokens.color.light && tokens.color.dark) {
    const darkPaths = new Set();
    const fl = (group, prefix) => {
      for (const k in group) {
        if (k.startsWith('$')) continue;
        const node = group[k];
        if (node && node.$value !== undefined) darkPaths.add(`${prefix}/${k}`);
        else if (node && typeof node === 'object') fl(node, prefix ? `${prefix}/${k}` : k);
      }
    };
    fl(tokens.color.dark, 'color');
    for (const p of TOKEN_PATHS) {
      if (p.startsWith('color/') && !darkPaths.has(p)) warn(`dark 모드에 ${p} 없음 (parity 권장)`);
    }
  }
  // required typography keys
  for (const k of ['h1', 'h2', 'h3', 'body', 'small', 'mono', 'eyebrow']) {
    if (!tokens.typography || !tokens.typography[k]) err(`tokens: typography.${k} 누락`);
  }
  const eyebrow = tokens.typography?.eyebrow?.$value;
  if (tokens.fontSize?.eyebrow?.$value !== '11px') err('tokens: fontSize.eyebrow=11px 기대');
  if (tokens.letterSpacing?.eyebrow?.$value !== '18%') err('tokens: letterSpacing.eyebrow=18% 기대');
  if (tokens.fontWeight?.eyebrow?.$value !== '700') err('tokens: fontWeight.eyebrow=700 기대');
  if (eyebrow?.fontFamily !== '{fontFamily.sans}') err('tokens: typography.eyebrow fontFamily 참조 기대');
  if (eyebrow?.fontWeight !== '{fontWeight.eyebrow}') err('tokens: typography.eyebrow fontWeight 참조 기대');
  if (eyebrow?.fontSize !== '{fontSize.eyebrow}') err('tokens: typography.eyebrow fontSize 참조 기대');
  if (tokens.lineHeight?.eyebrow?.$value !== '1.55') err('tokens: lineHeight.eyebrow=1.55 기대');
  if (eyebrow?.lineHeight !== '{lineHeight.eyebrow}') err('tokens: typography.eyebrow lineHeight 참조 기대');
  if (eyebrow?.letterSpacing !== '{letterSpacing.eyebrow}') err('tokens: typography.eyebrow letterSpacing 참조 기대');
}

// ---- 2 & 3 & 4. spec checks ----------------------------------------------
function checkNode(node, where) {
  if (!node || typeof node !== 'object') { err(`${where}: 노드 없음`); return; }
  const refFields = ['fill', 'stroke', 'color'];
  for (const f of refFields) {
    const v = node[f];
    if (typeof v === 'string' && v.startsWith('{') && v.endsWith('}')) {
      const path = v.slice(1, -1);
      if (!TOKEN_PATHS.has(path)) err(`${where}.${f}: 미해결 토큰 참조 {${path}}`);
    }
  }
  if (node.type === 'text' && (node.text === undefined || node.text === null)) {
    warn(`${where}: text 노드에 text 없음`);
  }
  (node.children || []).forEach((c, i) => checkNode(c, `${where}>${c.name || c.type || i}`));
}

if (spec) {
  if (!Array.isArray(spec.components)) err('spec: components 배열 아님');
  else {
    if (spec.components.length !== 40) warn(`spec: 컴포넌트 ${spec.components.length}개 (기대 40)`);
    const seen = new Set();
    for (const comp of spec.components) {
      if (!comp.name) { err('spec: 이름 없는 컴포넌트'); continue; }
      if (seen.has(comp.name)) err(`spec: 중복 컴포넌트명 ${comp.name}`);
      seen.add(comp.name);
      if (!Array.isArray(comp.variants) || comp.variants.length === 0) {
        err(`spec: ${comp.name} variants 없음`); continue;
      }
      // variant prop-key consistency
      const propKeysList = comp.variants.map((v) => Object.keys(v.props || {}).sort().join('|'));
      const multi = comp.variants.length > 1;
      if (multi) {
        const first = propKeysList[0];
        propKeysList.forEach((pk, i) => {
          if (pk !== first) err(`spec: ${comp.name} variant ${i} prop 키 불일치 (${pk} ≠ ${first})`);
          if (!pk) err(`spec: ${comp.name} variant ${i} props 누락 (Variants엔 prop 필요)`);
        });
      }
      comp.variants.forEach((v, i) => checkNode(v.node, `${comp.name}[${i}]`));
    }
  }
}

function componentByName(name) {
  return spec?.components?.find((component) => component.name === name);
}

function findVariant(component, props) {
  return component?.variants?.find((variant) => Object.entries(props).every(([key, value]) => variant.props?.[key] === value));
}

function expectNodeValue(componentName, props, property, expected) {
  const variant = findVariant(componentByName(componentName), props);
  if (!variant) {
    err(`spec: ${componentName} ${JSON.stringify(props)} variant 없음`);
    return;
  }
  if (variant.node?.[property] !== expected) {
    err(`spec: ${componentName} ${JSON.stringify(props)} ${property}=${JSON.stringify(expected)} 기대`);
  }
}

function findNode(node, name) {
  if (node?.name === name) return node;
  for (const child of node?.children || []) {
    const match = findNode(child, name);
    if (match) return match;
  }
  return undefined;
}

function expectNamedNodeValue(componentName, props, nodeName, property, expected) {
  const variant = findVariant(componentByName(componentName), props);
  const node = findNode(variant?.node, nodeName);
  if (!node) {
    err(`spec: ${componentName} ${JSON.stringify(props)} ${nodeName} 노드 없음`);
    return;
  }
  if (node[property] !== expected) {
    err(`spec: ${componentName} ${JSON.stringify(props)} ${nodeName}.${property}=${JSON.stringify(expected)} 기대`);
  }
}

// The Figma recipe is an executable consumer contract. These checks pin the
// neutral primitives at the public states consumers actually receive.
expectNodeValue('Button', { Variant: 'Primary', Size: 'sm' }, 'h', 40);
expectNodeValue('Button', { Variant: 'Primary', Size: 'md' }, 'h', 44);
expectNodeValue('Button', { Variant: 'Primary', Size: 'lg' }, 'h', 48);
expectNodeValue('Button', { Variant: 'Primary', Size: 'md' }, 'fill', '{color/ink/ink-strong}');
expectNodeValue('Button', { Variant: 'Danger', Size: 'md' }, 'fill', '{color/status/danger}');
expectNodeValue('Card', { Variant: 'default' }, 'radius', 14);
expectNodeValue('Card', { Variant: 'raised' }, 'fill', '{color/surface/surface-raised}');
expectNodeValue('Card', { Variant: 'panel' }, 'fill', '{color/surface/surface}');
expectNamedNodeValue('Input', { State: 'default' }, 'field', 'h', 44);
expectNamedNodeValue('Input', { State: 'default' }, 'field', 'fill', '{color/surface/surface}');
expectNamedNodeValue('Sidebar', { State: 'default' }, 'item-active', 'fill', '{color/surface/surface-sunken}');
expectNamedNodeValue('Sidebar', { State: 'default' }, 'active-marker', 'fill', '{color/accent/accent}');

// ---- report ---------------------------------------------------------------
if (warns.length) {
  console.log('⚠ 경고:');
  warns.forEach((w) => console.log('  - ' + w));
}
if (errors.length) {
  console.error('\n✗ 검증 실패:');
  errors.forEach((e) => console.error('  - ' + e));
  console.error(`\n${errors.length}개 오류.`);
  process.exit(1);
}
console.log(`\n✓ 검증 통과 — 토큰 ${TOKEN_PATHS.size}개, 컴포넌트 ${spec ? spec.components.length : 0}개${warns.length ? `, 경고 ${warns.length}개` : ''}`);
