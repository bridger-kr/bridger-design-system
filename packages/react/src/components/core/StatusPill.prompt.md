Status pill: a semantic colored dot plus a short label in a bordered chip. The console's standard live-state indicator (gateway, stream, jobs).

```jsx
<StatusPill status="connected">실시간</StatusPill>
<StatusPill status="reconnecting" pulse>재연결 중</StatusPill>
<StatusPill status="disconnected">연결 확인 필요</StatusPill>
```

Status: `connected` `reconnecting` `disconnected` `success` `warning` `danger` `info` `idle`. `pulse` animates the dot.
