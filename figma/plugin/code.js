/* ============================================================
   Bridger Design System Sync — Figma plugin engine
   Reads token JSON + component spec (fetched from GitHub by ui.html)
   and deterministically builds:
     1. A Variable Collection "Bridger" with Light/Dark modes
     2. Text Styles (typography) + Effect Styles (boxShadow)
     3. 40 Component Sets (Variants) from components.spec.json

   The spec is a declarative node tree (see components.spec.json). This file
   is the renderer — it never parses JSX. All color/spacing/radius references
   in the spec resolve to the Variables created in step 1.
============================================================ */

figma.showUI(__html__, { width: 380, height: 560 });

const ui = (msg, cls) => figma.ui.postMessage({ type: 'log', msg, cls });

// ---- color helpers --------------------------------------------------------
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return {
    r: parseInt(n.slice(0, 2), 16) / 255,
    g: parseInt(n.slice(2, 4), 16) / 255,
    b: parseInt(n.slice(4, 6), 16) / 255,
  };
}
function parseColor(val) {
  // returns { color:{r,g,b}, opacity }
  if (val.startsWith('rgba')) {
    const m = val.match(/rgba?\(([^)]+)\)/)[1].split(',').map((s) => parseFloat(s.trim()));
    return { color: { r: m[0] / 255, g: m[1] / 255, b: m[2] / 255 }, opacity: m[3] != null ? m[3] : 1 };
  }
  return { color: hexToRgb(val), opacity: 1 };
}

// ---- VARIABLES + STYLES ---------------------------------------------------
// Flattened map of varPath -> Variable, so the component builder can bind.
const varMap = {};

function flattenColors(group, prefix, out) {
  for (const key in group) {
    if (key.startsWith('$')) continue;
    const node = group[key];
    if (node && node.$value !== undefined) {
      out[`${prefix}/${key}`] = node.$value;
    } else if (node && typeof node === 'object') {
      flattenColors(node, prefix ? `${prefix}/${key}` : key, out);
    }
  }
}

async function buildVariables(tokens) {
  ui('Variables 생성 중…', 'dim');
  // single collection, two modes
  let col = figma.variables.getLocalVariableCollections().find((c) => c.name === 'Bridger');
  if (!col) col = figma.variables.createVariableCollection('Bridger');
  // ensure modes
  let lightId = col.modes[0].modeId;
  col.renameMode(lightId, 'Light');
  let darkMode = col.modes.find((m) => m.name === 'Dark');
  let darkId = darkMode ? darkMode.modeId : col.addMode('Dark');

  const existing = {};
  for (const v of figma.variables.getLocalVariables()) {
    if (v.variableCollectionId === col.id) existing[v.name] = v;
  }
  const getVar = (name, type) => {
    if (existing[name]) return existing[name];
    const v = figma.variables.createVariable(name, col, type);
    existing[name] = v;
    return v;
  };

  // colors: light + dark
  const light = {}; const dark = {};
  flattenColors(tokens.color.light, '', light);
  flattenColors(tokens.color.dark, '', dark);
  for (const path in light) {
    const v = getVar(`color/${path}`, 'COLOR');
    const l = parseColor(light[path]);
    v.setValueForMode(lightId, l.opacity < 1 ? { ...l.color, a: l.opacity } : l.color);
    if (dark[path] != null) {
      const d = parseColor(dark[path]);
      v.setValueForMode(darkId, d.opacity < 1 ? { ...d.color, a: d.opacity } : d.color);
    }
    varMap[`color/${path}`] = v;
  }

  // spacing + radius as FLOAT (strip px)
  const numGroup = (group, prefix) => {
    for (const key in group) {
      if (key.startsWith('$')) continue;
      const raw = group[key].$value;
      const num = parseFloat(String(raw));
      const v = getVar(`${prefix}/${key}`, 'FLOAT');
      v.setValueForMode(lightId, num);
      v.setValueForMode(darkId, num);
      varMap[`${prefix}/${key}`] = v;
    }
  };
  numGroup(tokens.spacing, 'spacing');
  numGroup(tokens.radius, 'radius');

  ui(`✓ Variables: ${Object.keys(varMap).length}개`, 'ok');
  return col;
}

