---
'@bridger-kr/react': patch
---

Fix `Checkbox` accessible naming (EDD-260): the wrapping `<label>` set `htmlFor` to an id that Base UI places on the hidden input, leaving the rendered `role="checkbox"` button with an empty accessible name. The control now receives `aria-labelledby` pointing at the label span (implicit label association restored), and `aria-label`/`aria-labelledby`/`aria-describedby` props are forwarded to the control so label-less call sites can still name it.
