#!/usr/bin/env node
/* ============================================================
   e2e.mjs — headless end-to-end test of the Figma plugin.
   Figma desktop can only be run by a human, so this mocks the Figma Plugin
   API faithfully, loads plugin/code.js into that sandbox, fires a real "sync"
   message with the actual tokens + component spec, and asserts:
     - no runtime error is thrown / posted
     - the expected Variables, Text/Effect styles, and 40 Component Sets exist
   Any API misuse that would throw in the desktop app throws here too.
   Run: node packages/figma-plugin/scripts/e2e.mjs
============================================================ */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIGMA = resolve(__dirname, '..');
const tokens = JSON.parse(readFileSync(resolve(FIGMA, 'bridger-tokens.tokens.json'), 'utf8'));
const spec = JSON.parse(readFileSync(resolve(FIGMA, 'components.spec.json'), 'utf8'));
const codeSrc = readFileSync(resolve(FIGMA, 'plugin', 'code.js'), 'utf8');

let idSeq = 0;
const nid = (p) => `${p}:${++idSeq}`;
const fail = (m) => { console.error('✗ ' + m); process.exitCode = 1; };

// Figma's plugin sandbox is QuickJS — it rejects some modern syntax Node accepts.
// Object spread crashed v1.0.0 in production, so guard against that class here.
const quickjsBanned = [
  [/\{\s*\.\.\./, 'object spread { ...x } (QuickJS 미지원)'],
  [/\)\s*\?\./, 'optional chaining ?. (안전하게 회피 권장)'],
  [/\?\?/, 'nullish coalescing ?? (안전하게 회피 권장)'],
];
for (const [re, label] of quickjsBanned) {
  if (re.test(codeSrc)) fail(`QuickJS 비호환 구문 발견: ${label}`);
}

// ---- node mocks -----------------------------------------------------------
const RGB_KEYS = ['r', 'g', 'b'];
function assertColor(c, where) {
  if (!c || typeof c !== 'object') { fail(`${where}: 색상 객체 아님`); return; }
  for (const k of RGB_KEYS) {
    if (typeof c[k] !== 'number' || c[k] < 0 || c[k] > 1) fail(`${where}: ${k} 값 범위 오류 (${c[k]})`);
  }
  if (c.a !== undefined && (c.a < 0 || c.a > 1)) fail(`${where}: alpha 범위 오류 (${c.a})`);
}

class BaseNode {
  constructor(type) {
    this.id = nid(type);
    this.type = type;
    this.name = type;
    this.children = [];
    this._fills = [];
    this._strokes = [];
    this.parent = null;
  }
  appendChild(c) {
    if (!c) { fail(`${this.type}.appendChild: null 자식`); return; }
    if (c.parent) c.parent.children = c.parent.children.filter((x) => x !== c);
    c.parent = this;
    this.children.push(c);
  }
  set fills(v) {
    if (!Array.isArray(v)) fail(`${this.type}.fills: 배열 아님`);
    (v || []).forEach((p, i) => {
      if (p.type !== 'SOLID') fail(`${this.type}.fills[${i}]: type SOLID 아님`);
      assertColor(p.color, `${this.type}.fills[${i}].color`);
    });
    this._fills = v;
  }
  get fills() { return this._fills; }
  set strokes(v) {
    if (!Array.isArray(v)) fail(`${this.type}.strokes: 배열 아님`);
    this._strokes = v;
  }
  get strokes() { return this._strokes; }
  resize(w, h) {
    if (typeof w !== 'number' || typeof h !== 'number') fail(`${this.type}.resize: 숫자 아님 (${w},${h})`);
    this.width = w; this.height = h;
  }
  set layoutSizingHorizontal(v) {
    if (!this.parent) fail(`${this.type}.layoutSizingHorizontal: appendChild 전 설정 (Figma 무시됨)`);
    else if (this.parent.layoutMode === 'NONE' || this.parent.type === 'PAGE') {
      throw new Error('layoutSizing requires auto-layout parent');
    }
    this._lsh = v;
  }
  get layoutSizingHorizontal() { return this._lsh; }
}

class FrameNode extends BaseNode {
  constructor() { super('FRAME'); this.width = 100; this.height = 100; this.layoutMode = 'NONE'; }
}
class TextNode extends BaseNode {
  constructor() { super('TEXT'); this.width = 50; this.height = 16; this._fontName = { family: 'Inter', style: 'Regular' }; this.characters = ''; }
  set fontName(f) {
    if (!f || !f.family || !f.style) fail(`TEXT.fontName: family/style 누락 (${JSON.stringify(f)})`);
    if (!LOADED_FONTS.has(`${f.family}__${f.style}`)) {
      fail(`TEXT.fontName 설정 전 폰트 미로딩: ${f.family} ${f.style}`);
    }
    this._fontName = f;
  }
  get fontName() { return this._fontName; }
  set characters(v) {
    if (this._charsGuard && !LOADED_FONTS.has(`${this._fontName.family}__${this._fontName.style}`)) {
      fail('TEXT.characters 설정 시 폰트 미로딩');
    }
    this._characters = v;
  }
  get characters() { return this._characters; }
  set textAutoResize(v) {
    if (!['WIDTH_AND_HEIGHT', 'HEIGHT', 'NONE', 'TRUNCATE'].includes(v)) fail(`TEXT.textAutoResize: 잘못된 값 ${v}`);
    this._tar = v;
  }
  get textAutoResize() { return this._tar; }
}
class EllipseNode extends BaseNode { constructor() { super('ELLIPSE'); this.width = 10; this.height = 10; } }
class RectangleNode extends BaseNode { constructor() { super('RECTANGLE'); this.width = 10; this.height = 10; } }
class ComponentNode extends BaseNode { constructor() { super('COMPONENT'); this.width = 100; this.height = 40; } }
class ComponentSetNode extends BaseNode { constructor() { super('COMPONENT_SET'); this.width = 200; this.height = 80; } }
class PageNode extends BaseNode { constructor() { super('PAGE'); } }

