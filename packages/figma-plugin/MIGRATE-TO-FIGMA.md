# Bridger 디자인 시스템 → Figma 이전 가이드

코드 기반(CSS 토큰 + React 컴포넌트) → Figma로 옮기는 절차서.
목표: **토큰 + 컴포넌트** 둘 다 Figma에 네이티브로 올리기.

> 현재는 `packages/figma-plugin/`의 자동 동기화 플러그인이 이 절차를 대체합니다.
> 이 문서는 플러그인 이전의 수동 이전 기록과 검수 체크리스트로 유지합니다.

자동 변환 도구는 신뢰할 수 없으므로, **토큰은 반자동(JSON import)**,
**컴포넌트는 수작업 재현(Variants + Auto-layout)**으로 간다.

---

## 0. 준비물

| 항목 | 용도 | 비고 |
|---|---|---|
| **Tokens Studio for Figma** 플러그인 | 토큰 JSON → Figma Variables | 무료 플랜으로 충분 |
| `packages/figma-plugin/bridger-tokens.tokens.json` | 변환된 토큰 (이 폴더에 생성됨) | 바로 import |
| **Pretendard Variable** 폰트 | 본문/UI | 로컬 설치 또는 Figma 조직 폰트 업로드 (`assets/fonts/PretendardVariable.woff2`) |
| **JetBrains Mono** | 코드/API/타임스탬프 | Google Fonts → Figma 기본 제공 |

> 폰트는 **import 전에** Figma가 인식해야 한다. Pretendard Variable을 OS에 먼저 설치하거나
> Figma Organization Fonts에 업로드해 둘 것. 안 그러면 typography 토큰이 fallback으로 깨진다.

---

## 1. 토큰 import (반나절)

### 1-1. 플러그인 설치
Figma → 우상단 메뉴 → Plugins → **Tokens Studio for Figma** 설치.

### 1-2. JSON 불러오기
1. 플러그인 열기 → 좌하단 톱니(Settings) 옆 **⋯** → **Import** (또는 첫 화면의 "Import")
2. `packages/figma-plugin/bridger-tokens.tokens.json` 선택
3. import 후 좌측에 토큰 셋이 보임:
   - `color/light`, `color/dark` (테마 2벌)
   - `spacing`, `radius`, `fontSize`, `lineHeight`, `letterSpacing`, `fontFamily`, `fontWeight`
   - `typography` (합성 텍스트 스타일)
   - `boxShadow`

### 1-3. Figma Variables로 내보내기
Tokens Studio 하단 **Export** → **Export to Figma (Variables)**.
- `color/light`와 `color/dark`는 **하나의 Collection 안의 두 Mode**로 묶는 게 정석:
  - Collection 이름: `Bridger Color`
  - Mode 1: `Light`, Mode 2: `Dark`
  - import 시 두 셋을 같은 collection에 mode로 매핑 (플러그인의 "Themes" 기능 사용 권장)
- `typography` → **Figma Text Styles**로 생성됨 (Variables 아님, Styles)
- `boxShadow` → **Figma Effect Styles**로 생성됨

### 1-4. 검증
- Variables 패널(우측 사이드바)에서 `accent/accent = #ec5e1f` (Light) / `#ec5e1f` (Dark) 확인
- 사각형 하나 그려서 fill을 `surface/surface`로 잡고 Mode를 Dark로 토글 → `#14151b`로 바뀌면 성공

> ⚠️ **변환 시 손실된 것 (CSS → Figma 한계):**
> - `color-mix()` → 정적 rgba로 미리 계산해 넣음 (tint 6종, accent-soft). 동작은 동일.
> - `clamp()` 반응형 폰트(h1/h2) → **고정 px**로 박음 (h1=56, h2=34). Figma엔 clamp 개념 없음.
> - `--dt-divider`(50% 투명 border) → 생략. 필요하면 `border/border`에 50% opacity 수동 적용.
> - 모션/ease/glass-blur 토큰 → Figma Variables 대상 아님. 프로토타입 설정에서 수동 (아래 4절).

---

## 2. 컴포넌트 재현 — 공통 원칙

코드 컴포넌트는 모두 토큰을 참조한다. Figma에서도 **하드코딩 금지, 무조건 Variable 바인딩**.

핵심 디자인 규칙(readme 기준, 반드시 지킬 것):
- **카드는 그림자 없음(rest).** 1px border(`border/border`)로만 구분. hover에서만 `border-strong` + shadow-sm.
- **radius는 크리스프.** 태그/작은 컨트롤 3~4px, 패널 6px, 큰 면 8~10px, pill/avatar/dot만 full.
- **persimmon은 화면당 1개 액션만.** 나머지 색은 status 의미 전용.
- **eyebrow kicker 금지**, **카드 안의 카드 금지**, **emoji 금지**.
- 폰트: Pretendard(한글/UI), JetBrains Mono(코드/API/숫자), tracking 0 (대형 헤딩만 음수).

각 컴포넌트는 **Component Set(Variants)** 으로 만들고 **Auto-layout** 필수.

---

## 3. 컴포넌트별 스펙 (코드 1:1 매핑)

아래 수치는 실제 소스(`tokens/base.css`, `components/`)에서 그대로 뽑은 값이다.

