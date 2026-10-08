---
"@bridger-kr/react": patch
---

Clean up `.dt-sidebar` toward a quieter console rail (litellm/OpenAI-style):
remove the brand-block divider, drop section headings to caption size, and
keep the active row's icon neutral (`--dt-text-strong`) instead of persimmon
so accent stays limited to brand/focus/selection roles. Sidebar item
transitions are now suppressed under `prefers-reduced-motion` like the other
console chrome.