const LOADED_FONTS = new Set();
const AVAILABLE_FONTS = new Set([
  'Inter__Regular', 'Inter__Semi Bold', 'Inter__Bold',
  // Simulate Pretendard / JetBrains Mono MISSING to exercise the fallback path,
  // which is the realistic worst case on a fresh Figma install.
]);

// ---- collections / variables / styles -------------------------------------
const state = { collections: [], variables: [], textStyles: [], effectStyles: [], pages: [] };

class VariableCollection {
  constructor(name) {
    this.id = nid('VC'); this.name = name;
    this.modes = [{ modeId: nid('mode'), name: 'Mode 1' }];
  }
  renameMode(modeId, name) {
    const m = this.modes.find((x) => x.modeId === modeId);
    if (!m) fail(`renameMode: 모드 없음 ${modeId}`); else m.name = name;
  }
  addMode(name) { const m = { modeId: nid('mode'), name }; this.modes.push(m); return m.modeId; }
}
class Variable {
  constructor(name, col, type) {
    this.id = nid('VAR'); this.name = name; this.variableCollectionId = col.id;
    this.resolvedType = type; this._values = {};
    if (!['COLOR', 'FLOAT', 'STRING', 'BOOLEAN'].includes(type)) fail(`createVariable: 잘못된 type ${type}`);
  }
  setValueForMode(modeId, value) {
    if (!modeId) fail(`${this.name}.setValueForMode: modeId 없음`);
    if (this.resolvedType === 'COLOR') assertColor(value, `${this.name} color value`);
    if (this.resolvedType === 'FLOAT' && typeof value !== 'number') fail(`${this.name}: FLOAT 값이 숫자 아님 (${value})`);
    this._values[modeId] = value;
  }
}

const figma = {
  showUI() {},
  notify() {},
  root: { children: state.pages },
  get currentPage() { return this._cp; },
  set currentPage(p) { this._cp = p; },
  createPage() { const p = new PageNode(); state.pages.push(p); return p; },
  createFrame: () => new FrameNode(),
  createText: () => { const t = new TextNode(); t._charsGuard = true; return t; },
  createEllipse: () => new EllipseNode(),
  createRectangle: () => new RectangleNode(),
  createComponent: () => new ComponentNode(),
  createComponentFromNode(node) {
    if (!node || !(node instanceof BaseNode)) fail('createComponentFromNode: SceneNode 아님');
    const c = new ComponentNode();
    c.width = node.width; c.height = node.height; c.children = node.children;
    return c;
  },
  combineAsVariants(components, parent) {
    if (!Array.isArray(components) || components.length < 2) fail('combineAsVariants: 컴포넌트 2개 이상 필요');
    components.forEach((c) => { if (c.type !== 'COMPONENT') fail('combineAsVariants: COMPONENT 아님'); });
    if (!parent) fail('combineAsVariants: parent 없음');
    const set = new ComponentSetNode();
    components.forEach((c) => set.appendChild(c));
    return set;
  },
  loadFontAsync(f) {
    if (!f || !f.family || !f.style) return Promise.reject(new Error('bad font'));
    if (AVAILABLE_FONTS.has(`${f.family}__${f.style}`)) {
      LOADED_FONTS.add(`${f.family}__${f.style}`);
      return Promise.resolve();
    }
    return Promise.reject(new Error(`Cannot load font ${f.family} ${f.style}`));
  },
  variables: {
    getLocalVariableCollectionsAsync: () => Promise.resolve(state.collections),
    getLocalVariablesAsync: () => Promise.resolve(state.variables),
    createVariableCollection(name) { const c = new VariableCollection(name); state.collections.push(c); return c; },
    createVariable(name, col, type) { const v = new Variable(name, col, type); state.variables.push(v); return v; },
    setBoundVariableForPaint(paint, field, variable) {
      if (!paint || paint.type !== 'SOLID') fail('setBoundVariableForPaint: SOLID paint 아님');
      if (field !== 'color') fail(`setBoundVariableForPaint: field=color 기대 (${field})`);
      if (!variable || !variable.id) fail('setBoundVariableForPaint: variable 없음');
      return { ...paint, boundVariables: { color: { type: 'VARIABLE_ALIAS', id: variable.id } } };
    },
  },
  getLocalTextStylesAsync: () => Promise.resolve(state.textStyles),
  getLocalEffectStylesAsync: () => Promise.resolve(state.effectStyles),
  loadAllPagesAsync: () => Promise.resolve(),
  setCurrentPageAsync(p) { this._cp = p; return Promise.resolve(); },
  createTextStyle() { const s = { id: nid('TS'), name: '', _fontName: null }; Object.defineProperty(s, 'fontName', { set(f) { if (!LOADED_FONTS.has(`${f.family}__${f.style}`)) fail(`TextStyle.fontName 미로딩: ${f.family} ${f.style}`); this._fontName = f; }, get() { return this._fontName; } }); state.textStyles.push(s); return s; },
  createEffectStyle() { const s = { id: nid('ES'), name: '', effects: [] }; state.effectStyles.push(s); return s; },
  viewport: { scrollAndZoomIntoView() {} },
  ui: {
    _handler: null,
    set onmessage(fn) { this._handler = fn; },
    get onmessage() { return this._handler; },
    postMessage(m) { messages.push(m); },
  },
};