### Button (`components/core/Button.jsx` + `.btn-*`)
Component Set 속성 2개: **Variant**(primary/secondary/ghost) × **Size**(sm/md/lg)

| Variant | 배경 | 글자색 | hover |
|---|---|---|---|
| primary | `accent/accent` | `accent/accent-ink` | `accent/accent-strong` |
| secondary | `surface/surface-sunken` | `ink/ink-strong` | sunken을 ink로 10% 섞음 (수동) |
| ghost | 투명 | `ink/muted-strong` | bg `tint/tint-muted`, 글자 `ink/ink-strong` |

| Size | height | padding | font-size |
|---|---|---|---|
| sm | 36 | 0 14 | 13 |
| md | 40 | 0 16 | 14 |
| lg | 48 | 0 20 | 15 |

- radius: `radius/md` (4px), font-weight 600, gap 6, Auto-layout 가로 center
- disabled: opacity 0.55 (별도 boolean variant로 추가 권장)
- icon/iconRight 슬롯: 좌우 24px 인스턴스 스왑 슬롯으로

### Badge (`components/core/Badge.jsx` + `.badge-*`)
Variant: neutral / accent / info / success / warning / danger, boolean `dot`

- padding 3 8, font-size 12, weight 600, radius `radius/sm` (3px), gap 6
- **fill = tint, 글자 = solid, 1px inset border = solid 32%** (예: accent → bg `tint/tint-accent`, text `accent/accent`, border accent 32%)
- neutral만 예외: bg `surface/surface-sunken`, text `ink/muted-strong`, border `border/border-strong`
- dot: 6×6 원, fill currentColor(=글자색과 동일 variable)

### StatusPill (`components/core/StatusPill.jsx`)
Variant: connected/success, reconnecting/warning, disconnected/danger, info, idle + boolean `pulse`

- radius `radius/full`, padding 4 10, font-size 12, weight 600, gap 6
- fill = 해당 `tint/*`, 글자 = 해당 status solid
- pulse: 7×7 원 + opacity 1→0.35 깜빡임 (Figma는 Smart Animate 프로토타입으로만 흉내 가능)
- **Badge와 구분:** Pill은 full-radius(=라이브 상태), Badge는 3px(=분류 태그). 절대 섞지 말 것.

### Card (`.card` / `.card-muted` / `.card-raised`)
Variant: default / muted / raised + boolean `hover`

- 공통: radius `radius/lg` (6px)
- default(rest): bg `surface/surface`, **그림자 없음**, 1px border `border/border`
- hover: border `border/border-strong` + Effect `shadow/sm`
- muted: bg `surface/surface-sunken`, 1px `border/border`
- raised: bg `surface/surface-raised`, border-strong + `shadow/md`
- 내부 패딩은 Auto-layout으로 (보통 16 또는 24 = `spacing/3`,`spacing/4`)

### Input / 폼 필드 (`.dt-field`)
- bg `surface/surface-sunken`, border 없음, radius `radius/md`
- focus: bg `surface/surface` + 3px accent ring(Effect: `shadow/focus` = accent 22%)
- invalid: 1.5px `status/danger` ring

> 나머지 35개 컴포넌트(Table, Select, Toast, Dialog, Sidebar, CommandPalette 등)도
> 동일 패턴: 소스 `.jsx` + base.css 클래스에서 값 뽑아 → Variable 바인딩 → Variants.
> core 7종을 먼저 끝내고 그걸 인스턴스로 조립하면 data/feedback/nav 계열은 빠르게 따라온다.

---

## 4. 모션/glass (토큰 밖 — 수동)

Figma Variables가 못 담는 것들. 프로토타입/Effect로 처리:
- ease `cubic-bezier(0.22,1,0.36,1)` → 프로토타입 Animation에서 Custom bezier 입력
- 시간: fast 130ms / base 200ms / slow 420ms
- press = `scale(0.97)`, hover card = `translateY(-2px)`
- glass navbar: Effect → **Background blur 20px** + bg를 paper 72% opacity로

---

## 5. 권장 순서 (실전)

1. **토큰 import** (1절) — 반나절. 이게 끝나야 컴포넌트가 의미 있다.
2. **Foundations 페이지** 만들기 — color/type/spacing/radius 스와치를 Variable로 깔아 검수
3. **core/ 7종** Variants 제작 (Button, Badge, StatusPill, Card, Input, Tabs, FilterChip)
4. **forms/ + data/ + feedback/ + navigation/** — core 인스턴스 조립으로 확장
5. **product/** (BrandLogo, SectionCard, ToolCard) → ui_kit 화면 조립

---

## 부록: Light/Dark 어느 쪽이 기본인가?

소스가 충돌한다:
- `readme.md` / `tokens/colors.css` → **Light가 기본** (`#ec5e1f`), Dark는 parity
- `SKILL.md` → "Dark가 기본" (`#ec5e1f`)

readme가 명시적으로 *"We build on the **codebase contract**, not the Figma exploration"*
라고 못박았고, `colors.css`의 `:root`가 light다. 따라서 이 JSON은 **Light를 기본(Mode 1)**,
Dark를 Mode 2로 잡았다. 팀 합의가 Dark-first면 Figma에서 Mode 순서만 바꾸면 된다.