async function buildTextStyles(tokens) {
  ui('Text Styles 생성 중…', 'dim');
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' }).catch(() => {});
  const fam = { sans: tokens.fontFamily.sans.$value, mono: tokens.fontFamily.mono.$value };
  const weightStyle = { '400': 'Regular', '600': 'SemiBold', '700': 'Bold' };
  const px = (s) => parseFloat(String(s));
  const existing = {};
  for (const s of figma.getLocalTextStyles()) existing[s.name] = s;

  for (const key in tokens.typography) {
    if (key.startsWith('$')) continue;
    const t = tokens.typography[key].$value;
    const family = t.fontFamily.includes('mono') ? fam.mono : fam.sans;
    const w = (t.fontWeight.match(/\d+/) || ['400'])[0];
    const style = weightStyle[w] || 'Regular';
    let usedFamily = family; let usedStyle = style;
    try {
      await figma.loadFontAsync({ family, style });
    } catch (e) {
      usedFamily = 'Inter'; usedStyle = style === 'SemiBold' ? 'Semi Bold' : style;
      try { await figma.loadFontAsync({ family: usedFamily, style: usedStyle }); }
      catch (e2) { usedStyle = 'Regular'; await figma.loadFontAsync({ family: 'Inter', style: 'Regular' }); }
      ui(`  ⚠ ${family} ${style} 없음 → ${usedFamily} ${usedStyle} 대체`, 'dim');
    }
    const name = `Bridger/${key}`;
    const ts = existing[name] || figma.createTextStyle();
    ts.name = name;
    ts.fontName = { family: usedFamily, style: usedStyle };
    ts.fontSize = px(tokens.fontSize[key].$value);
    const lh = parseFloat(tokens.lineHeight[key].$value);
    ts.lineHeight = { unit: 'PERCENT', value: lh * 100 };
    const lsRaw = tokens.letterSpacing[key] ? tokens.letterSpacing[key].$value
      : tokens.letterSpacing.base.$value;
    ts.letterSpacing = { unit: 'PERCENT', value: parseFloat(lsRaw) };
  }
  ui('✓ Text Styles', 'ok');
}

async function buildEffectStyles(tokens) {
  ui('Effect Styles 생성 중…', 'dim');
  const existing = {};
  for (const s of figma.getLocalEffectStyles()) existing[s.name] = s;
  for (const key in tokens.boxShadow) {
    if (key.startsWith('$')) continue;
    const s = tokens.boxShadow[key].$value;
    const c = parseColor(s.color);
    const name = `Bridger/shadow-${key}`;
    const es = existing[name] || figma.createEffectStyle();
    es.name = name;
    es.effects = [{
      type: 'DROP_SHADOW', visible: true,
      color: { ...c.color, a: c.opacity },
      offset: { x: parseFloat(s.x), y: parseFloat(s.y) },
      radius: parseFloat(s.blur), spread: parseFloat(s.spread),
      blendMode: 'NORMAL',
    }];
  }
  ui('✓ Effect Styles', 'ok');
}

// ---- COMPONENT BUILDER ----------------------------------------------------
// Resolves "{color/accent/accent}" style refs to bound variables.
function bindFill(node, ref) {
  if (!ref) return;
  if (typeof ref === 'string' && ref.startsWith('{') && ref.endsWith('}')) {
    const path = ref.slice(1, -1);
    const v = varMap[path];
    if (v) {
      const fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      node.fills = figma.variables.setBoundVariableForPaint(fills[0], 'color', v) ? [figma.variables.setBoundVariableForPaint(fills[0], 'color', v)] : fills;
      return;
    }
  }
  // literal color
  const c = parseColor(ref);
  node.fills = [{ type: 'SOLID', color: c.color, opacity: c.opacity }];
}