const messages = [];

// ---- run plugin code in sandbox -------------------------------------------
const sandbox = { figma, __html__: '<html></html>', console, setTimeout, clearTimeout, Promise };
vm.createContext(sandbox);
try {
  vm.runInContext(codeSrc, sandbox, { filename: 'code.js' });
} catch (e) {
  fail('code.js 로드 중 예외: ' + e.stack);
}

if (!figma.ui.onmessage) fail('figma.ui.onmessage 핸들러 미등록');

// fire the real sync message
const run = async () => {
  await figma.ui.onmessage({ type: 'sync', tokens, spec, doVars: true, doComponents: true });
};

run().then(() => {
  // assertions on output
  const errMsg = messages.find((m) => m.type === 'error');
  if (errMsg) fail('플러그인이 error 메시지 전송: ' + errMsg.msg);

  const colorVars = state.variables.filter((v) => v.resolvedType === 'COLOR').length;
  const floatVars = state.variables.filter((v) => v.resolvedType === 'FLOAT').length;
  const sets = state.pages.flatMap((p) => p.children).filter((n) => n.type === 'COMPONENT_SET' || n.type === 'COMPONENT');
  const colCount = state.collections.length;

  if (colCount !== 1) fail(`컬렉션 1개 기대, 실제 ${colCount}`);
  if (state.collections[0].modes.length !== 2) fail(`모드 2개(Light/Dark) 기대, 실제 ${state.collections[0].modes.length}`);
  if (colorVars < 25) fail(`색상 변수 부족 (${colorVars})`);
  if (floatVars < 13) fail(`spacing+radius 변수 부족 (${floatVars})`);
  if (state.textStyles.length !== 6) fail(`Text style 6개 기대, 실제 ${state.textStyles.length}`);
  if (state.effectStyles.length !== 4) fail(`Effect style 4개 기대, 실제 ${state.effectStyles.length}`);
  if (sets.length !== 40) fail(`컴포넌트 40개 기대, 실제 ${sets.length}`);

  // every COLOR variable must have a value for BOTH modes
  const [m1, m2] = state.collections[0].modes.map((m) => m.modeId);
  for (const v of state.variables.filter((x) => x.resolvedType === 'COLOR')) {
    if (v._values[m1] === undefined) fail(`${v.name}: Light 값 없음`);
    if (v._values[m2] === undefined) fail(`${v.name}: Dark 값 없음`);
  }

  // every TEXT node must have textAutoResize (else glyphs overlap in real Figma)
  let textCount = 0;
  const walk = (n) => {
    if (n.type === 'TEXT') {
      textCount += 1;
      if (n.textAutoResize === undefined) fail(`TEXT "${n.characters}" textAutoResize 미설정 → 실제 Figma에서 글자 오버랩`);
    }
    (n.children || []).forEach(walk);
  };
  state.pages.flatMap((p) => p.children).forEach(walk);
  if (textCount < 100) fail(`텍스트 노드 수 비정상 (${textCount})`);

  if (process.exitCode) {
    console.error('\n✗ E2E 실패');
  } else {
    console.log('✓ E2E 통과');
    console.log(`  컬렉션 1 · 모드 2 · 색상변수 ${colorVars} · 숫자변수 ${floatVars}`);
    console.log(`  TextStyle ${state.textStyles.length} · EffectStyle ${state.effectStyles.length} · 컴포넌트 ${sets.length} · 텍스트노드 ${textCount}`);
    console.log(`  폰트 폴백: Pretendard/JetBrains 부재 → Inter 로 정상 폴백 (에러 0)`);
    console.log(`  오토레이아웃: layoutSizing은 appendChild 후 적용 · 모든 텍스트 textAutoResize 설정됨`);
  }
}).catch((e) => {
  fail('sync 실행 중 예외: ' + e.stack);
  console.error('\n✗ E2E 실패');
});
