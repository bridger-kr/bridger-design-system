import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fontsCssPath = resolve(pkgDir, 'css/fonts.css');
const fontsCss = readFileSync(fontsCssPath, 'utf8');
const rangesPath = resolve(pkgDir, 'scripts/pretendard-ranges.json');
const rangesJson = JSON.parse(readFileSync(rangesPath, 'utf8')) as { ranges: string[] };
const contractCss = readFileSync(resolve(pkgDir, 'css/contract.css'), 'utf8');

interface FontFace {
  family: string;
  src: string[];
  unicodeRange?: string;
}

function parseFaces(css: string): FontFace[] {
  const faces: FontFace[] = [];
  for (const match of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
    const body = match[1];
    const family = /font-family:\s*'([^']+)'/.exec(body)?.[1] ?? '';
    const src = [...body.matchAll(/url\('([^']+)'\)/g)].map((m) => m[1]);
    const unicodeRange = /unicode-range:\s*([^;]+);/.exec(body)?.[1].trim();
    faces.push({ family, src, unicodeRange });
  }
  return faces;
}

function expandUnicodeRange(rangeExpr: string): Set<number> {
  const cps = new Set<number>();
  for (const part of rangeExpr.split(',')) {
    const token = part.trim().replace(/^U\+/i, '');
    if (token.includes('-')) {
      const [lo, hi] = token.split('-');
      for (let cp = parseInt(lo, 16); cp <= parseInt(hi, 16); cp += 1) cps.add(cp);
    } else if (token.includes('?')) {
      const lo = parseInt(token.replace(/\?/g, '0'), 16);
      const hi = parseInt(token.replace(/\?/g, 'F'), 16);
      for (let cp = lo; cp <= hi; cp += 1) cps.add(cp);
    } else {
      cps.add(parseInt(token, 16));
    }
  }
  return cps;
}

const faces = parseFaces(fontsCss);
const pretendardFaces = faces.filter((f) => f.family === 'Pretendard Variable');
const jetbrainsFaces = faces.filter((f) => f.family === 'JetBrains Mono');

describe('fonts.css delivery contract', () => {
  it('ships Pretendard Variable as one @font-face per dynamic-subset slice', () => {
    expect(pretendardFaces).toHaveLength(rangesJson.ranges.length);
    for (const [i, face] of pretendardFaces.entries()) {
      expect(face.unicodeRange, `slice ${i} must declare unicode-range`).toBeTruthy();
      expect(face.src).toEqual([
        `../assets/fonts/pretendard/PretendardVariable.subset.${i}.woff2`,
        `../assets/fonts/pretendard/PretendardVariable.subset.${i}.woff2`,
      ]);
    }
  });

  it('never references the 2MB full-glyph master in fonts.css', () => {
    expect(fontsCss).not.toMatch(/url\([^)]*PretendardVariable\.woff2/);
  });

  it('resolves every url() to a real file under assets/fonts/', () => {
    for (const face of faces) {
      expect(face.src.length).toBeGreaterThan(0);
      for (const url of face.src) {
        const target = resolve(dirname(fontsCssPath), url);
        expect(existsSync(target), `${url} should exist`).toBe(true);
      }
    }
  });

  it('covers every Hangul syllable (U+AC00–U+D7A3) across the slices', () => {
    const covered = new Set<number>();
    for (const range of rangesJson.ranges) {
      for (const cp of expandUnicodeRange(range)) covered.add(cp);
    }
    const missing: string[] = [];
    for (let cp = 0xac00; cp <= 0xd7a3; cp += 1) {
      if (!covered.has(cp)) missing.push(`U+${cp.toString(16).toUpperCase()}`);
    }
    expect(missing).toEqual([]);
  });

  it('declares each slice unicode-range identical to pretendard-ranges.json', () => {
    for (const [i, face] of pretendardFaces.entries()) {
      const declared = face.unicodeRange?.replace(/\s+/g, ' ').toLowerCase();
      const expected = rangesJson.ranges[i].replace(/\s+/g, ' ').toLowerCase();
      expect(declared).toBe(expected);
    }
  });

  it('ships a JetBrains Mono ASCII subset with its OFL license', () => {
    expect(jetbrainsFaces).toHaveLength(1);
    const face = jetbrainsFaces[0];
    expect(face.unicodeRange).toBeTruthy();
    const cps = expandUnicodeRange(face.unicodeRange as string);
    expect(cps.has(0x41)).toBe(true);
    expect(cps.has(0xac00)).toBe(false);
    expect(existsSync(resolve(pkgDir, 'assets/fonts/OFL-JetBrainsMono.txt'))).toBe(true);
  });

  it('keeps the mono token honest: no Geist Mono, Pretendard before generic monospace', () => {
    const monoDecl = /--dt-font-mono:\s*([^;]+);/.exec(contractCss)?.[1] ?? '';
    expect(monoDecl).toContain("'JetBrains Mono'");
    expect(monoDecl).not.toContain('Geist Mono');
    expect(monoDecl.trim().endsWith("'Pretendard Variable', monospace")).toBe(true);
  });
});
