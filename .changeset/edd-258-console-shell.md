---
'@bridger-kr/react': minor
---

Add `ConsolePageHeader` (EDD-258): the flat console route header — a single 20px/600 `h1`, 14px subtle description, and right-aligned actions (keep to two or fewer) shared by every authenticated page. It intentionally has no eyebrow prop; console pages do not carry decorative kickers, and `ProductPageHeader` remains the landing-side hero.

`Sidebar` contract updates for the console shell (EDD-258): default width is now 240px, rows are 32px tall on desktop and grow back to the 40px touch target inside the mobile drawer, group headings render at 12px, and the active item is a sunken row without the persimmon marker or accent icon. Items accept `external` for cross-host links (new tab + `noreferrer`) and `onNavigate` lets apps intercept plain clicks for client-side routing while modifier/middle clicks keep native behavior.

Fix `Table` JSX usability under React 19 types: the inferred return union included `bigint`/other non-`ReactNode` members, so `<Table>` failed `tsc` in consumers. The empty-state early return is now wrapped in a fragment, so the component's inferred return stays a valid JSX element type (`react.JSX.Element` in the emitted declarations).
