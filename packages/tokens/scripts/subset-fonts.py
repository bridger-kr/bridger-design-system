#!/usr/bin/env python3
"""Regenerate the web font assets shipped by @bridger-kr/tokens.

Requires: pip install fonttools brotli

Pretendard Variable ships as a 92-slice dynamic subset (woff2 +
unicode-range) so a page only downloads the slices its text needs. The
slice definitions in pretendard-ranges.json mirror the official
pretendard@1.3.9 dynamic-subset release; the slices themselves are cut
from our own assets/fonts/PretendardVariable.woff2 so the subset can
never drift from the shipped master.

  python3 subset-fonts.py pretendard                 # write the 92 slices
  python3 subset-fonts.py pretendard --emit-css      # also rewrite ../css/fonts.css
  python3 subset-fonts.py pretendard --print-preload # print the slice to preload

JetBrains Mono ships as a single ASCII/box-drawing subset (code surfaces
are ASCII-only per DESIGN.md). Download the upstream release first:

  curl -LO https://github.com/JetBrains/JetBrainsMono/releases/download/v2.304/JetBrainsMono-2.304.zip
  unzip -j JetBrainsMono-2.304.zip 'fonts/variable/JetBrainsMono[wght].ttf'
  python3 subset-fonts.py jetbrains --source 'JetBrainsMono[wght].ttf'

The full PretendardVariable.woff2 master stays in assets/fonts/ for
offline documents and the Figma plugin; fonts.css never references it.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from fontTools import subset

SCRIPT_DIR = Path(__file__).resolve().parent
PKG_DIR = SCRIPT_DIR.parent
FONTS_DIR = PKG_DIR / 'assets' / 'fonts'
PRETENDARD_DIR = FONTS_DIR / 'pretendard'
PRETENDARD_SRC = FONTS_DIR / 'PretendardVariable.woff2'
PRETENDARD_RANGES = SCRIPT_DIR / 'pretendard-ranges.json'
CSS_OUT = PKG_DIR / 'css' / 'fonts.css'

JETBRAINS_OUT = FONTS_DIR / 'JetBrainsMono.subset.woff2'
JETBRAINS_UNICODES = 'U+0020-007E,U+00A0-00FF,U+2010-2027,U+2190-2193,U+2500-257F'

PRETENDARD_FEATURES = 'kern,liga,calt,tnum,case'
JETBRAINS_FEATURES = 'kern,calt,tnum'

CSS_HEADER = """/* ============================================================
   Bridger — Fonts

   Pretendard Variable ships as a 92-slice dynamic subset
   (unicode-range); the browser fetches only the slices a page
   actually renders. Regenerate the slices and this file with
   packages/tokens/scripts/subset-fonts.py.

   JetBrains Mono ships as a single ASCII/box-drawing subset for
   code surfaces. Korean glyphs inside --dt-font-mono fall back
   to 'Pretendard Variable' before the generic monospace.

   The full PretendardVariable.woff2 master remains under
   assets/fonts/ for offline documents and the Figma plugin; it
   is intentionally not referenced here.
============================================================ */
"""

JETBRAINS_FACE = """
/* JetBrains Mono — code/ID surfaces only (ASCII + box drawing). */
@font-face {
  font-family: 'JetBrains Mono';
  font-weight: 400 600;
  font-style: normal;
  font-display: swap;
  src: url('../assets/fonts/JetBrainsMono.subset.woff2') format('woff2-variations'),
       url('../assets/fonts/JetBrainsMono.subset.woff2') format('woff2');
  unicode-range: U+0020-007E, U+00A0-00FF, U+2010-2027, U+2190-2193, U+2500-257F;
}
"""

PRETENDARD_FACE = """
/* Pretendard Variable — dynamic subset slice {index} */
@font-face {{
  font-family: 'Pretendard Variable';
  font-weight: 45 920;
  font-style: normal;
  font-display: swap;
  src: url('../assets/fonts/pretendard/PretendardVariable.subset.{index}.woff2') format('woff2-variations'),
       url('../assets/fonts/pretendard/PretendardVariable.subset.{index}.woff2') format('woff2');
  unicode-range: {range};
}}
"""

# Probe glyphs used by --print-preload: printable ASCII plus the most
# frequent Hangul syllables/jamo. The winning slice is the one page
# shells should <link rel="preload">.
PRELOAD_PROBES = [chr(c) for c in range(0x20, 0x7F)] + list(
    '가나다라마바사아자차카타파하이의는을를은에도로한국서비스')


def load_ranges() -> list[str]:
    data = json.loads(PRETENDARD_RANGES.read_text(encoding='utf-8'))
    return data['ranges']


def expand_range(range_expr: str) -> set[int]:
    """Expand a CSS unicode-range value into a set of codepoints."""
    cps: set[int] = set()
    for part in range_expr.split(','):
        token = part.strip()
        if token.upper().startswith('U+'):
            token = token[2:]
        if '-' in token:
            lo, hi = token.split('-')
            cps.update(range(int(lo, 16), int(hi, 16) + 1))
        elif '?' in token:
            lo = int(token.replace('?', '0'), 16)
            hi = int(token.replace('?', 'F'), 16)
            cps.update(range(lo, hi + 1))
        else:
            cps.add(int(token, 16))
    return cps


def run_subset(source: Path, out: Path, unicodes: str, features: str) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    subset.main([
        str(source),
        f'--unicodes={unicodes}',
        f'--layout-features={features}',
        '--no-hinting',
        '--desubroutinize',
        '--flavor=woff2',
        f'--output-file={out}',
    ])


def pretendard(args: argparse.Namespace) -> int:
    ranges = load_ranges()
    if not PRETENDARD_SRC.exists():
        print(f'missing source font: {PRETENDARD_SRC}', file=sys.stderr)
        return 1

    if args.print_preload:
        probes = {ord(c) for c in PRELOAD_PROBES}
        best = max(range(len(ranges)), key=lambda i: len(expand_range(ranges[i]) & probes))
        hit = len(expand_range(ranges[best]) & probes)
        print(best)
        print(f'# slice {best}: covers {hit}/{len(probes)} preload probe glyphs '
              f'(ASCII + highest-frequency Hangul)', file=sys.stderr)
        return 0

    for i, range_expr in enumerate(ranges):
        out = PRETENDARD_DIR / f'PretendardVariable.subset.{i}.woff2'
        run_subset(PRETENDARD_SRC, out, range_expr, PRETENDARD_FEATURES)
        print(f'{out.relative_to(PKG_DIR)} {out.stat().st_size} B')

    if args.emit_css:
        css = CSS_HEADER + JETBRAINS_FACE + ''.join(
            PRETENDARD_FACE.format(index=i, range=range_expr)
            for i, range_expr in enumerate(ranges)
        )
        CSS_OUT.write_text(css.lstrip('\n') if css.startswith('\n') else css, encoding='utf-8')
        print(f'wrote {CSS_OUT.relative_to(PKG_DIR)}')

    return 0


def jetbrains(args: argparse.Namespace) -> int:
    source = Path(args.source) if args.source else None
    if source is None or not source.exists():
        print('jetbrains mode needs --source <path to JetBrainsMono[wght].ttf>',
              file=sys.stderr)
        return 1
    run_subset(source, JETBRAINS_OUT, JETBRAINS_UNICODES, JETBRAINS_FEATURES)
    print(f'{JETBRAINS_OUT.relative_to(PKG_DIR)} {JETBRAINS_OUT.stat().st_size} B')
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = parser.add_subparsers(dest='command', required=True)

    p = sub.add_parser('pretendard', help='build the 92 dynamic-subset slices')
    p.add_argument('--emit-css', action='store_true',
                   help=f'rewrite {CSS_OUT.name} to match the slices')
    p.add_argument('--print-preload', action='store_true',
                   help='print the slice index to preload (ASCII + frequent Hangul)')
    p.set_defaults(func=pretendard)

    j = sub.add_parser('jetbrains', help='build the JetBrains Mono ASCII subset')
    j.add_argument('--source', help='path to JetBrainsMono[wght].ttf')
    j.set_defaults(func=jetbrains)

    args = parser.parse_args()
    return args.func(args)


if __name__ == '__main__':
    raise SystemExit(main())
