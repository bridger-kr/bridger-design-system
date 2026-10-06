---
"@bridger-kr/tokens": minor
---

Font loading overhaul (DS v2 gap #46).

- Pretendard Variable now ships as a 92-slice woff2 dynamic subset
  (`assets/fonts/pretendard/`, `unicode-range` per `@font-face`), cut from the
  shipped master by `scripts/subset-fonts.py` using the upstream
  `pretendard@1.3.9` slice definitions in `scripts/pretendard-ranges.json`.
  Pages download only the slices they render instead of the full 2MB font.
  The full `PretendardVariable.woff2` master stays published for offline
  documents and the Figma plugin, but `css/fonts.css` no longer references it.
- JetBrains Mono is now actually shipped: a single ASCII/box-drawing subset
  (`assets/fonts/JetBrainsMono.subset.woff2`, OFL 1.1 in
  `OFL-JetBrainsMono.txt`) declared in `fonts.css` with a `unicode-range`, so
  it is only fetched when a page renders code.
- `--dt-font-mono` (CSS and `typography.fontFamilies.mono`) is now
  `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas,
  'Pretendard Variable', monospace` — `'Geist Mono'` removed, and
  `'Pretendard Variable'` sits before the generic `monospace` so Korean
  glyphs inside code surfaces keep a consistent fallback width. The mono
  stack is ASCII-only by policy (DESIGN.md §4.3).
