# ConsoleShell

Console application frame. One component owns the chrome every authenticated
console screen shares — navigation rail, mobile drawer, topbar slots, status
banners, skip link, and the main landmark — so apps never rebuild the shell.

## Slots

`productName` (required), `logo`, `navigation` (SidebarSection[]), `activeRoute`,
`accountMenu`, `workspaceSwitcher`, `workspaceStatus`, `workspaceNotice`,
`globalActions`, `help`, `banners`, `mobileBreakpoint` (default 768),
`onNavigate`, `collapsed`/`defaultCollapsed`/`onCollapsedChange`, `collapsible`,
`mainId`, `navLabel`, `routePending`, `children`.

## Behavior contract

- Desktop: sticky nav rail + content column. `collapsible` adds a rail toggle;
  the collapsed 64px rail keeps labels in the a11y tree and exposes native
  `title` tooltips.
- Mobile (< `mobileBreakpoint`): rail is replaced by a hamburger trigger that
  opens a modal left drawer (200ms transform+opacity). Selecting a route
  closes the drawer and returns focus to the trigger.
- Skip link: first tabbable element, jumps to `#mainId` (the content `<main>`).
- Route transitions: when `activeRoute` changes, focus moves to the main `h1`
  (or `<main>`). Scroll/back-forward restore stays with the app router.
- Banners stack above the content column ordered critical → warning → info;
  critical uses `role="alert"`, others `role="status"`.
- Workspace: `workspaceStatus` of `pending`/`success`/`error` renders the
  localized status line next to `workspaceSwitcher`; `error` keeps the
  previous context visible (no unmount).
- `routePending` dims main at the ≤140ms fast duration.
- Reduced motion: all shell transitions collapse to instant under
  `prefers-reduced-motion`.

## Migration checklist (app-side)

1. Replace the app's hand-rolled sidebar/topbar layout with `<ConsoleShell>`.
2. Feed the router's location into `activeRoute` and `onNavigate`
   (`event.preventDefault()` for client-side transitions).
3. Move global toasts/alerts into `banners` with the right `tone`.
4. Drive `workspaceStatus` from the real workspace-switch mutation lifecycle.
5. Keep one `h1` per route (ConsolePageHeader) — the shell focuses it.