function bindStroke(node, ref, weight) {
  if (!ref) return;
  node.strokeWeight = weight || 1;
  node.strokeAlign = 'INSIDE';
  if (typeof ref === 'string' && ref.startsWith('{') && ref.endsWith('}')) {
    const v = varMap[ref.slice(1, -1)];
    if (v) {
      let paint = { type: 'SOLID', color: { r: 0, g: 0, b: 0 } };
      paint = figma.variables.setBoundVariableForPaint(paint, 'color', v);
      node.strokes = [paint];
      return;
    }
  }
  const c = parseColor(ref);
  node.strokes = [{ type: 'SOLID', color: c.color, opacity: c.opacity }];
}

let FONTS_READY = false;
async function ensureFonts() {
  if (FONTS_READY) return;
  const tries = [
    { family: 'Pretendard Variable', style: 'Regular' },
    { family: 'Pretendard Variable', style: 'SemiBold' },
    { family: 'Pretendard Variable', style: 'Bold' },
    { family: 'JetBrains Mono', style: 'Regular' },
    { family: 'JetBrains Mono', style: 'SemiBold' },
    { family: 'Inter', style: 'Regular' },
    { family: 'Inter', style: 'Semi Bold' },
    { family: 'Inter', style: 'Bold' },
  ];
  for (const f of tries) { try { await figma.loadFontAsync(f); } catch (e) { /* skip missing */ } }
  FONTS_READY = true;
}

function pickFont(family, weight) {
  const wStyle = { 400: 'Regular', 500: 'Regular', 600: 'SemiBold', 650: 'SemiBold', 700: 'Bold', 780: 'Bold' };
  const style = wStyle[weight] || 'Regular';
  const isMono = family === 'mono';
  const fam = isMono ? 'JetBrains Mono' : 'Pretendard Variable';
  // fallbacks handled by ensureFonts; if Pretendard absent Figma throws on setRange,
  // so we test availability via a cached probe.
  if (AVAILABLE[`${fam}__${style}`]) return { family: fam, style };
  // fall back to Inter
  const interStyle = style === 'SemiBold' ? 'Semi Bold' : style;
  if (AVAILABLE[`Inter__${interStyle}`]) return { family: 'Inter', style: interStyle };
  return { family: 'Inter', style: 'Regular' };
}

const AVAILABLE = {};
async function probeFonts() {
  const fams = ['Pretendard Variable', 'JetBrains Mono', 'Inter'];
  const styles = ['Regular', 'SemiBold', 'Semi Bold', 'Bold'];
  for (const family of fams) {
    for (const style of styles) {
      try { await figma.loadFontAsync({ family, style }); AVAILABLE[`${family}__${style}`] = true; }
      catch (e) { /* unavailable */ }
    }
  }
}

// Recursive node builder from spec.
function buildNode(def) {
  let node;
  if (def.type === 'text') {
    node = figma.createText();
    const f = pickFont(def.font || 'sans', def.weight || 400);
    node.fontName = f;
    node.characters = def.text != null ? String(def.text) : '';
    if (def.size) node.fontSize = def.size;
    if (def.color) bindFill(node, def.color);
    if (def.letterSpacing != null) node.letterSpacing = { unit: 'PERCENT', value: def.letterSpacing };
    if (def.align) node.textAlignHorizontal = def.align.toUpperCase();
  } else if (def.type === 'ellipse') {
    node = figma.createEllipse();
    if (def.w) node.resize(def.w, def.h || def.w);
    if (def.fill) bindFill(node, def.fill);
    if (def.stroke) bindStroke(node, def.stroke, def.strokeWeight);
  } else if (def.type === 'line') {
    node = figma.createRectangle();
    node.resize(def.w || 1, def.h || 1);
    if (def.fill) bindFill(node, def.fill);
  } else {
    // frame (default)
    node = figma.createFrame();
    node.layoutMode = def.dir === 'vertical' ? 'VERTICAL' : (def.dir === 'none' ? 'NONE' : 'HORIZONTAL');
    if (node.layoutMode !== 'NONE') {
      node.primaryAxisSizingMode = def.grow ? 'FIXED' : 'AUTO';
      node.counterAxisSizingMode = 'AUTO';
      node.itemSpacing = def.gap != null ? def.gap : 0;
      node.primaryAxisAlignItems = def.justify || 'MIN';
      node.counterAxisAlignItems = def.align || 'CENTER';
      const p = def.padding || {};
      node.paddingTop = p.t || 0; node.paddingBottom = p.b || 0;
      node.paddingLeft = p.l || 0; node.paddingRight = p.r || 0;
    }
    node.fills = [];
    if (def.fill) bindFill(node, def.fill);
    if (def.stroke) bindStroke(node, def.stroke, def.strokeWeight);
    if (def.radius != null) node.cornerRadius = def.radius;
    if (def.effect && def.effect.shadow) {
      const es = figma.getLocalEffectStyles().find((s) => s.name === `Bridger/shadow-${def.effect.shadow}`);
      if (es) node.effectStyleId = es.id;
    }
    if (def.w) { node.resize(def.w, node.height); node.primaryAxisSizingMode = 'FIXED'; }
    if (def.h) { node.resize(node.width, def.h); node.counterAxisSizingMode = 'FIXED'; }
    (def.children || []).forEach((c) => node.appendChild(buildNode(c)));
  }
  if (def.name) node.name = def.name;
  if (def.grow) node.layoutGrow = 1;
  return node;
}

