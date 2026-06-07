Bridger button — primary (single strongest action / persimmon), secondary, or ghost. Use for any clickable command.

```jsx
<Button variant="primary" onClick={save}>저장</Button>
<Button variant="secondary" iconRight={<ArrowRight size={15} />}>로그 열기</Button>
<Button variant="ghost" size="sm" icon={<LogOut size={14} />}>로그아웃</Button>
```

Variants: `primary` (one per screen), `secondary`, `ghost`. Sizes: `sm` / `md` / `lg`. Pass Lucide icons via `icon` / `iconRight`. Supports `disabled`.
