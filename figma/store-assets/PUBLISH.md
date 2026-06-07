# Figma Community 퍼블리시 가이드 + 메타데이터

Figma 플러그인은 **데스크톱 앱에서 사람이 직접** 퍼블리시해야 합니다 (CI/API 퍼블리시 불가).
아래 메타데이터를 그대로 입력하면 됩니다.

## 입력 폼 값

| 필드 | 값 |
| --- | --- |
| **Name** | Bridger Design System Sync |
| **Tagline** | 공공 API 콘솔용 디자인 토큰 + 40개 컴포넌트를 GitHub에서 Figma로 |
| **Category** | Libraries (또는 Design tools) |
| **Tags** | design system, design tokens, variables, components, korean, console |
| **Icon** | `store-assets/icon.png` (128×128) |
| **Cover art** | `store-assets/cover.png` (1920×960) |

## Description (붙여넣기용)

```
Bridger Design System Sync

브릿저(datari) 디자인 시스템 — 공공 API 게이트웨이 콘솔용 — 을 코드 한 벌에서
Figma로 가져옵니다. GitHub 공개 레포에서 토큰과 컴포넌트 스펙을 직접 읽어
Figma Variables(Light/Dark), Text/Effect 스타일, 그리고 40개 Component Set을
버튼 하나로 생성합니다.

생성물:
· Variables 컬렉션 1개 (Light/Dark 2모드) — 색·간격·radius
· Text Styles 6종 (Pretendard / JetBrains Mono)
· Effect Styles 4종 (그림자)
· Component Set 40개 (Button, Badge, Card, Table, Sidebar, CommandPalette …)

소스가 바뀌면 레포의 CI가 산출물을 재생성하므로, 플러그인을 다시 실행하면
항상 최신 디자인 시스템이 반영됩니다.

사용법: 실행 → repo/branch 확인 → "동기화 실행".
폰트(Pretendard Variable / JetBrains Mono)가 없으면 Inter로 자동 폴백합니다.
```

## 퍼블리시 절차

1. Figma 데스크톱 → Plugins → Development → **Import plugin from manifest…** → `figma/plugin/manifest.json`
2. 실행해서 정상 동작 확인 (Variables + 40개 컴포넌트 생성되는지)
3. Plugins → Development → 플러그인 `...` → **Publish…**
4. 위 메타데이터 + 아이콘/커버 업로드 → 제출 → Figma 리뷰 대기

## manifest의 `id` 참고

현재 `manifest.json`의 `"id": "bridger-design-system-sync"`는 **개발용 임시값**입니다.
퍼블리시를 시작하면 Figma가 고유 플러그인 ID를 발급하고 manifest를 자동으로
덮어씁니다. 그 변경된 manifest를 레포에 커밋해두면 됩니다 (재퍼블리시 시 동일 ID 유지).