function bindTextStyle(node, styleName) {
  const ts = figma.getLocalTextStyles().find((s) => s.name === styleName);
  if (ts) node.textStyleId = ts.id;
}

async function buildComponents(spec) {
  ui(`컴포넌트 ${spec.components.length}종 생성 중…`, 'dim');
  // page
  let page = figma.root.children.find((p) => p.name === 'Bridger / Components');
  if (!page) { page = figma.createPage(); page.name = 'Bridger / Components'; }
  figma.currentPage = page;

  let x = 0, y = 0, rowH = 0, count = 0;
  const GAP = 80, MAXW = 1600;

  for (const comp of spec.components) {
    const variants = [];
    for (const vDef of comp.variants) {
      const inst = buildNode(vDef.node);
      // variant name in Figma form: "Prop=Value, Prop2=Value2"
      inst.name = vDef.props
        ? Object.keys(vDef.props).map((k) => `${k}=${vDef.props[k]}`).join(', ')
        : 'Default';
      const c = figma.createComponentFromNode(inst);
      variants.push(c);
    }
    let set;
    if (variants.length > 1) {
      set = figma.combineAsVariants(variants, page);
    } else {
      set = variants[0];
    }
    set.name = comp.name;
    set.layoutMode = 'HORIZONTAL';
    set.itemSpacing = 24;
    set.paddingTop = set.paddingBottom = set.paddingLeft = set.paddingRight = 24;
    set.primaryAxisSizingMode = 'AUTO';
    set.counterAxisSizingMode = 'AUTO';

    // grid placement
    if (x + set.width > MAXW) { x = 0; y += rowH + GAP; rowH = 0; }
    set.x = x; set.y = y;
    x += set.width + GAP;
    rowH = Math.max(rowH, set.height);
    count += 1;
    ui(`  ✓ ${comp.name}`, 'ok');
  }
  figma.viewport.scrollAndZoomIntoView(page.children);
  ui(`✓ ${count}개 컴포넌트`, 'ok');
}

// ---- MAIN -----------------------------------------------------------------
figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'sync') return;
  try {
    if (msg.doVars && msg.tokens) {
      await buildVariables(msg.tokens);
      await buildTextStyles(msg.tokens);
      await buildEffectStyles(msg.tokens);
    } else if (msg.tokens) {
      // components need variables to bind against; build them silently if not requested
      await buildVariables(msg.tokens);
      await buildEffectStyles(msg.tokens);
    }
    if (msg.doComponents && msg.spec) {
      await probeFonts();
      await ensureFonts();
      await buildComponents(msg.spec);
    }
    figma.ui.postMessage({ type: 'done' });
    figma.notify('Bridger 동기화 완료');
  } catch (e) {
    figma.ui.postMessage({ type: 'error', msg: e.message });
    figma.notify('동기화 오류: ' + e.message, { error: true });
  }
};
