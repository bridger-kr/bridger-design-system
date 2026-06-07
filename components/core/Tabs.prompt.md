Underline tab bar for switching between console views. Active tab gets a persimmon underline.

```jsx
<Tabs
  defaultValue="tools"
  onChange={setView}
  tabs={[
    { id: 'tools', label: '도구', count: 42 },
    { id: 'logs', label: '실행 로그' },
  ]}
/>
```

Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`). Each tab supports an optional Lucide `icon` and a `count`.
