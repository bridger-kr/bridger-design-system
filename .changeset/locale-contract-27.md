---
'@bridger-kr/react': patch
---

Locale contract tightenings (DS #27): `useDSLocale()` exposes the ambient 'ko'|'en' for Intl-aware formatting (UsageMeter now groups numbers through `Intl.NumberFormat`); `DSLocaleProvider` warns in development when a `messages` override references a key not in the catalog; `CommandPalette` ignores an Enter fired mid-IME composition so Korean input doesn't select early; `CodePane` copy labels resolve through the message catalog (the previous Korean literals shadowed the fallback and the resolved values were never passed on).
