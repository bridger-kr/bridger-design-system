Compact labeled text input, paired with a label or table context. `mono` for API paths / keys / IDs.

```jsx
<Input label="베이스 URL" mono defaultValue="https://api.datari.kr" prefix={<Database size={14} />} />
<Input label="검색" placeholder="공공 API 검색…" />
```

Props: `label`, `hint`, `mono`, `prefix`, `invalid`, plus native input attributes.
