The unit of the MCP catalog and tool list: category + HTTP-method chips, tool name, clamped description, mono path, and a usability status dot.

```jsx
<ToolCard
  name="weather_getUltraSrtNcst"
  method="GET"
  description="초단기 실황 — 기온, 습도, 강수형태."
  path="/v1/weather/ultra-srt-ncst"
  state="available"
/>
<ToolCard name="realestate_getRTMSData" state="locked" />
```

State: `available` / `managed` / `locked`.
