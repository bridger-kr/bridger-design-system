The dashboard's primary content wrapper: a plain noun-phrase H3 title, optional description, and a right-side action, framing a body. No eyebrow kicker — the title carries the section on its own.

```jsx
<SectionCard
  title="최근 파이프라인"
  description="등록과 검증 작업 상태."
  action={<Button variant="ghost" size="sm">로그 열기</Button>}
>
  <table>…</table>
</SectionCard>
```
