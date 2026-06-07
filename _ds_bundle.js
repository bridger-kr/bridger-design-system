/* @ds-bundle: {"format":3,"namespace":"BridgerDesignSystem_8a786f","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"FilterChip","sourcePath":"components/core/FilterChip.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"StatusPill","sourcePath":"components/core/StatusPill.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"CodeBlock","sourcePath":"components/data/CodeBlock.jsx"},{"name":"KeyValue","sourcePath":"components/data/KeyValue.jsx"},{"name":"LogRow","sourcePath":"components/data/LogRow.jsx"},{"name":"Pagination","sourcePath":"components/data/Pagination.jsx"},{"name":"StatTile","sourcePath":"components/data/StatTile.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"UsageMeter","sourcePath":"components/data/UsageMeter.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Drawer","sourcePath":"components/feedback/Drawer.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Spinner","sourcePath":"components/feedback/Spinner.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Combobox","sourcePath":"components/forms/Combobox.jsx"},{"name":"FileUpload","sourcePath":"components/forms/FileUpload.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"CommandPalette","sourcePath":"components/navigation/CommandPalette.jsx"},{"name":"Menu","sourcePath":"components/navigation/Menu.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"Stepper","sourcePath":"components/navigation/Stepper.jsx"},{"name":"BrandLogo","sourcePath":"components/product/BrandLogo.jsx"},{"name":"SectionCard","sourcePath":"components/product/SectionCard.jsx"},{"name":"ToolCard","sourcePath":"components/product/ToolCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"a37e8f8bf60e","components/core/Button.jsx":"a62ca2a7e1e0","components/core/Card.jsx":"40fd6dd0071b","components/core/FilterChip.jsx":"9bd41200d0e2","components/core/Input.jsx":"0cc7473e445e","components/core/StatusPill.jsx":"a68034215b58","components/core/Tabs.jsx":"6e812f3d329b","components/data/Avatar.jsx":"12361d3156ff","components/data/CodeBlock.jsx":"1611235b9bad","components/data/KeyValue.jsx":"aed632d14d9e","components/data/LogRow.jsx":"4148c9ceb1b7","components/data/Pagination.jsx":"c0d69ef6f9af","components/data/StatTile.jsx":"2a4ac38e1b8b","components/data/Table.jsx":"2950c827cae7","components/data/UsageMeter.jsx":"7f4fbd383e2e","components/feedback/Alert.jsx":"fffd00cac787","components/feedback/Dialog.jsx":"7a5eae56e479","components/feedback/Drawer.jsx":"1dfe649de7c9","components/feedback/EmptyState.jsx":"fd0086c23253","components/feedback/Skeleton.jsx":"6053a1796b09","components/feedback/Spinner.jsx":"9435a5833bd2","components/feedback/Toast.jsx":"f58a3b4c6524","components/feedback/Tooltip.jsx":"6bbf3f7fae4e","components/forms/Checkbox.jsx":"81555a80dd85","components/forms/Combobox.jsx":"d5dd92cbe783","components/forms/FileUpload.jsx":"12eb9aba87b2","components/forms/RadioGroup.jsx":"c0d7e3c4d539","components/forms/SegmentedControl.jsx":"d1bcbd18e716","components/forms/Select.jsx":"24b742b18ee3","components/forms/Slider.jsx":"e4e768592bd7","components/forms/Switch.jsx":"d3bc6e9f2c0b","components/forms/Textarea.jsx":"70f3190f5406","components/navigation/Breadcrumb.jsx":"63e16ab1bc3d","components/navigation/CommandPalette.jsx":"64ffe3b757b4","components/navigation/Menu.jsx":"f8c6105bc543","components/navigation/Sidebar.jsx":"8b0b88304da7","components/navigation/Stepper.jsx":"2b28eef0d9a2","components/product/BrandLogo.jsx":"a2c2e1312656","components/product/SectionCard.jsx":"aab1e361f60b","components/product/ToolCard.jsx":"6f17d87b90cc","design-canvas.jsx":"bd8746af6e58","redesign/canvas.jsx":"e9d1e6dfce25","redesign/dirA.jsx":"a9e5ce18146d","redesign/dirB.jsx":"ecce99109ad7","redesign/dirC.jsx":"32b5c5ef83b5","ui_kits/console/app.jsx":"b665a72aaf2d","ui_kits/console/views.jsx":"e992812710bd","ui_kits/landing/app.jsx":"f8b478f7af50","ui_kits/landing/app2.jsx":"cc56bfb1ec1b","ui_kits/landing/app3.jsx":"87fb129031d2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BridgerDesignSystem_8a786f = window.BridgerDesignSystem_8a786f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE_CLASS = {
  neutral: 'badge',
  accent: 'badge badge-accent',
  info: 'badge badge-info',
  success: 'badge badge-success',
  warning: 'badge badge-warning',
  danger: 'badge badge-danger'
};

/**
 * Status / classification badge. Pill-shaped, tinted. Status or
 * classification only — never decorative.
 */
function Badge({
  children,
  tone = 'neutral',
  dot = false,
  style,
  ...rest
}) {
  const cls = TONE_CLASS[tone] ?? TONE_CLASS.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: style
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 6,
      height: 6,
      borderRadius: '9999px',
      background: 'currentColor',
      display: 'inline-block'
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Height grid (px) per size — matches the fill-based button recipe in base.css.
   Horizontal padding only; vertical centering comes from the fixed height. */
const SIZE = {
  sm: {
    height: 36,
    padding: '0 14px',
    fontSize: 13
  },
  md: {
    height: 40,
    padding: '0 16px',
    fontSize: 14
  },
  lg: {
    height: 48,
    padding: '0 20px',
    fontSize: 15
  }
};
const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost'
};

/**
 * Bridger button. Primary is the single strongest action per screen;
 * secondary for regular actions; ghost for low-emphasis commands.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconRight = null,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const cls = VARIANT_CLASS[variant] ?? VARIANT_CLASS.primary;
  const s = SIZE[size] ?? SIZE.md;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: disabled,
    onClick: onClick,
    style: {
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      opacity: disabled ? 0.55 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    },
    "aria-hidden": "true"
  }, icon) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    },
    "aria-hidden": "true"
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANT_STYLE = {
  default: {
    background: 'var(--dt-surface)',
    boxShadow: 'var(--dt-card-rest)'
  },
  muted: {
    background: 'var(--dt-surface-sunken)'
  },
  raised: {
    background: 'var(--dt-surface-raised)',
    boxShadow: 'var(--dt-card-float)'
  },
  panel: {
    background: 'var(--dt-surface)',
    boxShadow: 'var(--dt-shadow-xs)'
  }
};

/**
 * Surface container. Use for repeated items, modals, and genuinely framed
 * tools — not as a decorative wrapper. `panel` is the flatter console variant.
 */
function Card({
  children,
  variant = 'default',
  interactive = false,
  padding = 20,
  style,
  ...rest
}) {
  const v = VARIANT_STYLE[variant] ?? VARIANT_STYLE.default;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: interactive ? 'dt-card-interactive' : undefined,
    style: {
      borderRadius: 'var(--dt-radius-lg)',
      color: 'var(--dt-ink)',
      padding,
      transition: 'box-shadow var(--dt-motion), background-color var(--dt-motion)',
      ...v,
      ...style
    }
  }, rest), children, interactive ? /*#__PURE__*/React.createElement("style", null, '.dt-card-interactive:hover{box-shadow:var(--dt-card-hover)}') : null);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/FilterChip.jsx
try { (() => {
/**
 * FilterChip — a toggleable filter / tag for catalog facets (분야, 프로토콜, 상태).
 * Crisp small-radius tag with a hairline, NOT a rounded-full cushion. Active =
 * persimmon tint + border + bold. Optional count (mono) and a removable ✕.
 */
function FilterChip({
  label,
  count,
  active = false,
  removable = false,
  onToggle,
  onRemove,
  icon,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    "aria-pressed": active,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 30,
      padding: '0 10px',
      borderRadius: 'var(--dt-radius-sm)',
      cursor: 'pointer',
      fontFamily: 'var(--dt-font-sans)',
      fontSize: 13,
      fontWeight: active ? 650 : 500,
      background: active ? 'var(--dt-tint-accent)' : 'var(--dt-surface)',
      color: active ? 'var(--dt-accent)' : 'var(--dt-muted-strong)',
      boxShadow: `inset 0 0 0 1px ${active ? 'color-mix(in srgb, var(--dt-accent) 40%, transparent)' : 'var(--dt-border-strong)'}`,
      transition: 'background-color var(--dt-motion-fast), box-shadow var(--dt-motion-fast)',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: active ? 'var(--dt-accent)' : 'var(--dt-muted)'
    },
    "aria-hidden": "true"
  }, icon) : null, /*#__PURE__*/React.createElement("span", null, label), count != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      fontWeight: 600,
      color: active ? 'var(--dt-accent)' : 'var(--dt-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, count) : null, removable ? /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "\uC81C\uAC70",
    onClick: e => {
      e.stopPropagation();
      onRemove?.();
    },
    style: {
      display: 'inline-flex',
      marginRight: -2,
      color: active ? 'var(--dt-accent)' : 'var(--dt-muted)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }))) : null);
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Compact labeled input, paired with a label or table context. Supports a
 * mono variant for API paths / keys / IDs.
 */
function Input({
  label,
  hint,
  mono = false,
  id,
  type = 'text',
  prefix = null,
  invalid = false,
  style,
  ...rest
}) {
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-')}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--dt-muted-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: invalid ? 'dt-field dt-field-invalid' : 'dt-field',
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 12px'
    }
  }, prefix ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--dt-muted)',
      display: 'inline-flex'
    }
  }, prefix) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: 'var(--dt-ink-strong)',
      padding: '11px 0',
      fontFamily: mono ? 'var(--dt-font-mono)' : 'var(--dt-font-sans)',
      fontSize: mono ? 13 : 14,
      ...style
    }
  }, rest))), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--dt-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const STATUS = {
  connected: {
    bg: 'var(--dt-tint-success)',
    fg: 'var(--dt-success)'
  },
  success: {
    bg: 'var(--dt-tint-success)',
    fg: 'var(--dt-success)'
  },
  reconnecting: {
    bg: 'var(--dt-tint-warning)',
    fg: 'var(--dt-warning)'
  },
  warning: {
    bg: 'var(--dt-tint-warning)',
    fg: 'var(--dt-warning)'
  },
  disconnected: {
    bg: 'var(--dt-tint-danger)',
    fg: 'var(--dt-danger)'
  },
  danger: {
    bg: 'var(--dt-tint-danger)',
    fg: 'var(--dt-danger)'
  },
  info: {
    bg: 'var(--dt-tint-cobalt)',
    fg: 'var(--dt-info)'
  },
  idle: {
    bg: 'var(--dt-tint-muted)',
    fg: 'var(--dt-muted-strong)'
  }
};

/**
 * Compact status pill: a tinted fill carrying a colored label — the console's
 * most-used status affordance (gateway / stream state). No outline, no dot;
 * an optional pulse marker appears only for live (`pulse`) states.
 */
function StatusPill({
  status = 'idle',
  children,
  pulse = false,
  style,
  ...rest
}) {
  const tone = STATUS[status] ?? STATUS.idle;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      borderRadius: 'var(--dt-radius-full)',
      background: tone.bg,
      padding: '4px 10px',
      fontSize: 12,
      fontWeight: 600,
      color: tone.fg,
      ...style
    }
  }, rest), pulse ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 7,
      height: 7,
      borderRadius: '9999px',
      background: tone.fg,
      animation: 'dt-status-pulse 1.6s var(--dt-ease) infinite'
    }
  }) : null, children, /*#__PURE__*/React.createElement("style", null, '@keyframes dt-status-pulse{0%,100%{opacity:1}50%{opacity:.35}}'));
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
/**
 * Underline-style tab bar for switching console views. Controlled via
 * `value` + `onChange`, or uncontrolled with `defaultValue`.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? tabs[0]?.id);
  const active = value !== undefined ? value : internal;
  const select = id => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 4,
      borderBottom: '1px solid var(--dt-border)',
      ...style
    }
  }, tabs.map(tab => {
    const isActive = tab.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      role: "tab",
      "aria-selected": isActive,
      type: "button",
      onClick: () => select(tab.id),
      style: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '10px 12px',
        marginBottom: -1,
        fontSize: 13,
        fontWeight: 600,
        color: isActive ? 'var(--dt-ink-strong)' : 'var(--dt-muted)',
        borderBottom: `2px solid ${isActive ? 'var(--dt-accent)' : 'transparent'}`,
        transition: 'color var(--dt-motion-fast)'
      }
    }, tab.icon ? /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        display: 'inline-flex'
      }
    }, tab.icon) : null, tab.label, tab.count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--dt-font-mono)',
        fontSize: 11,
        color: 'var(--dt-muted)'
      }
    }, tab.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
const SIZE = {
  sm: 26,
  md: 34,
  lg: 44
};

/**
 * Avatar — image or initials in a rounded square. Optional status dot.
 * Deterministic tint from the name when no image is given.
 */
function Avatar({
  name = '',
  src,
  size = 'md',
  status,
  square = true,
  style
}) {
  const px = typeof size === 'number' ? size : SIZE[size] ?? SIZE.md;
  const initials = name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase() || '·';
  const radius = square ? Math.round(px * 0.28) : px;
  const statusColor = {
    online: 'var(--dt-success)',
    busy: 'var(--dt-danger)',
    away: 'var(--dt-warning)',
    offline: 'var(--dt-muted)'
  }[status];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      flex: '0 0 auto',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    width: px,
    height: px,
    style: {
      borderRadius: radius,
      objectFit: 'cover',
      boxShadow: 'var(--dt-ring)'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: px,
      height: px,
      borderRadius: radius,
      display: 'grid',
      placeItems: 'center',
      background: 'var(--dt-tint-accent)',
      color: 'var(--dt-accent)',
      fontSize: px * 0.38,
      fontWeight: 700,
      letterSpacing: '-0.02em'
    }
  }, initials), statusColor ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -1,
      bottom: -1,
      width: px * 0.3,
      height: px * 0.3,
      borderRadius: 9999,
      background: statusColor,
      boxShadow: '0 0 0 2px var(--dt-surface)'
    }
  }) : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/CodeBlock.jsx
try { (() => {
/* Minimal, dependency-free token highlighter for JSON / shell-ish snippets.
   Not a full parser — just enough to color keys, strings, numbers, punctuation
   without pulling a syntax lib into the design system. */
function highlight(line) {
  const out = [];
  const re = /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(\b-?\d+(?:\.\d+)?\b)|(\b(?:true|false|null|GET|POST|PUT|DELETE)\b)|([{}\[\],:])/g;
  let last = 0,
    m;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last) out.push({
      t: line.slice(last, m.index),
      c: 'plain'
    });
    if (m[1]) out.push({
      t: m[1],
      c: 'key'
    });else if (m[2]) out.push({
      t: m[2],
      c: 'str'
    });else if (m[3]) out.push({
      t: m[3],
      c: 'num'
    });else if (m[4]) out.push({
      t: m[4],
      c: 'kw'
    });else if (m[5]) out.push({
      t: m[5],
      c: 'pun'
    });
    last = re.lastIndex;
  }
  if (last < line.length) out.push({
    t: line.slice(last),
    c: 'plain'
  });
  return out;
}
const COLOR = {
  plain: '#cdd0d8',
  key: '#7fd1c0',
  str: '#e0a96d',
  num: '#8fb3ff',
  kw: '#c98aff',
  pun: '#8a91a3'
};

/**
 * Dark code surface for the light page (Stripe-style contrast). Optional header
 * bar with a filename/label and a copy button; optional line numbers. Pass the
 * snippet as the `code` string. Kept deliberately dark — this is the one place
 * the system inverts.
 */
function CodeBlock({
  code = '',
  label,
  language = 'json',
  showLineNumbers = true,
  copyable = true,
  style
}) {
  const [copied, setCopied] = React.useState(false);
  const lines = String(code).replace(/\n$/, '').split('\n');
  const copy = () => {
    try {
      navigator.clipboard?.writeText(code);
    } catch (e) {/* noop */}
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--dt-code-bg)',
      border: '1px solid var(--dt-code-border)',
      borderRadius: 'var(--dt-radius-lg)',
      overflow: 'hidden',
      ...style
    }
  }, label || copyable ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '9px 12px',
      borderBottom: '1px solid var(--dt-code-border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      color: '#8a91a3'
    }
  }, label || language), copyable ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: copy,
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      border: 'none',
      background: 'transparent',
      color: copied ? '#34d399' : '#8a91a3',
      cursor: 'pointer',
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      fontWeight: 600,
      padding: 0
    }
  }, copied ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), "\uBCF5\uC0AC\uB428") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "11",
    height: "11",
    rx: "2",
    stroke: "currentColor",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 15V5a2 2 0 0 1 2-2h10",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })), "\uBCF5\uC0AC")) : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 0',
      overflowX: 'auto'
    }
  }, lines.map((ln, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: showLineNumbers ? '38px 1fr' : '1fr',
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 12.5,
      lineHeight: 1.75
    }
  }, showLineNumbers ? /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      paddingRight: 14,
      color: '#5a6273',
      userSelect: 'none'
    }
  }, i + 1) : null, /*#__PURE__*/React.createElement("code", {
    style: {
      color: COLOR.plain,
      whiteSpace: 'pre',
      paddingRight: 14
    }
  }, highlight(ln).map((seg, j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    style: {
      color: COLOR[seg.c]
    }
  }, seg.t)))))));
}
Object.assign(__ds_scope, { CodeBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/data/KeyValue.jsx
try { (() => {
/**
 * KeyValue — a definition list for spec metadata (auth, method, base URL, rate
 * limit…). Hairline rows; the key is muted, the value is ink and optionally mono.
 * `columns=2` lays pairs out in a two-up grid for denser panels.
 */
function KeyValue({
  items = [],
  columns = 1,
  style
}) {
  return /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: 'grid',
      gridTemplateColumns: columns === 2 ? '1fr 1fr' : '1fr',
      border: '1px solid var(--dt-border-strong)',
      borderRadius: 'var(--dt-radius-lg)',
      overflow: 'hidden',
      ...style
    }
  }, items.map((it, i) => {
    const row = Math.floor(i / columns);
    const col = i % columns;
    const isLastRow = row === Math.floor((items.length - 1) / columns);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 14,
        padding: '11px 14px',
        borderBottom: isLastRow ? 'none' : '1px solid var(--dt-border)',
        borderRight: columns === 2 && col === 0 ? '1px solid var(--dt-border)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("dt", {
      style: {
        fontSize: 12.5,
        color: 'var(--dt-muted)',
        flex: '0 0 auto'
      }
    }, it.key), /*#__PURE__*/React.createElement("dd", {
      style: {
        margin: 0,
        textAlign: 'right',
        minWidth: 0,
        fontFamily: it.mono ? 'var(--dt-font-mono)' : 'inherit',
        fontSize: it.mono ? 12.5 : 13,
        fontWeight: 600,
        color: it.accent ? 'var(--dt-accent)' : 'var(--dt-ink-strong)',
        fontVariantNumeric: 'tabular-nums',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, it.value));
  }));
}
Object.assign(__ds_scope, { KeyValue });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KeyValue.jsx", error: String((e && e.message) || e) }); }

// components/data/LogRow.jsx
try { (() => {
const LEVEL = {
  ok: {
    dot: 'var(--dt-success)',
    text: 'var(--dt-success)',
    label: 'OK'
  },
  warn: {
    dot: 'var(--dt-warning)',
    text: 'var(--dt-warning)',
    label: 'WARN'
  },
  error: {
    dot: 'var(--dt-danger)',
    text: 'var(--dt-danger)',
    label: 'ERR'
  },
  info: {
    dot: 'var(--dt-muted)',
    text: 'var(--dt-muted-strong)',
    label: 'INFO'
  }
};

/**
 * LogRow stream — a dense, tabular execution log. Each entry is a hairline row:
 * timestamp · status dot · tool · message · latency, all mono and tabular so
 * columns align. This is the console's most-used surface; keep it flat.
 */
function LogRow({
  entries = [],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--dt-border-strong)',
      borderRadius: 'var(--dt-radius-lg)',
      overflow: 'hidden',
      background: 'var(--dt-surface)',
      fontVariantNumeric: 'tabular-nums',
      ...style
    }
  }, entries.map((e, i) => {
    const lv = LEVEL[e.level] || LEVEL.info;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'grid',
        gridTemplateColumns: 'auto 14px 1fr auto',
        alignItems: 'center',
        gap: 12,
        padding: '9px 14px',
        borderTop: i === 0 ? 'none' : '1px solid var(--dt-border)',
        fontFamily: 'var(--dt-font-mono)',
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--dt-muted)'
      }
    }, e.time), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 7,
        height: 7,
        borderRadius: 9999,
        background: lv.dot,
        justifySelf: 'center'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--dt-ink-strong)',
        fontWeight: 600
      }
    }, e.tool), e.message ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--dt-muted-strong)'
      }
    }, '  ', e.message) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        color: e.latency ? 'var(--dt-muted-strong)' : lv.text,
        fontWeight: 600
      }
    }, e.latency || lv.label));
  }));
}
Object.assign(__ds_scope, { LogRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LogRow.jsx", error: String((e && e.message) || e) }); }

// components/data/Pagination.jsx
try { (() => {
/** Pagination — prev/next plus compact page numbers with an ellipsis. */
function Pagination({
  page = 1,
  pageCount = 1,
  onChange,
  style
}) {
  const go = p => {
    if (p >= 1 && p <= pageCount && p !== page) onChange?.(p);
  };
  const pages = [];
  const add = p => pages.push(p);
  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i += 1) add(i);
  } else {
    add(1);
    if (page > 3) add('…');
    for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i += 1) add(i);
    if (page < pageCount - 2) add('…');
    add(pageCount);
  }
  const cell = active => ({
    minWidth: 32,
    height: 32,
    padding: '0 8px',
    borderRadius: 'var(--dt-radius-sm)',
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    fontVariantNumeric: 'tabular-nums',
    background: active ? 'var(--dt-accent)' : 'transparent',
    color: active ? 'var(--dt-accent-ink)' : 'var(--dt-muted-strong)'
  });
  const arrow = dis => ({
    ...cell(false),
    opacity: dis ? 0.4 : 1,
    cursor: dis ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  });
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      ...style
    },
    "aria-label": "\uD398\uC774\uC9C0"
  }, /*#__PURE__*/React.createElement("button", {
    style: arrow(page <= 1),
    onClick: () => go(page - 1),
    disabled: page <= 1,
    "aria-label": "\uC774\uC804"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 6l-6 6 6 6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), pages.map((p, i) => p === '…' ? /*#__PURE__*/React.createElement("span", {
    key: `e${i}`,
    style: {
      minWidth: 22,
      textAlign: 'center',
      color: 'var(--dt-muted)'
    }
  }, "\u2026") : /*#__PURE__*/React.createElement("button", {
    key: p,
    style: cell(p === page),
    onClick: () => go(p),
    "aria-current": p === page ? 'page' : undefined
  }, p)), /*#__PURE__*/React.createElement("button", {
    style: arrow(page >= pageCount),
    onClick: () => go(page + 1),
    disabled: page >= pageCount,
    "aria-label": "\uB2E4\uC74C"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/data/StatTile.jsx
try { (() => {
/**
 * Metric tile — uppercase label, large tabular value, optional delta.
 * The console's KPI unit. Compose several inside a bordered stat row.
 */
function StatTile({
  label,
  value,
  delta,
  deltaTone = 'neutral',
  hint,
  style
}) {
  const tone = {
    up: 'var(--dt-success)',
    down: 'var(--dt-danger)',
    neutral: 'var(--dt-muted)'
  }[deltaTone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 650,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--dt-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 25,
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: 'var(--dt-ink-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), delta || hint ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--dt-muted)'
    }
  }, delta ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: tone,
      fontWeight: 600,
      fontVariantNumeric: 'tabular-nums'
    }
  }, delta) : null, hint ? /*#__PURE__*/React.createElement("span", null, hint) : null) : null);
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
/**
 * Data table — scannable, dense, hairline-divided. Columns define header,
 * alignment, and an optional cell renderer. Built for comparison, not decoration.
 */
function Table({
  columns = [],
  rows = [],
  rowKey,
  onRowClick,
  empty,
  style
}) {
  if (!rows.length && empty) return empty;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      borderRadius: 'var(--dt-radius-lg)',
      background: 'var(--dt-surface)',
      boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      color: 'var(--dt-ink)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--dt-surface-muted)'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: '11px 18px',
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--dt-muted)',
      borderBottom: '1px solid var(--dt-divider)',
      whiteSpace: 'nowrap'
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, ri) => /*#__PURE__*/React.createElement("tr", {
    key: rowKey ? rowKey(row, ri) : ri,
    onClick: onRowClick ? () => onRowClick(row) : undefined,
    className: "dt-tr",
    style: {
      cursor: onRowClick ? 'pointer' : 'default'
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      padding: '13px 18px',
      fontSize: 13,
      borderBottom: '1px solid var(--dt-divider)',
      whiteSpace: c.nowrap ? 'nowrap' : 'normal'
    }
  }, c.render ? c.render(row[c.key], row) : row[c.key])))))), /*#__PURE__*/React.createElement("style", null, `.dt-tr{transition:background-color 130ms}.dt-tr:hover{background:var(--dt-surface-muted)}tbody tr:last-child td{border-bottom:0}`));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/data/UsageMeter.jsx
try { (() => {
/**
 * UsageMeter — a labeled progress bar for quota / usage (e.g. free tier 100회/일).
 * Hairline track, persimmon fill that shifts to warning/danger as it nears the cap.
 * Shows value / max with tabular figures. Flat — no glow, no gradient.
 */
function UsageMeter({
  label,
  value = 0,
  max = 100,
  unit = '',
  hint,
  style
}) {
  const pct = Math.min(100, Math.max(0, value / max * 100));
  const fill = pct >= 90 ? 'var(--dt-danger)' : pct >= 75 ? 'var(--dt-warning)' : 'var(--dt-accent)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: 12
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--dt-muted-strong)'
    }
  }, label) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 12.5,
      color: 'var(--dt-ink-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 700
    }
  }, value.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--dt-muted)'
    }
  }, " / ", max.toLocaleString(), unit))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 8,
      borderRadius: 'var(--dt-radius-sm)',
      background: 'var(--dt-surface-sunken)',
      boxShadow: 'inset 0 0 0 1px var(--dt-border-strong)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: `${pct}%`,
      background: fill,
      borderRadius: 'var(--dt-radius-sm)',
      transition: 'width var(--dt-motion)'
    }
  })), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--dt-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { UsageMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/UsageMeter.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const TONE = {
  neutral: {
    fg: 'var(--dt-muted-strong)',
    bg: 'var(--dt-surface-sunken)',
    accent: 'var(--dt-muted)'
  },
  info: {
    fg: 'var(--dt-cobalt)',
    bg: 'var(--dt-tint-cobalt)',
    accent: 'var(--dt-cobalt)'
  },
  success: {
    fg: 'var(--dt-success)',
    bg: 'var(--dt-tint-success)',
    accent: 'var(--dt-success)'
  },
  warning: {
    fg: 'var(--dt-warning)',
    bg: 'var(--dt-tint-warning)',
    accent: 'var(--dt-warning)'
  },
  danger: {
    fg: 'var(--dt-danger)',
    bg: 'var(--dt-tint-danger)',
    accent: 'var(--dt-danger)'
  }
};

/**
 * Inline alert / banner. A quiet tinted surface with a left accent rule,
 * optional title, body, and action. Calm and recovery-oriented copy.
 */
function Alert({
  tone = 'info',
  title,
  children,
  icon,
  action,
  onDismiss,
  style
}) {
  const t = TONE[tone] ?? TONE.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      gap: 12,
      padding: '13px 15px',
      background: t.bg,
      borderRadius: 'var(--dt-radius-md)',
      boxShadow: `inset 3px 0 0 ${t.accent}`,
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.fg,
      display: 'inline-flex',
      flex: '0 0 auto',
      marginTop: 1
    }
  }, icon) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 650,
      color: 'var(--dt-ink-strong)'
    }
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: title ? 3 : 0,
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--dt-muted-strong)'
    }
  }, children) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, action) : null), onDismiss ? /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "\uB2EB\uAE30",
    style: {
      flex: '0 0 auto',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--dt-muted)',
      padding: 2,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))) : null);
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/**
 * Modal dialog. Renders an overlay + centered panel when `open`. Use for
 * confirmations and genuinely framed tasks. Esc / backdrop click closes.
 */
function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 460
}) {
  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = e => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'grid',
      placeItems: 'center',
      padding: 20,
      background: 'color-mix(in srgb, var(--dt-ink-strong) 32%, transparent)',
      backdropFilter: 'blur(2px)',
      animation: 'dt-fade 160ms var(--dt-ease)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: width,
      background: 'var(--dt-surface)',
      borderRadius: 'var(--dt-radius-lg)',
      boxShadow: 'var(--dt-shadow-xl)',
      animation: 'dt-pop 200ms var(--dt-ease)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 24px'
    }
  }, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: '-0.01em',
      color: 'var(--dt-ink-strong)'
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--dt-muted-strong)'
    }
  }, description) : null, children ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: title || description ? 16 : 0
    }
  }, children) : null), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
      padding: '14px 24px',
      background: 'var(--dt-surface-sunken)'
    }
  }, footer) : null), /*#__PURE__*/React.createElement("style", null, `@keyframes dt-fade{from{opacity:0}}@keyframes dt-pop{from{opacity:0;transform:translateY(8px) scale(.98)}}`));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Drawer.jsx
try { (() => {
/**
 * Drawer / Sheet — a side panel that slides in over a scrim for secondary flows
 * (tool detail, key config, filters). Genuinely floating, so it earns a shadow;
 * the panel itself stays flat inside with hairline-divided header/footer. Render
 * controlled via `open`. `side` picks the edge; `width` sizes it.
 */
function Drawer({
  open = false,
  side = 'right',
  title,
  children,
  footer,
  onClose,
  width = 420,
  style
}) {
  if (!open) return null;
  const fromRight = side === 'right';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 40,
      display: 'flex',
      justifyContent: fromRight ? 'flex-end' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(24,22,18,0.32)'
    }
  }), /*#__PURE__*/React.createElement("aside", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title,
    style: {
      position: 'relative',
      width,
      maxWidth: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--dt-surface)',
      boxShadow: 'var(--dt-shadow-xl)',
      borderLeft: fromRight ? '1px solid var(--dt-border-strong)' : 'none',
      borderRight: fromRight ? 'none' : '1px solid var(--dt-border-strong)',
      fontFamily: 'var(--dt-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 18px',
      borderBottom: '1px solid var(--dt-border)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      flex: 1,
      minWidth: 0,
      fontSize: 16,
      fontWeight: 650,
      letterSpacing: '-0.01em',
      color: 'var(--dt-ink-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "\uB2EB\uAE30",
    style: {
      flex: '0 0 auto',
      width: 30,
      height: 30,
      display: 'grid',
      placeItems: 'center',
      border: 'none',
      background: 'var(--dt-surface-sunken)',
      borderRadius: 'var(--dt-radius-sm)',
      color: 'var(--dt-muted-strong)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 18
    }
  }, children), footer ? /*#__PURE__*/React.createElement("footer", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 18px',
      borderTop: '1px solid var(--dt-border)'
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Drawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Drawer.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
/**
 * Empty state for lists/tables with no data. Quiet icon, short title,
 * one-line guidance, and an optional primary action.
 */
function EmptyState({
  icon,
  title,
  description,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center',
      gap: 10,
      textAlign: 'center',
      padding: '40px 24px',
      borderRadius: 'var(--dt-radius-lg)',
      background: 'var(--dt-surface-sunken)',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--dt-radius-md)',
      background: 'var(--dt-surface)',
      color: 'var(--dt-muted)',
      boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)'
    }
  }, icon) : null, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 650,
      color: 'var(--dt-ink-strong)'
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.55,
      color: 'var(--dt-muted)',
      maxWidth: 320
    }
  }, description) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, action) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
/** Skeleton placeholder — a softly pulsing block. Match the real content's size. */
function Skeleton({
  width = '100%',
  height = 14,
  radius = 'var(--dt-radius-sm)',
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width,
      height,
      borderRadius: radius,
      background: 'var(--dt-surface-sunken)',
      animation: 'dt-skel 1.4s var(--dt-ease) infinite',
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes dt-skel{0%,100%{opacity:1}50%{opacity:.5}}`));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Spinner.jsx
try { (() => {
/** Spinner — a thin persimmon arc rotating on a faint track. */
function Spinner({
  size = 18,
  stroke = 2,
  color = 'var(--dt-accent)',
  style
}) {
  const id = React.useId();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      ...style
    },
    role: "status",
    "aria-label": "\uB85C\uB529 \uC911"
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      animation: 'dt-spin 0.7s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9",
    stroke: "currentColor",
    strokeWidth: stroke,
    style: {
      color: 'var(--dt-border-strong)',
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 3a9 9 0 0 1 9 9",
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes dt-spin{to{transform:rotate(360deg)}}`));
}
Object.assign(__ds_scope, { Spinner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Spinner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const DOT = {
  info: 'var(--dt-cobalt)',
  success: 'var(--dt-success)',
  warning: 'var(--dt-warning)',
  danger: 'var(--dt-danger)'
};

/**
 * Toast notification — a floating raised card with a status dot, message,
 * and optional action. Render inside a fixed corner stack.
 */
function Toast({
  tone = 'success',
  title,
  message,
  action,
  onDismiss,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 11,
      width: 340,
      maxWidth: '90vw',
      padding: '13px 15px',
      background: 'var(--dt-surface)',
      borderRadius: 'var(--dt-radius-md)',
      boxShadow: 'var(--dt-shadow-lg)',
      animation: 'dt-toast 240ms var(--dt-ease)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 9999,
      marginTop: 5,
      flex: '0 0 auto',
      background: DOT[tone] ?? DOT.success
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 650,
      color: 'var(--dt-ink-strong)'
    }
  }, title) : null, message ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: title ? 2 : 0,
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--dt-muted-strong)'
    }
  }, message) : null), action ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto'
    }
  }, action) : null, onDismiss ? /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "\uB2EB\uAE30",
    style: {
      flex: '0 0 auto',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--dt-muted)',
      padding: 2,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))) : null, /*#__PURE__*/React.createElement("style", null, `@keyframes dt-toast{from{opacity:0;transform:translateY(10px)}}`));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/**
 * Tooltip — a small dark label on hover/focus. Wraps a single child trigger.
 * Position: top (default) / bottom / left / right.
 */
function Tooltip({
  label,
  position = 'top',
  children
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-7px)'
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%) translateY(7px)'
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%) translateX(-7px)'
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%) translateX(7px)'
    }
  }[position];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show ? /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 60,
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      padding: '6px 9px',
      fontSize: 12,
      fontWeight: 500,
      lineHeight: 1.2,
      color: 'var(--dt-paper)',
      background: 'var(--dt-ink-strong)',
      borderRadius: 'var(--dt-radius-sm)',
      boxShadow: 'var(--dt-shadow-md)',
      animation: 'dt-tip 120ms var(--dt-ease)',
      ...pos
    }
  }, label) : null, /*#__PURE__*/React.createElement("style", null, `@keyframes dt-tip{from{opacity:0}}`));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Checkbox with label. Persimmon fill when checked; flat hairline when not.
 * Controlled (checked + onChange) or uncontrolled (defaultChecked).
 */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  id,
  style
}) {
  const cbId = id || (label ? `cb-${String(label).replace(/\s+/g, '-')}` : undefined);
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(v => !v);
    onChange?.(!isOn);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cbId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: cbId,
    type: "checkbox",
    checked: isOn,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flex: '0 0 auto',
      borderRadius: 5,
      display: 'grid',
      placeItems: 'center',
      background: isOn ? 'var(--dt-accent)' : 'var(--dt-surface)',
      border: `1.5px solid ${isOn ? 'var(--dt-accent)' : 'var(--dt-border-strong)'}`,
      transition: 'background-color 130ms, border-color 130ms'
    }
  }, isOn ? /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l4.5 4.5L19 7",
    stroke: "var(--dt-accent-ink)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })) : null), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--dt-ink)'
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Combobox.jsx
try { (() => {
/**
 * Searchable select for large option sets (e.g. the 230+ public-data APIs).
 * Flat hairline field; the listbox is a bordered plane, not a floating cushion.
 * Filters options by query against label + meta. Controlled or uncontrolled.
 */
function Combobox({
  label,
  hint,
  options = [],
  value,
  onChange,
  placeholder = '검색…',
  emptyText = '결과 없음',
  id,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const rootRef = React.useRef(null);
  const cbId = id || (label ? `cb-${label.replace(/\s+/g, '-')}` : undefined);
  const selected = options.find(o => o.value === value) || null;
  React.useEffect(() => {
    const onDoc = e => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const q = query.trim().toLowerCase();
  const filtered = q ? options.filter(o => (o.label + ' ' + (o.meta || '')).toLowerCase().includes(q)) : options;
  const commit = o => {
    onChange?.(o.value);
    setOpen(false);
    setQuery('');
  };
  const onKey = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && open && filtered[active]) {
      e.preventDefault();
      commit(filtered[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    style: {
      display: 'grid',
      gap: 7,
      position: 'relative',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: cbId,
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--dt-muted-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    className: "dt-field",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      height: 44,
      padding: '0 12px',
      boxShadow: open ? 'var(--dt-shadow-focus)' : undefined,
      background: open ? 'var(--dt-surface)' : 'var(--dt-surface-sunken)'
    },
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true",
    style: {
      color: 'var(--dt-muted)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7",
    stroke: "currentColor",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4-4",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("input", {
    id: cbId,
    value: open ? query : selected ? selected.label : '',
    placeholder: selected && !open ? selected.label : placeholder,
    onChange: e => {
      setQuery(e.target.value);
      setOpen(true);
      setActive(0);
    },
    onFocus: () => setOpen(true),
    onKeyDown: onKey,
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 14,
      fontFamily: 'inherit',
      color: 'var(--dt-ink-strong)'
    }
  }), selected && !open ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      color: 'var(--dt-muted)'
    }
  }, selected.meta) : null), open ? /*#__PURE__*/React.createElement("div", {
    role: "listbox",
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      left: 0,
      right: 0,
      zIndex: 20,
      background: 'var(--dt-surface)',
      border: '1px solid var(--dt-border-strong)',
      borderRadius: 'var(--dt-radius-lg)',
      boxShadow: 'var(--dt-shadow-md)',
      maxHeight: 240,
      overflowY: 'auto',
      padding: 4
    }
  }, filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 12px',
      fontSize: 13,
      color: 'var(--dt-muted)'
    }
  }, emptyText) : filtered.map((o, i) => {
    const isActive = i === active;
    const isSel = o.value === value;
    return /*#__PURE__*/React.createElement("div", {
      key: o.value,
      role: "option",
      "aria-selected": isSel,
      onMouseEnter: () => setActive(i),
      onMouseDown: e => {
        e.preventDefault();
        commit(o);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 10px',
        borderRadius: 'var(--dt-radius-md)',
        cursor: 'pointer',
        background: isActive ? 'var(--dt-surface-sunken)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0,
        fontSize: 13.5,
        fontWeight: isSel ? 600 : 500,
        color: 'var(--dt-ink-strong)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, o.label), o.meta ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--dt-font-mono)',
        fontSize: 11,
        color: 'var(--dt-muted)',
        flex: '0 0 auto'
      }
    }, o.meta) : null, isSel ? /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      style: {
        color: 'var(--dt-accent)',
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5",
      stroke: "currentColor",
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })) : null);
  })) : null, hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--dt-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Combobox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Combobox.jsx", error: String((e && e.message) || e) }); }

// components/forms/FileUpload.jsx
try { (() => {
function fmtSize(bytes) {
  if (bytes == null) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Drop area for uploading an OpenAPI spec (or any file). A dashed hairline well —
 * never a soft-shadow card. Idle / drag-over / filled states. Calls onFiles with
 * the FileList. In the filled state, shows name + size with a remove control.
 */
function FileUpload({
  label,
  accept = '.json,.yaml,.yml',
  hint = 'OpenAPI 스펙 · JSON 또는 YAML',
  file,
  onFiles,
  onRemove,
  id,
  style
}) {
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef(null);
  const fId = id || 'fu';
  const handle = files => {
    if (files && files.length) onFiles?.(files);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 7,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--dt-muted-strong)'
    }
  }, label) : null, file ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      background: 'var(--dt-surface)',
      border: '1px solid var(--dt-border-strong)',
      borderRadius: 'var(--dt-radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      flex: '0 0 auto',
      display: 'grid',
      placeItems: 'center',
      borderRadius: 'var(--dt-radius-md)',
      background: 'var(--dt-tint-accent)',
      color: 'var(--dt-accent)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2v6h6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--dt-ink-strong)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, file.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      color: 'var(--dt-muted)',
      marginTop: 2
    }
  }, fmtSize(file.size), " \xB7 \uC5C5\uB85C\uB4DC \uC644\uB8CC")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "\uC81C\uAC70",
    style: {
      flex: '0 0 auto',
      width: 30,
      height: 30,
      display: 'grid',
      placeItems: 'center',
      border: 'none',
      background: 'var(--dt-surface-sunken)',
      borderRadius: 'var(--dt-radius-sm)',
      color: 'var(--dt-muted-strong)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })))) : /*#__PURE__*/React.createElement("label", {
    htmlFor: fId,
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      handle(e.dataTransfer.files);
    },
    style: {
      display: 'grid',
      placeItems: 'center',
      gap: 8,
      padding: '26px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      borderRadius: 'var(--dt-radius-lg)',
      border: `1.5px dashed ${drag ? 'var(--dt-accent)' : 'var(--dt-border-strong)'}`,
      background: drag ? 'var(--dt-tint-accent)' : 'var(--dt-surface-sunken)',
      transition: 'background-color var(--dt-motion-fast), border-color var(--dt-motion-fast)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: drag ? 'var(--dt-accent)' : 'var(--dt-muted)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 16V4m0 0L7 9m5-5l5 5",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--dt-ink-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--dt-accent)'
    }
  }, "\uD30C\uC77C \uC120\uD0DD"), " \uB610\uB294 \uB04C\uC5B4\uB2E4 \uB193\uAE30"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      color: 'var(--dt-muted)'
    }
  }, hint), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    id: fId,
    type: "file",
    accept: accept,
    onChange: e => handle(e.target.files),
    style: {
      display: 'none'
    }
  })));
}
Object.assign(__ds_scope, { FileUpload });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/FileUpload.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
/**
 * Radio group. One persimmon-filled selection. Pass options as strings or
 * { value, label, hint }. Controlled (value) or uncontrolled (defaultValue).
 */
function RadioGroup({
  name,
  options = [],
  value,
  defaultValue,
  onChange,
  disabled,
  style
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const groupName = name || React.useId();
  const select = v => {
    if (disabled) return;
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: 'grid',
      gap: 10,
      ...style
    }
  }, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    const on = opt.value === current;
    return /*#__PURE__*/React.createElement("label", {
      key: opt.value,
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.55 : 1
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: groupName,
      checked: on,
      onChange: () => select(opt.value),
      disabled: disabled,
      style: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        marginTop: 1,
        flex: '0 0 auto',
        borderRadius: 9999,
        display: 'grid',
        placeItems: 'center',
        background: 'var(--dt-surface)',
        border: `1.5px solid ${on ? 'var(--dt-accent)' : 'var(--dt-border-strong)'}`,
        transition: 'border-color 130ms'
      }
    }, on ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 9999,
        background: 'var(--dt-accent)'
      }
    }) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'grid',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: 'var(--dt-ink)',
        lineHeight: 1.3
      }
    }, opt.label), opt.hint ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--dt-muted)'
      }
    }, opt.hint) : null));
  }));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
/**
 * Segmented control — a flat inset track with a sliding selected segment.
 * Use for 2–4 short, mutually-exclusive options (view toggles, filters).
 */
function SegmentedControl({
  options = [],
  value,
  defaultValue,
  onChange,
  size = 'md',
  style
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (typeof options[0] === 'string' ? options[0] : options[0]?.value));
  const current = value !== undefined ? value : internal;
  const select = v => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };
  const pad = size === 'sm' ? '5px 11px' : '7px 14px';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      padding: 3,
      gap: 2,
      background: 'var(--dt-surface-sunken)',
      borderRadius: 'var(--dt-radius-md)',
      ...style
    }
  }, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    const on = opt.value === current;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      type: "button",
      onClick: () => select(opt.value),
      style: {
        border: 'none',
        cursor: 'pointer',
        padding: pad,
        borderRadius: 'var(--dt-radius-sm)',
        fontSize: size === 'sm' ? 12 : 13,
        fontWeight: 600,
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
        color: on ? 'var(--dt-ink-strong)' : 'var(--dt-muted)',
        background: on ? 'var(--dt-surface)' : 'transparent',
        boxShadow: on ? 'var(--dt-ring), var(--dt-shadow-xs)' : 'none',
        transition: 'color 130ms, background-color 130ms'
      }
    }, opt.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/**
 * Compact select built on a native <select> for accessibility, styled flat
 * with a hairline border and a persimmon focus ring. Pair with a label.
 */
function Select({
  label,
  hint,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  id,
  style
}) {
  const selId = id || (label ? `sel-${label.replace(/\s+/g, '-')}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 7
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--dt-muted-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: selId,
    className: "dt-field",
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: e => onChange?.(e.target.value),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      padding: '10px 36px 10px 13px',
      fontSize: 14,
      fontFamily: 'inherit',
      color: 'var(--dt-ink-strong)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: 11,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: 'var(--dt-muted)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--dt-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
/**
 * Numeric range input — a hairline track with a persimmon fill and a square-ish
 * thumb, plus a tabular value readout. Controlled or uncontrolled. Drag, click,
 * and arrow keys all work. Use for thresholds, limits, sample sizes.
 */
function Slider({
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  unit = '',
  hint,
  id,
  style
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? min);
  const v = value != null ? value : internal;
  const trackRef = React.useRef(null);
  const sId = id || (label ? `sl-${label.replace(/\s+/g, '-')}` : undefined);
  const pct = (v - min) / (max - min) * 100;
  const set = nv => {
    const clamped = Math.min(max, Math.max(min, Math.round(nv / step) * step));
    if (value == null) setInternal(clamped);
    onChange?.(clamped);
  };
  const fromClientX = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    return min + ratio * (max - min);
  };
  const onPointerDown = e => {
    e.preventDefault();
    set(fromClientX(e.clientX));
    const move = ev => set(fromClientX(ev.clientX));
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  const onKey = e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      set(v + step);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      set(v - step);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 9,
      ...style
    }
  }, label || true ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: sId,
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--dt-muted-strong)'
    }
  }, label) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--dt-ink-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, v, unit ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--dt-muted)',
      fontWeight: 400
    }
  }, unit) : null)) : null, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    id: sId,
    role: "slider",
    tabIndex: 0,
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": v,
    onPointerDown: onPointerDown,
    onKeyDown: onKey,
    style: {
      position: 'relative',
      height: 20,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 4,
      borderRadius: 2,
      background: 'var(--dt-surface-sunken)',
      boxShadow: 'inset 0 0 0 1px var(--dt-border-strong)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `${pct}%`,
      height: 4,
      borderRadius: 2,
      background: 'var(--dt-accent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${pct}%`,
      transform: 'translateX(-50%)',
      width: 16,
      height: 16,
      borderRadius: 'var(--dt-radius-sm)',
      background: 'var(--dt-surface)',
      boxShadow: '0 0 0 1.5px var(--dt-accent)',
      border: '3px solid var(--dt-surface)'
    }
  })), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--dt-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * Switch / toggle. Persimmon track when on. Use for instant on/off settings
 * (not form submission). Controlled (checked) or uncontrolled (defaultChecked).
 */
function Switch({
  checked,
  defaultChecked,
  onChange,
  disabled,
  label,
  id,
  style
}) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(v => !v);
    onChange?.(!isOn);
  };
  const sw = /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": isOn,
    disabled: disabled,
    onClick: toggle,
    style: {
      width: 38,
      height: 22,
      flex: '0 0 auto',
      borderRadius: 9999,
      border: 'none',
      padding: 2,
      background: isOn ? 'var(--dt-accent)' : 'var(--dt-border-strong)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      transition: 'background-color 160ms var(--dt-ease)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 9999,
      background: '#fff',
      boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
      transform: isOn ? 'translateX(16px)' : 'translateX(0)',
      transition: 'transform 160ms var(--dt-ease)'
    }
  }));
  if (!label) return sw;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, sw, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--dt-ink)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line text field. Flat hairline; persimmon focus ring. */
function Textarea({
  label,
  hint,
  rows = 4,
  mono = false,
  id,
  style,
  ...rest
}) {
  const taId = id || (label ? `ta-${label.replace(/\s+/g, '-')}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 7
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: taId,
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--dt-muted-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    id: taId,
    rows: rows,
    className: "dt-field",
    style: {
      width: '100%',
      resize: 'vertical',
      padding: '11px 13px',
      fontSize: mono ? 13 : 14,
      fontFamily: mono ? 'var(--dt-font-mono)' : 'inherit',
      lineHeight: 1.55,
      color: 'var(--dt-ink-strong)',
      ...style
    }
  }, rest)), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--dt-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
/** Breadcrumb trail. Pass items as { label, href }. Last item is current. */
function Breadcrumb({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "breadcrumb",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap',
      ...style
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, last ? /*#__PURE__*/React.createElement("span", {
      "aria-current": "page",
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--dt-ink-strong)'
      }
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      href: it.href || '#',
      style: {
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--dt-muted)',
        textDecoration: 'none'
      }
    }, it.label), !last ? /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      style: {
        color: 'var(--dt-border-strong)'
      },
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 6l6 6-6 6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })) : null);
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/CommandPalette.jsx
try { (() => {
/**
 * CommandPalette (⌘K) — a fast switcher over tools and actions. A bordered plane
 * with a search field, grouped results, and mono shortcut hints. Render it as a
 * controlled panel (open + query + groups). Keeps the console flat: the only
 * elevation is the one floating layer. Pair items with Lucide icons.
 */
function CommandPalette({
  open = true,
  query = '',
  onQueryChange,
  groups = [],
  footerHint = '↑↓ 이동 · ↵ 실행 · esc 닫기',
  onSelect,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 520,
      maxWidth: '100%',
      background: 'var(--dt-surface)',
      border: '1px solid var(--dt-border-strong)',
      borderRadius: 'var(--dt-radius-xl)',
      boxShadow: 'var(--dt-shadow-xl)',
      overflow: 'hidden',
      fontFamily: 'var(--dt-font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '14px 16px',
      borderBottom: '1px solid var(--dt-border)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true",
    style: {
      color: 'var(--dt-muted)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7",
    stroke: "currentColor",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4-4",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  })), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: query,
    onChange: e => onQueryChange?.(e.target.value),
    placeholder: "\uB3C4\uAD6C \xB7 \uC561\uC158 \uAC80\uC0C9\u2026",
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 15,
      fontFamily: 'inherit',
      color: 'var(--dt-ink-strong)'
    }
  }), /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--dt-muted)',
      border: '1px solid var(--dt-border-strong)',
      borderRadius: 'var(--dt-radius-sm)',
      padding: '2px 7px'
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 320,
      overflowY: 'auto',
      padding: 6
    }
  }, groups.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi,
    style: {
      marginBottom: 4
    }
  }, g.heading ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 10,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--dt-muted)',
      padding: '8px 10px 5px'
    }
  }, g.heading) : null, g.items.map((it, ii) => /*#__PURE__*/React.createElement("div", {
    key: ii,
    onMouseDown: e => {
      e.preventDefault();
      onSelect?.(it);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '9px 10px',
      borderRadius: 'var(--dt-radius-md)',
      cursor: 'pointer',
      background: it.active ? 'var(--dt-tint-accent)' : 'transparent'
    }
  }, it.icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: '0 0 auto',
      color: it.active ? 'var(--dt-accent)' : 'var(--dt-muted)'
    },
    "aria-hidden": "true"
  }, it.icon) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: 13.5,
      fontWeight: it.active ? 600 : 500,
      color: it.active ? 'var(--dt-accent)' : 'var(--dt-ink-strong)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, it.label, it.meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      color: 'var(--dt-muted)',
      fontWeight: 400,
      marginLeft: 8
    }
  }, it.meta) : null), it.shortcut ? /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      color: 'var(--dt-muted-strong)',
      border: '1px solid var(--dt-border-strong)',
      borderRadius: 'var(--dt-radius-sm)',
      padding: '1px 6px'
    }
  }, it.shortcut) : null))))), footerHint ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--dt-border)',
      padding: '8px 14px',
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      color: 'var(--dt-muted)'
    }
  }, footerHint) : null);
}
Object.assign(__ds_scope, { CommandPalette });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/CommandPalette.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Menu.jsx
try { (() => {
/**
 * Dropdown menu — a trigger that opens a floating raised list. Items support
 * icons, danger tone, and dividers ({ divider: true }). Click-away closes.
 */
function Menu({
  trigger,
  items = [],
  align = 'left',
  width = 200
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return undefined;
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('mousedown', onDoc);
    return () => window.removeEventListener('mousedown', onDoc);
  }, [open]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      position: 'relative',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(v => !v),
    style: {
      display: 'inline-flex',
      cursor: 'pointer'
    }
  }, trigger), open ? /*#__PURE__*/React.createElement("div", {
    role: "menu",
    style: {
      position: 'absolute',
      top: '100%',
      [align]: 0,
      marginTop: 6,
      zIndex: 80,
      width,
      padding: 5,
      background: 'var(--dt-surface)',
      borderRadius: 'var(--dt-radius-md)',
      boxShadow: 'var(--dt-shadow-lg)',
      animation: 'dt-menu 130ms var(--dt-ease)'
    }
  }, items.map((it, i) => it.divider ? /*#__PURE__*/React.createElement("div", {
    key: `d${i}`,
    style: {
      height: 1,
      background: 'var(--dt-border)',
      margin: '5px 0'
    }
  }) : /*#__PURE__*/React.createElement("button", {
    key: i,
    role: "menuitem",
    onClick: () => {
      it.onClick?.();
      setOpen(false);
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      width: '100%',
      textAlign: 'left',
      padding: '8px 10px',
      border: 'none',
      borderRadius: 'var(--dt-radius-sm)',
      cursor: 'pointer',
      background: 'transparent',
      fontSize: 13.5,
      fontWeight: 500,
      fontFamily: 'inherit',
      color: it.danger ? 'var(--dt-danger)' : 'var(--dt-ink)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = it.danger ? 'var(--dt-tint-danger)' : 'var(--dt-surface-sunken)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
    }
  }, it.icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: it.danger ? 'var(--dt-danger)' : 'var(--dt-muted-strong)'
    }
  }, it.icon) : null, it.label)), /*#__PURE__*/React.createElement("style", null, `@keyframes dt-menu{from{opacity:0;transform:translateY(-4px)}}`)) : null);
}
Object.assign(__ds_scope, { Menu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Menu.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
/**
 * Sidebar / NavRail — the console's primary navigation. A flat column on a
 * hairline border; the active item is marked by a persimmon left bar + tint,
 * never a floating pill. Sections group items under mono captions. Pass Lucide
 * icon elements; icons always pair with a label.
 */
function Sidebar({
  brand,
  sections = [],
  footer,
  width = 232,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--dt-surface)',
      borderRight: '1px solid var(--dt-border-strong)',
      fontFamily: 'var(--dt-font-sans)',
      ...style
    }
  }, brand ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 18px',
      borderBottom: '1px solid var(--dt-border)'
    }
  }, brand) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '12px 10px',
      display: 'grid',
      gap: 16,
      alignContent: 'start'
    }
  }, sections.map((sec, si) => /*#__PURE__*/React.createElement("div", {
    key: si,
    style: {
      display: 'grid',
      gap: 2
    }
  }, sec.heading ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 10,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--dt-muted)',
      padding: '4px 10px 6px'
    }
  }, sec.heading) : null, sec.items.map((it, ii) => /*#__PURE__*/React.createElement("a", {
    key: ii,
    href: it.href || '#',
    "aria-current": it.active ? 'page' : undefined,
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '8px 10px 8px 12px',
      borderRadius: 'var(--dt-radius-md)',
      textDecoration: 'none',
      fontSize: 13.5,
      fontWeight: it.active ? 600 : 500,
      color: it.active ? 'var(--dt-accent)' : 'var(--dt-muted-strong)',
      background: it.active ? 'var(--dt-tint-accent)' : 'transparent'
    }
  }, it.active ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      top: 7,
      bottom: 7,
      width: 3,
      borderRadius: 2,
      background: 'var(--dt-accent)'
    }
  }) : null, it.icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: '0 0 auto',
      color: it.active ? 'var(--dt-accent)' : 'var(--dt-muted)'
    },
    "aria-hidden": "true"
  }, it.icon) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, it.label), it.badge != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      color: it.active ? 'var(--dt-accent)' : 'var(--dt-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, it.badge) : null))))), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderTop: '1px solid var(--dt-border)'
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Stepper.jsx
try { (() => {
/**
 * Stepper — onboarding / multi-step progress (e.g. API 등록 → 키 연결 → 도구 노출).
 * Done steps show a check, the current step is persimmon, upcoming are muted.
 * Connectors are hairlines that fill persimmon up to the current step. Vertical
 * or horizontal. Step indices are squared (radius-sm), not bubbly circles.
 */
function Stepper({
  steps = [],
  current = 0,
  orientation = 'horizontal',
  style
}) {
  const vertical = orientation === 'vertical';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      alignItems: vertical ? 'stretch' : 'flex-start',
      gap: 0,
      ...style
    }
  }, steps.map((s, i) => {
    const done = i < current,
      active = i === current;
    const accent = done || active;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        flexDirection: vertical ? 'row' : 'column',
        alignItems: vertical ? 'flex-start' : 'stretch',
        flex: vertical ? 'none' : 1,
        minWidth: 0,
        gap: vertical ? 12 : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        alignItems: 'center',
        gap: vertical ? 6 : 10,
        ...(vertical ? {} : {
          width: '100%'
        })
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: '0 0 auto',
        width: 26,
        height: 26,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 'var(--dt-radius-sm)',
        fontFamily: 'var(--dt-font-mono)',
        fontSize: 12,
        fontWeight: 700,
        background: done ? 'var(--dt-accent)' : active ? 'var(--dt-tint-accent)' : 'var(--dt-surface-sunken)',
        color: done ? '#fff' : active ? 'var(--dt-accent)' : 'var(--dt-muted)',
        boxShadow: active ? 'inset 0 0 0 1.5px var(--dt-accent)' : done ? 'none' : 'inset 0 0 0 1px var(--dt-border-strong)'
      }
    }, done ? /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5",
      stroke: "currentColor",
      strokeWidth: "2.6",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })) : i + 1), i < steps.length - 1 ? /*#__PURE__*/React.createElement("span", {
      style: {
        background: done ? 'var(--dt-accent)' : 'var(--dt-border-strong)',
        ...(vertical ? {
          width: 2,
          minHeight: 22,
          flex: 1,
          marginTop: 2
        } : {
          height: 2,
          flex: 1
        })
      }
    }) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: vertical ? '2px 0 16px' : '10px 14px 0 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: accent ? 650 : 500,
        color: accent ? 'var(--dt-ink-strong)' : 'var(--dt-muted)'
      }
    }, s.label), s.description ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--dt-muted)',
        marginTop: 3,
        lineHeight: 1.45
      }
    }, s.description) : null));
  }));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/product/BrandLogo.jsx
try { (() => {
const SIZE = {
  sm: 18,
  md: 22,
  lg: 40,
  xl: 64
};

/**
 * Bridger wordmark. Mark-only (no symbol) — the brand detail is a single
 * persimmon period. Set in Pretendard heavy with tight tracking.
 */
function BrandLogo({
  size = 'md',
  period = true,
  lang = 'ko',
  style
}) {
  const fontSize = typeof size === 'number' ? size : SIZE[size] ?? SIZE.md;
  return /*#__PURE__*/React.createElement("span", {
    "aria-label": lang === 'ko' ? '브릿저' : 'Bridger',
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      fontFamily: 'var(--dt-font-sans)',
      fontWeight: 780,
      fontSize,
      letterSpacing: '-0.025em',
      lineHeight: 1,
      color: 'var(--dt-ink-strong)',
      userSelect: 'none',
      ...style
    }
  }, "Bridger", period ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--dt-accent)'
    }
  }, ".") : null);
}
Object.assign(__ds_scope, { BrandLogo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/BrandLogo.jsx", error: String((e && e.message) || e) }); }

// components/product/SectionCard.jsx
try { (() => {
/**
 * Console section panel: title + optional description and right-side
 * action, framing a body of content. The dashboard's primary content wrapper.
 */
function SectionCard({
  title,
  description,
  action,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      borderRadius: 'var(--dt-radius-lg)',
      background: 'var(--dt-surface)',
      boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)',
      padding: 'var(--dt-space-4)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--dt-space-3)',
      marginBottom: children ? 'var(--dt-space-3)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 650,
      letterSpacing: '-0.01em',
      color: 'var(--dt-ink-strong)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 6,
      fontSize: 13,
      lineHeight: 1.55,
      color: 'var(--dt-muted-strong)',
      maxWidth: 560
    }
  }, description) : null), action ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto'
    }
  }, action) : null), children);
}
Object.assign(__ds_scope, { SectionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/SectionCard.jsx", error: String((e && e.message) || e) }); }

// components/product/ToolCard.jsx
try { (() => {
const STATE_COLOR = {
  available: 'var(--dt-success)',
  managed: 'var(--dt-success)',
  locked: 'var(--dt-warning)'
};

/**
 * MCP tool card — the catalog/list unit. Category + method chips, tool name,
 * description, mono path, and a status affordance (available / managed / locked).
 */
function ToolCard({
  name,
  method = 'GET',
  category,
  description = '설명 없음',
  path = '/',
  state = 'available',
  stateLabel,
  style
}) {
  const cat = category ?? (name ? name.split('_')[0] : 'etc');
  const labels = {
    available: '사용 가능',
    managed: '관리형 키',
    locked: '키 등록'
  };
  return /*#__PURE__*/React.createElement("article", {
    className: "dt-tool-card",
    style: {
      borderRadius: 'var(--dt-radius-md)',
      background: 'var(--dt-surface)',
      boxShadow: 'var(--dt-ring), var(--dt-shadow-xs)',
      padding: '16px 18px',
      transition: 'box-shadow var(--dt-motion), background-color var(--dt-motion)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dt-chip dt-chip-muted"
  }, cat), /*#__PURE__*/React.createElement("span", {
    className: "dt-chip dt-chip-accent"
  }, method)), /*#__PURE__*/React.createElement("h4", {
    style: {
      marginTop: 11,
      fontSize: 15,
      fontWeight: 650,
      letterSpacing: '-0.01em',
      color: 'var(--dt-ink-strong)',
      wordBreak: 'break-all'
    }
  }, name)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      flex: '0 0 auto',
      fontSize: 12,
      fontWeight: 600,
      color: STATE_COLOR[state]
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '9999px',
      background: STATE_COLOR[state]
    }
  }), stateLabel ?? labels[state])), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--dt-muted-strong)',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 13,
      borderTop: '1px solid var(--dt-divider)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 12,
      color: 'var(--dt-muted)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, path)), /*#__PURE__*/React.createElement("style", null, '.dt-tool-card:hover{box-shadow:var(--dt-ring), var(--dt-shadow-md)}.dt-chip{font-family:var(--dt-font-mono);font-size:11px;font-weight:600;letter-spacing:.02em;padding:3px 8px;border-radius:var(--dt-radius-sm);background:var(--dt-surface-sunken)}.dt-chip-muted{color:var(--dt-muted-strong)}.dt-chip-accent{color:var(--dt-accent)}'));
}
Object.assign(__ds_scope, { ToolCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ToolCard.jsx", error: String((e && e.message) || e) }); }

// design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-canvas.jsx", error: String((e && e.message) || e) }); }

// redesign/canvas.jsx
try { (() => {
// Assembles the comparison canvas. Components come from window (dirA/B/C.jsx).
const {
  DesignCanvas,
  DCSection,
  DCArtboard
} = window;
const HERO_W = 1280,
  HERO_H = 760;
const SHEET_W = 1280,
  SHEET_H = 880;
function App() {
  return /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement(DCSection, {
    id: "dirA",
    title: "A \xB7 Editorial Grid",
    subtitle: "\uD5E4\uC5B4\uB77C\uC778 \uB8F0 + 0 \uB77C\uC6B4\uB4DC + \uADF8\uB9BC\uC790 0. \uD0C0\uC774\uD3EC\uAC00 \uC8FC\uC778\uACF5, \uAC10\uC0C9\uC740 \uC678\uACFC\uC801\uC73C\uB85C."
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "a-hero",
    label: "A \xB7 \uB79C\uB529 \uD788\uC5B4\uB85C",
    width: HERO_W,
    height: HERO_H
  }, /*#__PURE__*/React.createElement(DirA_Hero, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "a-sheet",
    label: "A \xB7 \uC2DC\uC2A4\uD15C \uBA85\uC138",
    width: SHEET_W,
    height: SHEET_H
  }, /*#__PURE__*/React.createElement(DirA_Sheet, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "dirB",
    title: "B \xB7 Instrument",
    subtitle: "\uBAA8\uB178 \uC911\uC2EC \uACC4\uAE30\uD310. \uBCF4\uB354 \uC140 \uADF8\uB9AC\uB4DC, \uD0EDular \uC218\uCE58, \uB77C\uC774\uBE0C \uC0C1\uD0DC. \uAC10\uC0C9 = \uD65C\uC131/\uC2E4\uD589."
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "b-hero",
    label: "B \xB7 \uB79C\uB529 \uD788\uC5B4\uB85C",
    width: HERO_W,
    height: HERO_H
  }, /*#__PURE__*/React.createElement(DirB_Hero, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "b-sheet",
    label: "B \xB7 \uC2DC\uC2A4\uD15C \uBA85\uC138",
    width: SHEET_W,
    height: SHEET_H
  }, /*#__PURE__*/React.createElement(DirB_Sheet, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "dirC",
    title: "C \xB7 Bold Blocks",
    subtitle: "\uCEEC\uB7EC \uBE14\uB85C\uD0B9(\uC789\uD06C\uBE14\uB799 + \uAC10\uC0C9 + \uD398\uC774\uD37C). \uD3EC\uC2A4\uD130\uAE09 \uD0C0\uC774\uD3EC, \uADF9\uB2E8\uC801 \uC704\uACC4 \uB300\uBE44."
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "c-hero",
    label: "C \xB7 \uB79C\uB529 \uD788\uC5B4\uB85C",
    width: HERO_W,
    height: HERO_H
  }, /*#__PURE__*/React.createElement(DirC_Hero, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "c-sheet",
    label: "C \xB7 \uC2DC\uC2A4\uD15C \uBA85\uC138",
    width: SHEET_W,
    height: SHEET_H
  }, /*#__PURE__*/React.createElement(DirC_Sheet, null))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/canvas.jsx", error: String((e && e.message) || e) }); }

// redesign/dirA.jsx
try { (() => {
// Direction A — Editorial Grid. Exports DirA_Hero, DirA_Sheet to window.
const DirA_Hero = () => /*#__PURE__*/React.createElement("div", {
  className: "dir dirA"
}, /*#__PURE__*/React.createElement("div", {
  className: "frame"
}, /*#__PURE__*/React.createElement("div", {
  className: "nav"
}, /*#__PURE__*/React.createElement("div", {
  className: "wordmark"
}, "Bridger", /*#__PURE__*/React.createElement("span", {
  className: "dot"
}, ".")), /*#__PURE__*/React.createElement("nav", {
  className: "navlinks"
}, /*#__PURE__*/React.createElement("span", {
  className: "on"
}, "\uC81C\uD488"), /*#__PURE__*/React.createElement("span", null, "\uB3C4\uAD6C"), /*#__PURE__*/React.createElement("span", null, "\uC608\uC2DC"), /*#__PURE__*/React.createElement("span", null, "\uAC00\uC774\uB4DC")), /*#__PURE__*/React.createElement("div", {
  className: "navmeta"
}, "portal.datari.kr")), /*#__PURE__*/React.createElement("div", {
  className: "hero"
}, /*#__PURE__*/React.createElement("div", {
  className: "hero-l"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "idx"
}, /*#__PURE__*/React.createElement("span", null, "\uACF5\uACF5\uB370\uC774\uD130 \uAC8C\uC774\uD2B8\uC6E8\uC774"), /*#__PURE__*/React.createElement("b", null, "001 / 04")), /*#__PURE__*/React.createElement("h1", {
  className: "disp"
}, "\uC5B4\uB824\uC6B4", /*#__PURE__*/React.createElement("br", null), "\uACF5\uACF5 API\uB97C", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  className: "mark"
}, "\uD558\uB098\uB85C"), " \uC787\uB2E4"), /*#__PURE__*/React.createElement("p", {
  className: "lede"
}, "OpenAPI \uC2A4\uD399\uC744 MCP\xB7REST\uB85C \uC5F0\uACB0\uD558\uACE0, \uC11C\uBE44\uC2A4\uD0A4\uC640 \uC751\uB2F5 \uC815\uADDC\uD654\uB97C \uD55C\uACF3\uC5D0\uC11C \uAD00\uB9AC\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
  className: "cta-row"
}, /*#__PURE__*/React.createElement("button", {
  className: "btn-a solid"
}, "\uCF58\uC194 \uC2DC\uC791\uD558\uAE30 \u2192"), /*#__PURE__*/React.createElement("button", {
  className: "btn-a plain"
}, "\uAC00\uC774\uB4DC \uBCF4\uAE30"))), /*#__PURE__*/React.createElement("div", {
  className: "footnums"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "n tnum"
}, "230+"), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, "\uC5F0\uB3D9 API")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "n tnum"
}, "14"), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, "\uB370\uC774\uD130 \uBD84\uC57C")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "MCP\xB7REST"), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, "\uB450 \uD504\uB85C\uD1A0\uCF5C")))), /*#__PURE__*/React.createElement("div", {
  className: "hero-r"
}, /*#__PURE__*/React.createElement("div", {
  className: "rhead"
}, /*#__PURE__*/React.createElement("span", {
  className: "t"
}, "\uC5F0\uB3D9 \uCE74\uD0C8\uB85C\uADF8"), /*#__PURE__*/React.createElement("span", {
  className: "c"
}, "data.go.kr")), [['01', '기상청 단기예보', 'weather_getVilageFcst', 'ok', '선택됨'], ['02', '국토교통부 실거래가', 'molit_rtMng', 'run', '실행중'], ['03', '한국은행 ECOS', 'bok_statSearch', 'ok', '선택됨'], ['04', '서울 실시간 도시데이터', 'seoul_citydata', 'ok', '선택됨'], ['05', '공공데이터포털 검색', 'gov_dataSearch', 'run', '실행중'], ['06', '도로교통공단 사고정보', 'koroad_accident', 'ok', '선택됨']].map(([ix, nm, id, st, lab]) => /*#__PURE__*/React.createElement("div", {
  className: "arow",
  key: ix
}, /*#__PURE__*/React.createElement("span", {
  className: "ix"
}, ix), /*#__PURE__*/React.createElement("span", {
  className: "nm"
}, nm, /*#__PURE__*/React.createElement("small", null, id)), /*#__PURE__*/React.createElement("span", {
  className: "st"
}, /*#__PURE__*/React.createElement("i", {
  className: `dot ${st}`
}), lab)))))));
const DirA_Sheet = () => /*#__PURE__*/React.createElement("div", {
  className: "dir dirA"
}, /*#__PURE__*/React.createElement("div", {
  className: "sheet"
}, /*#__PURE__*/React.createElement("div", {
  className: "sh-head"
}, /*#__PURE__*/React.createElement("h2", null, "\uC2DC\uC2A4\uD15C \uBA85\uC138 \xB7 Editorial Grid"), /*#__PURE__*/React.createElement("span", {
  className: "cap"
}, "A \xB7 hairline / 0 radius / no shadow")), /*#__PURE__*/React.createElement("div", {
  className: "sh-grid"
}, /*#__PURE__*/React.createElement("div", {
  className: "cell br"
}, /*#__PURE__*/React.createElement("div", {
  className: "lbl"
}, /*#__PURE__*/React.createElement("span", null, "TYPOGRAPHY"), /*#__PURE__*/React.createElement("b", null, "\uC704\uACC4")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "78 / 850"), /*#__PURE__*/React.createElement("span", {
  className: "ex",
  style: {
    fontSize: '30px',
    fontWeight: 850,
    letterSpacing: '-0.04em'
  }
}, "\uACF5\uACF5 API\uB97C \uC787\uB2E4")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "26 / 800"), /*#__PURE__*/React.createElement("span", {
  className: "ex",
  style: {
    fontSize: '20px',
    fontWeight: 800,
    letterSpacing: '-0.03em'
  }
}, "\uC5F0\uACB0 \uC0C1\uD0DC \uC810\uAC80")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "16 / 600"), /*#__PURE__*/React.createElement("span", {
  className: "ex",
  style: {
    fontSize: '15px',
    fontWeight: 600
  }
}, "\uCD5C\uADFC \uD30C\uC774\uD504\uB77C\uC778")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "14 / 400"), /*#__PURE__*/React.createElement("span", {
  className: "ex",
  style: {
    fontSize: '13.5px',
    color: 'var(--muted-x)'
  }
}, "\uAC8C\uC774\uD2B8\uC6E8\uC774 \uC751\uB2F5 \uC815\uADDC\uD654")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "MONO 12"), /*#__PURE__*/React.createElement("span", {
  className: "ex mono",
  style: {
    fontSize: '12px',
    color: 'var(--muted)'
  }
}, "service_key \xB7 GET /v1"))), /*#__PURE__*/React.createElement("div", {
  className: "cell"
}, /*#__PURE__*/React.createElement("div", {
  className: "lbl"
}, /*#__PURE__*/React.createElement("span", null, "COLOR"), /*#__PURE__*/React.createElement("b", null, "\uD314\uB808\uD2B8 \uC720\uC9C0")), /*#__PURE__*/React.createElement("div", {
  className: "swatches"
}, /*#__PURE__*/React.createElement("div", {
  className: "sw",
  style: {
    background: '#ec5e1f'
  }
}, "#ec5e1f"), /*#__PURE__*/React.createElement("div", {
  className: "sw",
  style: {
    background: '#d24e13'
  }
}, "#d24e13"), /*#__PURE__*/React.createElement("div", {
  className: "sw",
  style: {
    background: '#1b1a16'
  }
}, "#1b1a16"), /*#__PURE__*/React.createElement("div", {
  className: "sw l",
  style: {
    background: '#f4f3ef'
  }
}, "#f4f3ef"), /*#__PURE__*/React.createElement("div", {
  className: "sw l",
  style: {
    background: '#fcfbf9',
    boxShadow: 'inset 0 0 0 1px var(--line-x)'
  }
}, "paper")), /*#__PURE__*/React.createElement("div", {
  className: "badgeset",
  style: {
    marginTop: '18px'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "bdg ac"
}, "PERSIMMON"), /*#__PURE__*/React.createElement("span", {
  className: "bdg ok"
}, "SUCCESS"), /*#__PURE__*/React.createElement("span", {
  className: "bdg wr"
}, "WARNING"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "NEUTRAL"))), /*#__PURE__*/React.createElement("div", {
  className: "cell br"
}, /*#__PURE__*/React.createElement("div", {
  className: "lbl"
}, /*#__PURE__*/React.createElement("span", null, "CONTROLS"), /*#__PURE__*/React.createElement("b", null, "\uC0E4\uD504")), /*#__PURE__*/React.createElement("div", {
  className: "btnset"
}, /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-flex',
    border: '1px solid var(--ink-x)'
  }
}, /*#__PURE__*/React.createElement("button", {
  className: "btn-a solid",
  style: {
    height: '40px',
    fontSize: '13px'
  }
}, "\uD0A4 \uB4F1\uB85D"), /*#__PURE__*/React.createElement("button", {
  className: "btn-a plain",
  style: {
    height: '40px',
    fontSize: '13px'
  }
}, "\uB85C\uADF8 \uC5F4\uAE30")), /*#__PURE__*/React.createElement("button", {
  className: "btn-a",
  style: {
    height: '40px',
    fontSize: '13px',
    background: 'var(--sunken)',
    color: 'var(--ink-x)'
  }
}, "\uC7AC\uC2DC\uB3C4")), /*#__PURE__*/React.createElement("div", {
  className: "badgeset",
  style: {
    marginTop: '16px'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "bdg ac"
}, "MCP"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "REST"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "GET"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "SSE"))), /*#__PURE__*/React.createElement("div", {
  className: "cell",
  style: {
    borderBottom: 'none'
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "lbl"
}, /*#__PURE__*/React.createElement("span", null, "DATA + CODE"), /*#__PURE__*/React.createElement("b", null, "\uBC00\uB3C4")), /*#__PURE__*/React.createElement("table", {
  className: "minitable"
}, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\uB3C4\uAD6C"), /*#__PURE__*/React.createElement("th", null, "\uBD84\uC57C"), /*#__PURE__*/React.createElement("th", {
  style: {
    textAlign: 'right'
  }
}, "\uD638\uCD9C/\uC77C"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "\uAE30\uC0C1\uCCAD \uB2E8\uAE30\uC608\uBCF4"), /*#__PURE__*/React.createElement("td", null, "\uB0A0\uC528"), /*#__PURE__*/React.createElement("td", {
  className: "r"
}, "1,284")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "\uC2E4\uAC70\uB798\uAC00 \uC870\uD68C"), /*#__PURE__*/React.createElement("td", null, "\uBD80\uB3D9\uC0B0"), /*#__PURE__*/React.createElement("td", {
  className: "r"
}, "932")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "ECOS \uD1B5\uACC4"), /*#__PURE__*/React.createElement("td", null, "\uACBD\uC81C"), /*#__PURE__*/React.createElement("td", {
  className: "r"
}, "418"))))))));
Object.assign(window, {
  DirA_Hero,
  DirA_Sheet
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/dirA.jsx", error: String((e && e.message) || e) }); }

// redesign/dirB.jsx
try { (() => {
// Direction B — Instrument. Exports DirB_Hero, DirB_Sheet to window.
const DirB_Hero = () => /*#__PURE__*/React.createElement("div", {
  className: "dir dirB"
}, /*#__PURE__*/React.createElement("div", {
  className: "panel"
}, /*#__PURE__*/React.createElement("div", {
  className: "topbar"
}, /*#__PURE__*/React.createElement("div", {
  className: "tb-l"
}, /*#__PURE__*/React.createElement("div", {
  className: "wordmark"
}, "Bridger", /*#__PURE__*/React.createElement("span", {
  className: "dot"
}, ".")), /*#__PURE__*/React.createElement("span", {
  className: "tag"
}, "PUBLIC-DATA GATEWAY")), /*#__PURE__*/React.createElement("div", {
  className: "tb-r"
}, /*#__PURE__*/React.createElement("span", {
  className: "live"
}, /*#__PURE__*/React.createElement("i", {
  className: "pulse"
}), "LIVE"), /*#__PURE__*/React.createElement("span", null, "api.datari.kr"))), /*#__PURE__*/React.createElement("div", {
  className: "body"
}, /*#__PURE__*/React.createElement("div", {
  className: "b-l"
}, /*#__PURE__*/React.createElement("div", {
  className: "kicker"
}, "MCP \uB3C4\uC785 \uC804 API \uC6B4\uC601 \uACC4\uCE35"), /*#__PURE__*/React.createElement("h1", {
  className: "disp"
}, "\uC5B4\uB824\uC6B4 \uACF5\uACF5 API\uB97C", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "\uD558\uB098\uB85C"), " \uC787\uB2E4"), /*#__PURE__*/React.createElement("p", {
  className: "lede"
}, "// OpenAPI \uC2A4\uD399\uC744 MCP \uB3C4\uAD6C\uB85C \uBCC0\uD658.", /*#__PURE__*/React.createElement("br", null), "// \uD0A4\uB294 \uAC8C\uC774\uD2B8\uC6E8\uC774\uC5D0\uC11C \uBCF4\uD638.", /*#__PURE__*/React.createElement("br", null), "// selected/configured \uB3C4\uAD6C \uC0C1\uD0DC \uC810\uAC80."), /*#__PURE__*/React.createElement("div", {
  className: "specrow"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "n tnum"
}, "230+"), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, "\uC5F0\uB3D9 API")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "n tnum"
}, "14"), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, "\uBD84\uC57C")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "n tnum"
}, "99.9%"), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, "uptime"))), /*#__PURE__*/React.createElement("div", {
  className: "cta-row"
}, /*#__PURE__*/React.createElement("button", {
  className: "btn-b solid"
}, "\uCF58\uC194 \uC2DC\uC791 \u2192"), /*#__PURE__*/React.createElement("button", {
  className: "btn-b plain"
}, "$ bridger init"))), /*#__PURE__*/React.createElement("div", {
  className: "readout"
}, /*#__PURE__*/React.createElement("div", {
  className: "ro-head"
}, /*#__PURE__*/React.createElement("span", null, "datari \xB7 mcp probe"), /*#__PURE__*/React.createElement("span", {
  className: "grn"
}, "\u25CF 200 OK")), /*#__PURE__*/React.createElement("div", {
  className: "ro-body"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "g"
}, "$"), " ", /*#__PURE__*/React.createElement("span", {
  className: "c"
}, "bridger probe"), " ", /*#__PURE__*/React.createElement("span", {
  className: "o"
}, "--tool"), " weather_getVilageFcst"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "g"
}, "\u2192"), " resolving service key\u2026 ", /*#__PURE__*/React.createElement("span", {
  className: "grn"
}, "ok")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "g"
}, "\u2192"), " normalizing response\u2026 ", /*#__PURE__*/React.createElement("span", {
  className: "grn"
}, "ok")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "g"
}, "\u2192"), " exposing as MCP tool\u2026 ", /*#__PURE__*/React.createElement("span", {
  className: "grn"
}, "ok")), /*#__PURE__*/React.createElement("div", {
  className: "g"
}, "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "o"
}, "tool"), " ", /*#__PURE__*/React.createElement("span", {
  className: "c"
}, "weather.getVilageFcst")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "o"
}, "method"), " GET ", /*#__PURE__*/React.createElement("span", {
  className: "g"
}, "\xB7"), " ", /*#__PURE__*/React.createElement("span", {
  className: "o"
}, "auth"), " gateway"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "g"
}, "$"), " ", /*#__PURE__*/React.createElement("span", {
  className: "c"
}, "_"))), /*#__PURE__*/React.createElement("div", {
  className: "ro-foot"
}, /*#__PURE__*/React.createElement("span", {
  className: "lab"
}, "latency"), /*#__PURE__*/React.createElement("span", {
  className: "val tnum"
}, "142ms"), /*#__PURE__*/React.createElement("span", {
  className: "lab"
}, "tools selected"), /*#__PURE__*/React.createElement("span", {
  className: "val tnum"
}, "230 / 412"), /*#__PURE__*/React.createElement("span", {
  className: "lab"
}, "free tier"), /*#__PURE__*/React.createElement("span", {
  className: "val"
}, "100\uD68C/\uC77C"))))));
const DirB_Sheet = () => /*#__PURE__*/React.createElement("div", {
  className: "dir dirB"
}, /*#__PURE__*/React.createElement("div", {
  className: "sheet"
}, /*#__PURE__*/React.createElement("div", {
  className: "sh-head"
}, /*#__PURE__*/React.createElement("span", {
  className: "t"
}, "SYSTEM SPEC \xB7 INSTRUMENT"), /*#__PURE__*/React.createElement("span", {
  className: "c"
}, "B \xB7 mono / cells / tabular")), /*#__PURE__*/React.createElement("div", {
  className: "grid2"
}, /*#__PURE__*/React.createElement("div", {
  className: "cell br"
}, /*#__PURE__*/React.createElement("div", {
  className: "clbl"
}, "TYPOGRAPHY"), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "52 / 830"), /*#__PURE__*/React.createElement("span", {
  className: "ex",
  style: {
    fontSize: '26px',
    fontWeight: 830,
    letterSpacing: '-0.04em'
  }
}, "\uD558\uB098\uB85C \uC787\uB2E4")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "18 / 600"), /*#__PURE__*/React.createElement("span", {
  className: "ex",
  style: {
    fontSize: '16px',
    fontWeight: 600
  }
}, "\uC5F0\uACB0 \uC0C1\uD0DC")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "MONO 12"), /*#__PURE__*/React.createElement("span", {
  className: "ex mono",
  style: {
    fontSize: '12px'
  }
}, "GET /v1/weather")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "MONO 11"), /*#__PURE__*/React.createElement("span", {
  className: "ex mono",
  style: {
    fontSize: '11px',
    color: 'var(--muted)'
  }
}, "req_8f2a \xB7 142ms \xB7 tnum"))), /*#__PURE__*/React.createElement("div", {
  className: "cell"
}, /*#__PURE__*/React.createElement("div", {
  className: "clbl"
}, "COLOR"), /*#__PURE__*/React.createElement("div", {
  className: "swrow"
}, /*#__PURE__*/React.createElement("div", {
  className: "sw",
  style: {
    background: '#ec5e1f'
  }
}, "ec5e1f"), /*#__PURE__*/React.createElement("div", {
  className: "sw",
  style: {
    background: '#1b1a16'
  }
}, "1b1a16"), /*#__PURE__*/React.createElement("div", {
  className: "sw l",
  style: {
    background: '#f4f3ef'
  }
}, "f4f3ef"), /*#__PURE__*/React.createElement("div", {
  className: "sw l",
  style: {
    background: '#fff'
  }
}, "fff")), /*#__PURE__*/React.createElement("div", {
  className: "badgeset",
  style: {
    marginTop: '14px'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "bdg ac"
}, /*#__PURE__*/React.createElement("i", {
  className: "d"
}), "ACTIVE"), /*#__PURE__*/React.createElement("span", {
  className: "bdg ok"
}, /*#__PURE__*/React.createElement("i", {
  className: "d"
}), "200 OK"), /*#__PURE__*/React.createElement("span", {
  className: "bdg wr"
}, /*#__PURE__*/React.createElement("i", {
  className: "d"
}), "RETRY"))), /*#__PURE__*/React.createElement("div", {
  className: "cell br"
}, /*#__PURE__*/React.createElement("div", {
  className: "clbl"
}, "CONTROLS"), /*#__PURE__*/React.createElement("div", {
  className: "btnset"
}, /*#__PURE__*/React.createElement("button", {
  className: "btn-b solid"
}, "\uD0A4 \uB4F1\uB85D"), /*#__PURE__*/React.createElement("button", {
  className: "btn-b plain"
}, "$ \uB85C\uADF8 \uC5F4\uAE30"), /*#__PURE__*/React.createElement("button", {
  className: "btn-b plain",
  style: {
    borderColor: 'var(--line-x)',
    color: 'var(--muted-x)'
  }
}, "\uC7AC\uC2DC\uB3C4")), /*#__PURE__*/React.createElement("div", {
  className: "badgeset",
  style: {
    marginTop: '14px'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "MCP"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "REST"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "GET"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "SSE"))), /*#__PURE__*/React.createElement("div", {
  className: "cell",
  style: {
    borderBottom: 'none'
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "clbl"
}, "DATA"), /*#__PURE__*/React.createElement("table", {
  className: "minitable"
}, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "TOOL"), /*#__PURE__*/React.createElement("th", null, "FIELD"), /*#__PURE__*/React.createElement("th", {
  className: "r"
}, "REQ/D"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "weather_getVilageFcst"), /*#__PURE__*/React.createElement("td", null, "\uB0A0\uC528"), /*#__PURE__*/React.createElement("td", {
  className: "r"
}, "1,284")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "molit_rtMng"), /*#__PURE__*/React.createElement("td", null, "\uBD80\uB3D9\uC0B0"), /*#__PURE__*/React.createElement("td", {
  className: "r"
}, "932")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "bok_statSearch"), /*#__PURE__*/React.createElement("td", null, "\uACBD\uC81C"), /*#__PURE__*/React.createElement("td", {
  className: "r"
}, "418"))))))));
Object.assign(window, {
  DirB_Hero,
  DirB_Sheet
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/dirB.jsx", error: String((e && e.message) || e) }); }

// redesign/dirC.jsx
try { (() => {
// Direction C — Bold Blocks. Exports DirC_Hero, DirC_Sheet to window.
const DirC_Hero = () => /*#__PURE__*/React.createElement("div", {
  className: "dir dirC"
}, /*#__PURE__*/React.createElement("div", {
  className: "nav"
}, /*#__PURE__*/React.createElement("div", {
  className: "wordmark"
}, "Bridger", /*#__PURE__*/React.createElement("span", {
  className: "dot"
}, ".")), /*#__PURE__*/React.createElement("nav", {
  className: "navlinks"
}, /*#__PURE__*/React.createElement("span", null, "\uC81C\uD488"), /*#__PURE__*/React.createElement("span", null, "\uB3C4\uAD6C"), /*#__PURE__*/React.createElement("span", null, "\uC608\uC2DC"), /*#__PURE__*/React.createElement("span", null, "\uAC00\uC774\uB4DC")), /*#__PURE__*/React.createElement("a", {
  className: "navcta"
}, "\uCF58\uC194 \uC5F4\uAE30")), /*#__PURE__*/React.createElement("div", {
  className: "hero"
}, /*#__PURE__*/React.createElement("div", {
  className: "block"
}, /*#__PURE__*/React.createElement("div", {
  className: "tagline"
}, "\uACF5\uACF5\uB370\uC774\uD130 OpenAPI \u2192 MCP \xB7 REST"), /*#__PURE__*/React.createElement("h1", {
  className: "disp"
}, "\uC5B4\uB824\uC6B4 \uACF5\uACF5 API\uB97C", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  className: "o"
}, "\uD558\uB098\uB85C"), " \uC787\uB2E4"), /*#__PURE__*/React.createElement("p", {
  className: "lede"
}, "OpenAPI \uC2A4\uD399\uC744 MCP\xB7REST\uB85C \uC5F0\uACB0\uD558\uACE0, \uC11C\uBE44\uC2A4\uD0A4\uC640 \uC751\uB2F5 \uC815\uADDC\uD654\uB97C \uD55C\uACF3\uC5D0\uC11C \uAD00\uB9AC\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
  className: "cta-row"
}, /*#__PURE__*/React.createElement("button", {
  className: "btn-c solid"
}, "\uCF58\uC194 \uC2DC\uC791\uD558\uAE30 \u2192"), /*#__PURE__*/React.createElement("button", {
  className: "btn-c ghost"
}, "\uAC00\uC774\uB4DC \uBCF4\uAE30")), /*#__PURE__*/React.createElement("div", {
  className: "bignum tnum"
}, "230")), /*#__PURE__*/React.createElement("div", {
  className: "strip"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "n tnum"
}, "230+"), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, "\uC5F0\uB3D9 API")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "n tnum"
}, "14"), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, "\uB370\uC774\uD130 \uBD84\uC57C")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "MCP\xB7REST"), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, "\uB450 \uD504\uB85C\uD1A0\uCF5C")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "n"
}, "100\uD68C/\uC77C"), /*#__PURE__*/React.createElement("div", {
  className: "k"
}, "\uBB34\uB8CC \uD55C\uB3C4")))));
const DirC_Sheet = () => /*#__PURE__*/React.createElement("div", {
  className: "dir dirC"
}, /*#__PURE__*/React.createElement("div", {
  className: "sheet"
}, /*#__PURE__*/React.createElement("div", {
  className: "sh-head"
}, /*#__PURE__*/React.createElement("h2", null, "\uC2DC\uC2A4\uD15C \uBA85\uC138", /*#__PURE__*/React.createElement("span", {
  className: "dot"
}, ".")), /*#__PURE__*/React.createElement("span", {
  className: "cap"
}, "C \xB7 bold blocks / 4px radius / no shadow")), /*#__PURE__*/React.createElement("div", {
  className: "sh-grid"
}, /*#__PURE__*/React.createElement("div", {
  className: "cell br"
}, /*#__PURE__*/React.createElement("div", {
  className: "clbl"
}, "TYPOGRAPHY \u2014 \uADF9\uB2E8\uC801 \uC704\uACC4 \uB300\uBE44"), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "92 / 880"), /*#__PURE__*/React.createElement("span", {
  className: "ex",
  style: {
    fontSize: '34px',
    fontWeight: 880,
    letterSpacing: '-0.05em'
  }
}, "\uD558\uB098\uB85C \uC787\uB2E4")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "30 / 850"), /*#__PURE__*/React.createElement("span", {
  className: "ex",
  style: {
    fontSize: '22px',
    fontWeight: 850,
    letterSpacing: '-0.035em'
  }
}, "\uC5F0\uACB0 \uC0C1\uD0DC \uC810\uAC80")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "17 / 400"), /*#__PURE__*/React.createElement("span", {
  className: "ex",
  style: {
    fontSize: '15px',
    color: 'var(--muted-x)'
  }
}, "\uC751\uB2F5 \uC815\uADDC\uD654\uB97C \uD55C\uACF3\uC5D0\uC11C")), /*#__PURE__*/React.createElement("div", {
  className: "typerow"
}, /*#__PURE__*/React.createElement("span", {
  className: "sz"
}, "MONO 12"), /*#__PURE__*/React.createElement("span", {
  className: "ex mono",
  style: {
    fontSize: '12px',
    color: 'var(--muted)'
  }
}, "service_key \xB7 GET /v1"))), /*#__PURE__*/React.createElement("div", {
  className: "cell"
}, /*#__PURE__*/React.createElement("div", {
  className: "clbl"
}, "COLOR \u2014 \uBE14\uB85D\uC73C\uB85C \uC0AC\uC6A9"), /*#__PURE__*/React.createElement("div", {
  className: "swrow"
}, /*#__PURE__*/React.createElement("div", {
  className: "sw",
  style: {
    background: '#ec5e1f'
  }
}, "#ec5e1f"), /*#__PURE__*/React.createElement("div", {
  className: "sw",
  style: {
    background: '#1b1a16'
  }
}, "#1b1a16"), /*#__PURE__*/React.createElement("div", {
  className: "sw l",
  style: {
    background: '#f4f3ef'
  }
}, "#f4f3ef"), /*#__PURE__*/React.createElement("div", {
  className: "sw l",
  style: {
    background: '#fbfaf8',
    boxShadow: 'inset 0 0 0 1px var(--line)'
  }
}, "paper")), /*#__PURE__*/React.createElement("div", {
  className: "badgeset",
  style: {
    marginTop: '18px'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "bdg ac"
}, "PERSIMMON"), /*#__PURE__*/React.createElement("span", {
  className: "bdg ok"
}, "SUCCESS"), /*#__PURE__*/React.createElement("span", {
  className: "bdg wr"
}, "WARNING"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "NEUTRAL"))), /*#__PURE__*/React.createElement("div", {
  className: "cell br"
}, /*#__PURE__*/React.createElement("div", {
  className: "clbl"
}, "CONTROLS \u2014 \uCCAD\uD0A4\uD558\uACE0 \uB300\uB2F4\uD558\uAC8C"), /*#__PURE__*/React.createElement("div", {
  className: "btnset"
}, /*#__PURE__*/React.createElement("button", {
  className: "btn-c solid",
  style: {
    height: '44px',
    fontSize: '14px'
  }
}, "\uD0A4 \uB4F1\uB85D"), /*#__PURE__*/React.createElement("button", {
  className: "btn-c",
  style: {
    height: '44px',
    fontSize: '14px',
    background: 'var(--ink-x)',
    color: '#fff'
  }
}, "\uB85C\uADF8 \uC5F4\uAE30"), /*#__PURE__*/React.createElement("button", {
  className: "btn-c",
  style: {
    height: '44px',
    fontSize: '14px',
    background: 'var(--sunken)',
    color: 'var(--ink-x)'
  }
}, "\uC7AC\uC2DC\uB3C4")), /*#__PURE__*/React.createElement("div", {
  className: "badgeset",
  style: {
    marginTop: '16px'
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "bdg ac"
}, "MCP"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "REST"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "GET"), /*#__PURE__*/React.createElement("span", {
  className: "bdg"
}, "SSE"))), /*#__PURE__*/React.createElement("div", {
  className: "cell",
  style: {
    borderBottom: 'none'
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "clbl"
}, "DATA \u2014 \uAC15\uD55C \uD5E4\uB354 \uB8F0"), /*#__PURE__*/React.createElement("table", {
  className: "minitable"
}, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "\uB3C4\uAD6C"), /*#__PURE__*/React.createElement("th", null, "\uBD84\uC57C"), /*#__PURE__*/React.createElement("th", {
  style: {
    textAlign: 'right'
  }
}, "\uD638\uCD9C/\uC77C"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "\uAE30\uC0C1\uCCAD \uB2E8\uAE30\uC608\uBCF4"), /*#__PURE__*/React.createElement("td", null, "\uB0A0\uC528"), /*#__PURE__*/React.createElement("td", {
  className: "r"
}, "1,284")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "\uC2E4\uAC70\uB798\uAC00 \uC870\uD68C"), /*#__PURE__*/React.createElement("td", null, "\uBD80\uB3D9\uC0B0"), /*#__PURE__*/React.createElement("td", {
  className: "r"
}, "932")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "ECOS \uD1B5\uACC4"), /*#__PURE__*/React.createElement("td", null, "\uACBD\uC81C"), /*#__PURE__*/React.createElement("td", {
  className: "r"
}, "418"))))))));
Object.assign(window, {
  DirC_Hero,
  DirC_Sheet
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/dirC.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/app.jsx
try { (() => {
/* Bridger Console — sidebar, shell, dashboard overview */
const {
  useState,
  useEffect,
  useRef
} = React;
function Icon({
  name,
  size = 16,
  strokeWidth = 1.9,
  style
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide && window.lucide[name]) {
      const el = window.lucide.createElement(window.lucide[name]);
      el.setAttribute('width', size);
      el.setAttribute('height', size);
      el.setAttribute('stroke-width', strokeWidth);
      ref.current.innerHTML = '';
      ref.current.appendChild(el);
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      ...style
    },
    "aria-hidden": "true"
  });
}
function BrandMark({
  size = 20
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      fontFamily: 'var(--dt-font-sans)',
      fontWeight: 780,
      fontSize: size,
      letterSpacing: '-0.025em',
      color: 'var(--dt-ink-strong)',
      lineHeight: 1,
      userSelect: 'none'
    },
    "aria-label": "Bridger"
  }, "Bridger", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--dt-accent)'
    }
  }, "."));
}
const NAV = [{
  label: '개요',
  items: [{
    id: 'dashboard',
    label: '대시보드',
    icon: 'LayoutDashboard'
  }, {
    id: 'guide',
    label: '가이드',
    icon: 'BookOpen'
  }]
}, {
  label: '도구 관리',
  items: [{
    id: 'marketplace',
    label: '마켓플레이스',
    icon: 'Store'
  }, {
    id: 'tools',
    label: '도구 목록',
    icon: 'Wrench'
  }, {
    id: 'presets',
    label: '연동 카탈로그',
    icon: 'Boxes'
  }, {
    id: 'government',
    label: '정부 API',
    icon: 'LibraryBig'
  }, {
    id: 'register',
    label: 'API 등록',
    icon: 'PlusCircle'
  }]
}, {
  label: '모니터링',
  items: [{
    id: 'usage',
    label: '사용량',
    icon: 'Gauge'
  }, {
    id: 'servers',
    label: '서버 상태',
    icon: 'Server'
  }, {
    id: 'logs',
    label: '실행 로그',
    icon: 'FileClock'
  }]
}, {
  label: '설정',
  items: [{
    id: 'apikeys',
    label: 'API 키',
    icon: 'KeyRound'
  }, {
    id: 'settings',
    label: '계정 설정',
    icon: 'Settings'
  }]
}];
function Sidebar({
  active,
  onNav,
  theme,
  onTheme,
  locale,
  onLocale
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: "side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "side-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "side-head-top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(BrandMark, {
    size: 20
  }), /*#__PURE__*/React.createElement("div", {
    className: "side-sub"
  }, locale === 'ko' ? '운영 콘솔' : 'Operations console')), /*#__PURE__*/React.createElement("div", {
    className: "side-toggles"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-btn-sm",
    style: {
      width: 'auto',
      padding: '0 10px',
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 11,
      fontWeight: 700
    },
    onClick: onLocale
  }, locale === 'ko' ? 'EN' : '한'), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn-sm",
    onClick: onTheme,
    "aria-label": "\uD14C\uB9C8"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: theme === 'dark' ? 'Sun' : 'Moon',
    size: 16
  })))), /*#__PURE__*/React.createElement("div", {
    className: "side-stream"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "side-stream-label"
  }, locale === 'ko' ? '실시간 연결' : 'Live stream'), /*#__PURE__*/React.createElement("div", {
    className: "side-stream-val"
  }, locale === 'ko' ? '실시간 연결 정상' : 'Connected')), /*#__PURE__*/React.createElement("span", {
    className: "chip chip-ok"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'var(--dt-success)'
    }
  }), locale === 'ko' ? '실시간' : 'live'))), /*#__PURE__*/React.createElement("nav", {
    className: "side-nav"
  }, NAV.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.label
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-group-label"
  }, g.label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4
    }
  }, g.items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    className: `nav-item${active === it.id ? ' active' : ''}`,
    onClick: () => onNav(it.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-item-ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, it.label))))))), /*#__PURE__*/React.createElement("div", {
    className: "side-foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cbtn-ghost",
    style: {
      width: '100%',
      justifyContent: 'flex-start',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "LogOut",
    size: 15
  }), locale === 'ko' ? '로그아웃' : 'Sign out')));
}

/* ── Dashboard overview ── */
function Dashboard({
  locale
}) {
  const stats = [{
    label: locale === 'ko' ? '연결된 서버' : 'Servers',
    value: '12',
    hint: locale === 'ko' ? '정상 11 · 점검 1' : '11 ok · 1 check',
    dot: 'var(--dt-success)'
  }, {
    label: locale === 'ko' ? '노출 도구' : 'Tools',
    value: '248',
    hint: locale === 'ko' ? '선택 86 · 구성 162' : '86 selected',
    dot: 'var(--dt-accent)'
  }, {
    label: locale === 'ko' ? '오늘 호출' : 'Calls today',
    value: '34.2K',
    hint: locale === 'ko' ? '+8.4% 전일 대비' : '+8.4% vs. yesterday',
    dot: 'var(--dt-cobalt)'
  }, {
    label: locale === 'ko' ? '평균 지연' : 'p50 latency',
    value: '142ms',
    hint: locale === 'ko' ? '정상 범위' : 'within range',
    dot: 'var(--dt-success)'
  }];
  const jobs = [{
    name: '기상청 단기예보 조회서비스',
    id: 'kma/vilage-fcst',
    status: 'success',
    t: '2분 전'
  }, {
    name: '국토교통부 실거래가 조회',
    id: 'molit/rtms-trade',
    status: 'running',
    t: '5분 전'
  }, {
    name: '한국은행 환율 통계',
    id: 'bok/exchange-rate',
    status: 'success',
    t: '21분 전'
  }, {
    name: '서울시 따릉이 실시간',
    id: 'seoul/bike-live',
    status: 'failed',
    t: '1시간 전'
  }, {
    name: '식약처 의약품 정보',
    id: 'mfds/drug-info',
    status: 'success',
    t: '3시간 전'
  }];
  const statusColor = {
    success: 'var(--dt-success)',
    running: 'var(--dt-info)',
    failed: 'var(--dt-danger)'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, locale === 'ko' ? '대시보드' : 'Dashboard'), /*#__PURE__*/React.createElement("p", null, locale === 'ko' ? '게이트웨이 연결 상태와 최근 운영 작업.' : 'Gateway status and recent operations.')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "cbtn-sec"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "RefreshCw",
    size: 15
  }), locale === 'ko' ? '새로고침' : 'Refresh'), /*#__PURE__*/React.createElement("button", {
    className: "cbtn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "PlusCircle",
    size: 15
  }), locale === 'ko' ? 'API 등록' : 'Register API'))), /*#__PURE__*/React.createElement("div", {
    className: "workbench"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wb-copy"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "wb-title"
  }, locale === 'ko' ? '공공 API를 도구로 만드세요' : 'Turn a public API into tools'), /*#__PURE__*/React.createElement("p", {
    className: "wb-desc"
  }, locale === 'ko' ? 'OpenAPI 스펙을 가져와 MCP 도구로 변환하고, 서비스키를 검증한 뒤 승인된 도구만 노출합니다.' : 'Import an OpenAPI spec, convert it to MCP tools, validate the key, and expose only approved tools.')), /*#__PURE__*/React.createElement("div", {
    className: "wb-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "cbtn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Wrench",
    size: 15
  }), locale === 'ko' ? '도구 만들기' : 'Build tools'), /*#__PURE__*/React.createElement("button", {
    className: "cbtn-sec"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "BookOpen",
    size: 15
  }), locale === 'ko' ? '가이드' : 'Guide')), /*#__PURE__*/React.createElement("div", {
    className: "wb-chips"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip chip-ok"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Check",
    size: 12,
    strokeWidth: 2.6
  }), locale === 'ko' ? '키 검증됨' : 'key valid'), /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Boxes",
    size: 12
  }), locale === 'ko' ? '프리셋 230+' : '230+ presets'), /*#__PURE__*/React.createElement("span", {
    className: "chip chip-warn"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "AlertTriangle",
    size: 12
  }), locale === 'ko' ? '점검 1' : '1 check'))), /*#__PURE__*/React.createElement("div", {
    className: "wb-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wb-screen-head"
  }, /*#__PURE__*/React.createElement("span", null, locale === 'ko' ? '게이트웨이 점검' : 'gateway probe'), /*#__PURE__*/React.createElement("span", {
    className: "term-ok"
  }, "\u25CF 200")), /*#__PURE__*/React.createElement("div", {
    className: "terminal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "terminal-bar"
  }, /*#__PURE__*/React.createElement("span", null, "datari \xB7 mcp probe"), /*#__PURE__*/React.createElement("span", null, "sse")), /*#__PURE__*/React.createElement("pre", null, /*#__PURE__*/React.createElement("span", {
    className: "term-mut"
  }, "$"), " bridger probe ", /*#__PURE__*/React.createElement("span", {
    className: "term-acc"
  }, "--tool"), " weather_getVilageFcst", '\n', /*#__PURE__*/React.createElement("span", {
    className: "term-mut"
  }, "\u2192 resolving service key\u2026"), " ", /*#__PURE__*/React.createElement("span", {
    className: "term-ok"
  }, "ok"), '\n', /*#__PURE__*/React.createElement("span", {
    className: "term-mut"
  }, "\u2192 GET /v1/weather/vilage-fcst"), '\n', /*#__PURE__*/React.createElement("span", {
    className: "term-mut"
  }, "\u2192 normalize \xB7 142ms"), " ", /*#__PURE__*/React.createElement("span", {
    className: "term-ok"
  }, "200 OK"), '\n', /*#__PURE__*/React.createElement("span", {
    className: "term-acc"
  }, "\u2713 tool ready"), " \xB7 req_8a72f1c0")))), /*#__PURE__*/React.createElement("div", {
    className: "stat-row"
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    className: "stat-cell",
    key: s.label
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, s.label), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, s.value), /*#__PURE__*/React.createElement("div", {
    className: "stat-hint"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: s.dot
    }
  }), s.hint)))), /*#__PURE__*/React.createElement(SemanticSearch, {
    locale: locale
  }), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "panel-title"
  }, locale === 'ko' ? '최근 파이프라인' : 'Recent pipelines'), /*#__PURE__*/React.createElement("div", {
    className: "panel-desc"
  }, locale === 'ko' ? '등록과 검증 작업 상태.' : 'Registration and validation jobs.'))), /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, locale === 'ko' ? '작업' : 'Job'), /*#__PURE__*/React.createElement("th", null, locale === 'ko' ? '상태' : 'Status'), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, locale === 'ko' ? '업데이트' : 'Updated'))), /*#__PURE__*/React.createElement("tbody", null, jobs.map(j => /*#__PURE__*/React.createElement("tr", {
    key: j.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "cell-name"
  }, j.name), /*#__PURE__*/React.createElement("div", {
    className: "cell-id"
  }, j.id)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "cell-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: statusColor[j.status]
    }
  }), j.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      color: 'var(--dt-muted)',
      fontSize: 12
    }
  }, j.t))))))));
}
function SemanticSearch({
  locale
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "search-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-title",
    style: {
      marginBottom: 14
    }
  }, locale === 'ko' ? '필요한 공공 API를 질문으로 찾기' : 'Find a public API by asking'), /*#__PURE__*/React.createElement("div", {
    className: "search-bar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Search",
    size: 16,
    style: {
      color: 'var(--dt-muted)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    defaultValue: locale === 'ko' ? '주말 서울 날씨 예보 데이터' : 'weekend Seoul weather forecast'
  }), /*#__PURE__*/React.createElement("button", {
    className: "cbtn",
    style: {
      padding: '7px 14px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Sparkles",
    size: 14
  }), locale === 'ko' ? '검색' : 'Search')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, (locale === 'ko' ? ['기상청 단기예보', '초단기실황', '중기예보'] : ['KMA forecast', 'nowcast', 'mid-term']).map(t => /*#__PURE__*/React.createElement("span", {
    className: "chip",
    key: t
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "LibraryBig",
    size: 12
  }), t))));
}
window.ConsoleParts = {
  Icon,
  BrandMark,
  Sidebar,
  Dashboard
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/views.jsx
try { (() => {
/* Bridger Console — catalog, logs views + App root */
const {
  Icon: CIcon,
  BrandMark: CMark,
  Sidebar: CSidebar,
  Dashboard: CDashboard
} = window.ConsoleParts;
const {
  useState: useCS,
  useEffect: useCE
} = React;
const TOOLS = [{
  name: 'weather_getVilageFcst',
  method: 'GET',
  cat: 'weather',
  desc: '기상청 단기예보 — 3일 이내 시간별 기온·강수·풍속.',
  path: '/v1/weather/vilage-fcst',
  state: 'available'
}, {
  name: 'weather_getUltraSrtNcst',
  method: 'GET',
  cat: 'weather',
  desc: '초단기실황 — 현재 기온, 습도, 강수형태 실황값.',
  path: '/v1/weather/ultra-ncst',
  state: 'managed'
}, {
  name: 'realestate_getRTMSData',
  method: 'GET',
  cat: 'realestate',
  desc: '국토교통부 아파트 매매 실거래가 상세 자료.',
  path: '/v1/realestate/rtms-trade',
  state: 'locked'
}, {
  name: 'finance_getExchangeRate',
  method: 'GET',
  cat: 'finance',
  desc: '한국은행 일별 매매기준율 환율 통계.',
  path: '/v1/finance/exchange-rate',
  state: 'available'
}, {
  name: 'transport_getBusArrival',
  method: 'GET',
  cat: 'transport',
  desc: 'TAGO 정류소별 버스 도착 예정 정보.',
  path: '/v1/transport/bus-arrival',
  state: 'available'
}, {
  name: 'health_getHospitalInfo',
  method: 'GET',
  cat: 'health',
  desc: '건강보험심사평가원 병원 기본정보 검색.',
  path: '/v1/health/hospital-info',
  state: 'managed'
}];
const CAT_LABEL = {
  weather: '날씨',
  realestate: '부동산',
  finance: '금융',
  transport: '교통',
  health: '보건'
};
const STATE = {
  available: {
    c: 'var(--dt-success)',
    ko: '사용 가능',
    en: 'available'
  },
  managed: {
    c: 'var(--dt-success)',
    ko: '관리형 키',
    en: 'managed'
  },
  locked: {
    c: 'var(--dt-warning)',
    ko: '키 등록',
    en: 'key needed'
  }
};
function ToolCard({
  t,
  locale
}) {
  const st = STATE[t.state];
  return /*#__PURE__*/React.createElement("article", {
    className: "panel panel-int panel-pad",
    style: {
      display: 'grid',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, CAT_LABEL[t.cat] ?? t.cat), /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      color: 'var(--dt-accent)'
    }
  }, t.method)), /*#__PURE__*/React.createElement("h4", {
    style: {
      marginTop: 12,
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--dt-ink-strong)',
      letterSpacing: '-0.01em',
      wordBreak: 'break-all'
    }
  }, t.name)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      flex: '0 0 auto',
      fontSize: 12,
      fontWeight: 600,
      color: st.c
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: st.c
    }
  }), locale === 'ko' ? st.ko : st.en)), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--dt-muted-strong)'
    }
  }, t.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 13,
      borderTop: '1px solid color-mix(in srgb, var(--dt-border) 80%, transparent)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 12,
      color: 'var(--dt-muted)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, t.path), /*#__PURE__*/React.createElement("button", {
    className: "cbtn-ghost",
    style: {
      padding: '6px 10px',
      fontSize: 12,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "Code2",
    size: 13
  }), locale === 'ko' ? 'API' : 'API')));
}
function Catalog({
  locale
}) {
  const [filter, setFilter] = useCS('all');
  const cats = ['all', 'weather', 'realestate', 'finance', 'transport', 'health'];
  const shown = filter === 'all' ? TOOLS : TOOLS.filter(t => t.cat === filter);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, locale === 'ko' ? '정부 API' : 'Government APIs'), /*#__PURE__*/React.createElement("p", null, locale === 'ko' ? '공공데이터 카탈로그에서 도구를 찾아 연결하세요.' : 'Find and connect tools from the public-data catalog.')), /*#__PURE__*/React.createElement("button", {
    className: "cbtn"
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "PlusCircle",
    size: 15
  }), locale === 'ko' ? 'API 등록' : 'Register')), /*#__PURE__*/React.createElement("div", {
    className: "search-bar",
    style: {
      background: 'var(--dt-surface)'
    }
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "Search",
    size: 16,
    style: {
      color: 'var(--dt-muted)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: locale === 'ko' ? '도구 이름 또는 설명 검색…' : 'Search tools…'
  })), /*#__PURE__*/React.createElement("div", {
    className: "filter-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg"
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: filter === c ? 'on' : '',
    onClick: () => setFilter(c)
  }, c === 'all' ? locale === 'ko' ? '전체' : 'All' : CAT_LABEL[c] ?? c))), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 12,
      color: 'var(--dt-muted)',
      fontFamily: 'var(--dt-font-mono)'
    }
  }, shown.length, " / ", TOOLS.length)), /*#__PURE__*/React.createElement("div", {
    className: "cat-results"
  }, shown.map(t => /*#__PURE__*/React.createElement(ToolCard, {
    key: t.name,
    t: t,
    locale: locale
  }))));
}
function Logs({
  locale
}) {
  const rows = [{
    t: '14:22:07',
    tool: 'weather_getVilageFcst',
    code: 200,
    ms: 142,
    client: 'claude'
  }, {
    t: '14:21:55',
    tool: 'finance_getExchangeRate',
    code: 200,
    ms: 88,
    client: 'rest'
  }, {
    t: '14:21:40',
    tool: 'transport_getBusArrival',
    code: 200,
    ms: 204,
    client: 'chatgpt'
  }, {
    t: '14:20:12',
    tool: 'realestate_getRTMSData',
    code: 403,
    ms: 31,
    client: 'rest'
  }, {
    t: '14:19:08',
    tool: 'weather_getUltraSrtNcst',
    code: 200,
    ms: 119,
    client: 'claude'
  }, {
    t: '14:18:44',
    tool: 'health_getHospitalInfo',
    code: 500,
    ms: 5012,
    client: 'chatgpt'
  }, {
    t: '14:18:02',
    tool: 'weather_getVilageFcst',
    code: 200,
    ms: 137,
    client: 'claude'
  }];
  const codeColor = c => c < 300 ? 'var(--dt-success)' : c < 500 ? 'var(--dt-warning)' : 'var(--dt-danger)';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, locale === 'ko' ? '실행 로그' : 'Execution logs'), /*#__PURE__*/React.createElement("p", null, locale === 'ko' ? '도구 호출, 지연, 오류를 실시간으로 추적합니다.' : 'Trace tool calls, latency, and errors live.')), /*#__PURE__*/React.createElement("span", {
    className: "chip chip-ok"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'var(--dt-success)'
    }
  }), locale === 'ko' ? '실시간 스트림' : 'live stream')), /*#__PURE__*/React.createElement("div", {
    className: "panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "tbl"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, locale === 'ko' ? '시각' : 'Time'), /*#__PURE__*/React.createElement("th", null, locale === 'ko' ? '도구' : 'Tool'), /*#__PURE__*/React.createElement("th", null, locale === 'ko' ? '클라이언트' : 'Client'), /*#__PURE__*/React.createElement("th", null, locale === 'ko' ? '상태' : 'Status'), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, locale === 'ko' ? '지연' : 'Latency'))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 12,
      color: 'var(--dt-muted)'
    }
  }, r.t), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 12,
      color: 'var(--dt-ink)'
    }
  }, r.tool), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, r.client)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "cell-status",
    style: {
      color: codeColor(r.code)
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: codeColor(r.code)
    }
  }), r.code)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      fontFamily: 'var(--dt-font-mono)',
      fontSize: 12,
      color: r.ms > 1000 ? 'var(--dt-danger)' : 'var(--dt-muted-strong)'
    }
  }, r.ms, "ms"))))))));
}
function Placeholder({
  title,
  locale
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, title), /*#__PURE__*/React.createElement("p", null, locale === 'ko' ? '이 화면은 데모 범위에 포함되지 않았습니다.' : 'This screen is outside the demo scope.'))), /*#__PURE__*/React.createElement("div", {
    className: "panel panel-pad",
    style: {
      display: 'grid',
      placeItems: 'center',
      minHeight: 220,
      gap: 10,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-item-ico",
    style: {
      width: 44,
      height: 44
    }
  }, /*#__PURE__*/React.createElement(CIcon, {
    name: "LayoutDashboard",
    size: 20
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--dt-muted)',
      fontSize: 13,
      maxWidth: 320
    }
  }, locale === 'ko' ? '대시보드 · 정부 API · 실행 로그 화면이 구현되어 있습니다. 사이드바에서 전환해 보세요.' : 'Dashboard, Government APIs, and Logs are implemented. Switch from the sidebar.')));
}
const TITLES = {
  guide: '가이드',
  marketplace: '마켓플레이스',
  tools: '도구 목록',
  presets: '연동 카탈로그',
  register: 'API 등록',
  usage: '사용량',
  servers: '서버 상태',
  apikeys: 'API 키',
  settings: '계정 설정'
};
function App() {
  const [active, setActive] = useCS('dashboard');
  const [theme, setTheme] = useCS('light');
  const [locale, setLocale] = useCS('ko');
  useCE(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  let view;
  if (active === 'dashboard') view = /*#__PURE__*/React.createElement(CDashboard, {
    locale: locale
  });else if (active === 'government') view = /*#__PURE__*/React.createElement(Catalog, {
    locale: locale
  });else if (active === 'logs') view = /*#__PURE__*/React.createElement(Logs, {
    locale: locale
  });else view = /*#__PURE__*/React.createElement(Placeholder, {
    title: TITLES[active] ?? active,
    locale: locale
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "console"
  }, /*#__PURE__*/React.createElement(CSidebar, {
    active: active,
    onNav: setActive,
    theme: theme,
    onTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),
    locale: locale,
    onLocale: () => setLocale(l => l === 'ko' ? 'en' : 'ko')
  }), /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gw-strip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      background: 'var(--dt-success)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Gateway"), /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, "https://api.datari.kr")), view)));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/views.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/app.jsx
try { (() => {
/* Bridger landing — cinematic recreation. Self-contained; uses design-system tokens. */

const {
  useState,
  useEffect,
  useRef
} = React;

/* Lucide icon helper */
function Icon({
  name,
  size = 16,
  strokeWidth = 1.9,
  style
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && window.lucide && window.lucide[name]) {
      const el = window.lucide.createElement(window.lucide[name]);
      el.setAttribute('width', size);
      el.setAttribute('height', size);
      el.setAttribute('stroke-width', strokeWidth);
      ref.current.innerHTML = '';
      ref.current.appendChild(el);
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      ...style
    },
    "aria-hidden": "true"
  });
}

/* ── Theme + locale toggles ── */
function ThemeToggle({
  theme,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: onToggle,
    "aria-label": "\uD14C\uB9C8 \uC804\uD658",
    title: "\uD14C\uB9C8 \uC804\uD658"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: theme === 'dark' ? 'Sun' : 'Moon',
    size: 17
  }));
}
function Navbar({
  theme,
  onTheme,
  locale,
  onLocale
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = locale === 'ko' ? ['제품', '도구', '예시', '가이드'] : ['Product', 'Tools', 'Examples', 'Guides'];
  return /*#__PURE__*/React.createElement("header", {
    className: `nav${scrolled ? ' is-scrolled' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-shell nav-inner"
  }, /*#__PURE__*/React.createElement(BrandMark, null), /*#__PURE__*/React.createElement("nav", {
    className: "nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    className: "nav-link",
    href: "#"
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "nav-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    style: {
      width: 'auto',
      padding: '0 12px',
      fontSize: 12,
      fontWeight: 700,
      fontFamily: 'var(--dt-font-mono)'
    },
    onClick: onLocale,
    "aria-label": "\uC5B8\uC5B4 \uC804\uD658"
  }, locale === 'ko' ? 'EN' : '한'), /*#__PURE__*/React.createElement(ThemeToggle, {
    theme: theme,
    onToggle: onTheme
  }), /*#__PURE__*/React.createElement("a", {
    className: "btn-primary",
    href: "#",
    style: {
      padding: '10px 16px'
    }
  }, locale === 'ko' ? '콘솔 열기' : 'Open console', /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowRight",
    size: 15,
    strokeWidth: 2.4
  })))));
}

/* ── Brand wordmark (mark-only, persimmon period) ── */
function BrandMark({
  size = 22
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      fontFamily: 'var(--dt-font-sans)',
      fontWeight: 780,
      fontSize: size,
      letterSpacing: '-0.025em',
      color: 'var(--dt-ink-strong)',
      lineHeight: 1,
      userSelect: 'none'
    },
    "aria-label": "Bridger"
  }, "Bridger", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--dt-accent)'
    }
  }, "."));
}

/* ── Hero ── */
const HERO_WORDS_KO = ['하나로 잇다', 'Claude에 연결', 'REST로 호출', 'MCP로 노출'];
const HERO_WORDS_EN = ['into one', 'to Claude', 'over REST', 'through MCP'];
function Hero({
  locale
}) {
  const words = locale === 'ko' ? HERO_WORDS_KO : HERO_WORDS_EN;
  const [wi, setWi] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWi(i => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-backdrop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-wash"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-dots"
  }), /*#__PURE__*/React.createElement("svg", {
    className: "hero-lines",
    viewBox: "0 0 1440 720",
    preserveAspectRatio: "xMidYMid slice",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    className: "track",
    d: "M-40 250 H560 C700 250 720 170 880 170 H1500"
  }), /*#__PURE__*/React.createElement("path", {
    className: "track",
    d: "M-40 430 H520 C660 430 690 540 860 540 H1500"
  }), /*#__PURE__*/React.createElement("path", {
    className: "track",
    d: "M-40 340 H600 C740 340 760 330 920 330 H1500"
  }), /*#__PURE__*/React.createElement("path", {
    className: "flow a",
    d: "M-40 250 H560 C700 250 720 170 880 170 H1500"
  }), /*#__PURE__*/React.createElement("path", {
    className: "flow b",
    d: "M-40 430 H520 C660 430 690 540 860 540 H1500"
  }), /*#__PURE__*/React.createElement("path", {
    className: "flow c",
    d: "M-40 340 H600 C740 340 760 330 920 330 H1500"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dt-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement("h1", null, locale === 'ko' ? /*#__PURE__*/React.createElement(React.Fragment, null, "\uC5B4\uB824\uC6B4 \uACF5\uACF5 API\uB97C", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "swap accent"
  }, words[wi])) : /*#__PURE__*/React.createElement(React.Fragment, null, "Connect Korea's", /*#__PURE__*/React.createElement("br", null), "public data ", /*#__PURE__*/React.createElement("span", {
    className: "swap accent"
  }, words[wi]))), /*#__PURE__*/React.createElement("p", {
    className: "hero-lede"
  }, locale === 'ko' ? '공공데이터 OpenAPI를 MCP와 REST로 연결하고, 서비스키와 응답 정규화를 한곳에서 관리합니다.' : 'Connect public-data OpenAPI services over MCP and REST, with managed service keys and normalized responses in one place.'), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn-primary",
    href: "#",
    style: {
      padding: '13px 22px',
      fontSize: 15
    }
  }, locale === 'ko' ? '콘솔 시작하기' : 'Start in console', /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowRight",
    size: 16,
    strokeWidth: 2.4
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn-secondary",
    href: "#",
    style: {
      padding: '13px 22px',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "BookOpen",
    size: 16
  }), locale === 'ko' ? '가이드 보기' : 'Read the guides')), /*#__PURE__*/React.createElement("div", {
    className: "hero-signals"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-signal"
  }, /*#__PURE__*/React.createElement("b", null, "230+"), /*#__PURE__*/React.createElement("span", null, locale === 'ko' ? '연동 프리셋' : 'presets')), /*#__PURE__*/React.createElement("div", {
    className: "hero-signal"
  }, /*#__PURE__*/React.createElement("b", null, "14"), /*#__PURE__*/React.createElement("span", null, locale === 'ko' ? '데이터 카테고리' : 'categories')), /*#__PURE__*/React.createElement("div", {
    className: "hero-signal"
  }, /*#__PURE__*/React.createElement("b", null, "MCP / REST"), /*#__PURE__*/React.createElement("span", null, locale === 'ko' ? '두 프로토콜' : 'two protocols')))), /*#__PURE__*/React.createElement(HeroDemo, {
    locale: locale
  }))));
}
function HeroDemo({
  locale
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "demo reveal",
    style: {
      animationDelay: '0.12s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "demo-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "demo-dots"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
    className: "url"
  }, "portal.datari.kr / government-apis")), /*#__PURE__*/React.createElement("div", {
    className: "demo-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "demo-q"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Search",
    size: 15,
    style: {
      color: 'var(--dt-muted)'
    }
  }), /*#__PURE__*/React.createElement("span", null, locale === 'ko' ? '이번 주말 서울 날씨 데이터 있어?' : 'Any weather data for Seoul this weekend?'), /*#__PURE__*/React.createElement("span", {
    className: "caret"
  })), /*#__PURE__*/React.createElement("div", {
    className: "demo-ans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "demo-ans-head"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Sparkles",
    size: 13,
    style: {
      color: 'var(--dt-accent)'
    }
  }), locale === 'ko' ? '추천 공공 API · 2건' : 'Recommended APIs · 2'), /*#__PURE__*/React.createElement("div", {
    className: "demo-api"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, locale === 'ko' ? '기상청 단기예보 조회서비스' : 'KMA Short-term Forecast'), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, "GET \xB7 api.datari.kr/v1/weather/vilage-fcst")), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-success",
    style: {
      flex: '0 0 auto'
    }
  }, locale === 'ko' ? '연결됨' : 'ready')), /*#__PURE__*/React.createElement("div", {
    className: "demo-api"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, locale === 'ko' ? '기상청 초단기실황 조회' : 'KMA Ultra-short Nowcast'), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, "GET \xB7 api.datari.kr/v1/weather/ultra-ncst")), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-accent",
    style: {
      flex: '0 0 auto'
    }
  }, "MCP"))), /*#__PURE__*/React.createElement("div", {
    className: "demo-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "demo-foot"
  }, /*#__PURE__*/React.createElement("span", null, "req_8a72f1c0 \xB7 142ms"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--dt-success)'
    }
  }, "\u25CF 200 OK"))));
}
window.LandingParts1 = {
  Icon,
  Navbar,
  BrandMark,
  Hero
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/app2.jsx
try { (() => {
/* Bridger landing — part 2: convergence + Stripe-style tabbed code integration */

const {
  Icon,
  BrandMark
} = window.LandingParts1;
const {
  useState: useState2
} = React;

/* ── Convergence: scattered agencies → one gateway → AI + servers ── */
const SOURCES = [{
  name: '기상청',
  sub: 'KMA · 날씨',
  logo: '../../assets/agency-logos/kma.svg'
}, {
  name: '국토교통부',
  sub: 'MOLIT · 부동산·교통',
  logo: '../../assets/agency-logos/molit.svg'
}, {
  name: '한국은행',
  sub: 'BOK · 금융',
  logo: '../../assets/agency-logos/bok.svg'
}, {
  name: '서울특별시',
  sub: 'Seoul · 행정',
  logo: '../../assets/agency-logos/seoul.svg'
}, {
  name: '공공데이터포털',
  sub: 'data.go.kr',
  logo: '../../assets/agency-logos/gov.svg'
}];
const TARGETS = [{
  name: 'Claude',
  sub: 'MCP 커넥터',
  icon: 'Bot',
  tone: 'var(--dt-accent)'
}, {
  name: 'ChatGPT',
  sub: 'Remote MCP',
  icon: 'MessageSquare',
  tone: 'var(--dt-success)'
}, {
  name: 'REST 서버',
  sub: 'api.datari.kr',
  icon: 'Server',
  tone: 'var(--dt-cobalt)'
}];
function Convergence({
  locale
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("h2", null, locale === 'ko' ? '흩어진 공공데이터를 하나의 연결로' : 'Scattered public data, one connection'), /*#__PURE__*/React.createElement("p", null, locale === 'ko' ? '부처마다 다른 인증·포맷·엔드포인트를 브릿저가 흡수합니다. 서비스키는 게이트웨이에서 보호되고, 응답은 정규화되어 도착합니다.' : 'Bridger absorbs the per-agency auth, formats, and endpoints. Keys stay protected in the gateway; responses arrive normalized.')), /*#__PURE__*/React.createElement("div", {
    className: "converge"
  }, /*#__PURE__*/React.createElement("div", {
    className: "source-stack"
  }, SOURCES.map(s => /*#__PURE__*/React.createElement("div", {
    className: "source",
    key: s.name
  }, /*#__PURE__*/React.createElement("img", {
    src: s.logo,
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-name"
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "s-sub"
  }, s.sub))))), /*#__PURE__*/React.createElement("div", {
    className: "converge-core"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ring"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Network",
    size: 26,
    strokeWidth: 1.8
  })), /*#__PURE__*/React.createElement(BrandMark, {
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-accent"
  }, locale === 'ko' ? '정규화 · 키 보호' : 'normalized · keys safe')), /*#__PURE__*/React.createElement("div", {
    className: "target-stack"
  }, TARGETS.map(t => /*#__PURE__*/React.createElement("div", {
    className: "source",
    key: t.name
  }, /*#__PURE__*/React.createElement("span", {
    className: "cat-icon",
    style: {
      width: 34,
      height: 34,
      borderRadius: 9,
      background: 'var(--dt-surface-raised)',
      color: t.tone
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-name"
  }, t.name), /*#__PURE__*/React.createElement("div", {
    className: "s-sub"
  }, t.sub))))))));
}

/* ── Stripe-style tabbed integration code block ──
   Each line is an array of [text, type] segments.
   types: ink | com | str | num | key | punc | meth */
const CODE_TABS = [{
  id: 'mcp',
  label: 'MCP · JSON-RPC'
}, {
  id: 'rest',
  label: 'REST · curl'
}, {
  id: 'claude',
  label: 'Claude 커넥터'
}];
const T = (text, type = 'ink') => [text, type];
const CODE = {
  mcp: [[T('// mcp.datari.kr/mcp — tools/call', 'com')], [T('POST ', 'meth'), T('/mcp')], [T('{', 'punc')], [T('  "jsonrpc"', 'key'), T(': '), T('"2.0"', 'str'), T(',')], [T('  "method"', 'key'), T(': '), T('"tools/call"', 'str'), T(',')], [T('  "params"', 'key'), T(': '), T('{', 'punc')], [T('    "name"', 'key'), T(': '), T('"weather_getVilageFcst"', 'str'), T(',')], [T('    "arguments"', 'key'), T(': { '), T('"nx"', 'key'), T(': '), T('60', 'num'), T(', '), T('"ny"', 'key'), T(': '), T('127', 'num'), T(' }')], [T('  }', 'punc')], [T('}', 'punc')]],
  rest: [[T('# api.datari.kr — managed key injected by gateway', 'com')], [T('curl ', 'meth'), T('https://api.datari.kr/v1/weather/vilage-fcst', 'str'), T(' \\')], [T('  -H ', 'ink'), T('"Authorization: Bearer $DATARI_KEY"', 'str'), T(' \\')], [T('  -G --data-urlencode ', 'ink'), T('"nx=60"', 'str'), T(' \\')], [T('     --data-urlencode ', 'ink'), T('"ny=127"', 'str')], [T('')], [T('# → 200 OK · normalized JSON · 142ms', 'com')]],
  claude: [[T('// ~/.claude/connectors — remote MCP', 'com')], [T('{', 'punc')], [T('  "bridger"', 'key'), T(': '), T('{', 'punc')], [T('    "url"', 'key'), T(': '), T('"https://mcp.datari.kr/mcp"', 'str'), T(',')], [T('    "transport"', 'key'), T(': '), T('"sse"', 'str')], [T('  }', 'punc')], [T('}', 'punc')], [T('')], [T('// 승인된 도구만 노출됩니다', 'com')]]
};
const TOK_COLOR = {
  ink: '#e8e6df',
  com: '#7c8699',
  str: '#7ee0a3',
  num: '#8ab4ff',
  key: '#fbbf6b',
  punc: '#9aa3b2',
  meth: '#fb923c'
};
function IntegrationSection({
  locale
}) {
  const [tab, setTab] = useState2('mcp');
  const lines = CODE[tab];
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-tint"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "integration-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(26px,3.2vw,36px)',
      letterSpacing: '-0.035em',
      whiteSpace: 'pre-line'
    }
  }, locale === 'ko' ? 'AI에는 MCP로,\n서버에는 REST로.' : 'MCP for AI,\nREST for servers.'), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      color: 'var(--dt-muted-strong)',
      fontSize: 16,
      lineHeight: 1.6,
      maxWidth: 420
    }
  }, locale === 'ko' ? '하나의 게이트웨이가 두 인터페이스를 동시에 제공합니다. 서비스키 주입, 응답 정규화, 감사 로그는 공통입니다.' : 'One gateway serves both interfaces at once. Key injection, response normalization, and audit logs are shared.'), /*#__PURE__*/React.createElement("ul", {
    style: {
      marginTop: 24,
      display: 'grid',
      gap: 12,
      listStyle: 'none',
      padding: 0
    }
  }, (locale === 'ko' ? ['서비스키는 게이트웨이에서만 보관', '승인된 도구만 클라이언트에 노출', '모든 호출은 실행 로그로 추적'] : ['Keys live only in the gateway', 'Only approved tools reach clients', 'Every call is traced in logs']).map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontSize: 14,
      color: 'var(--dt-ink)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--dt-accent)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Check",
    size: 16,
    strokeWidth: 2.6
  })), t)))), /*#__PURE__*/React.createElement("div", {
    className: "code-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "code-tabs"
  }, CODE_TABS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    className: `code-tab${tab === c.id ? ' active' : ''}`,
    onClick: () => setTab(c.id)
  }, c.label))), /*#__PURE__*/React.createElement("pre", {
    className: "code-body"
  }, /*#__PURE__*/React.createElement("code", null, lines.map((segs, li) => /*#__PURE__*/React.createElement("div", {
    className: "code-line",
    key: li
  }, segs.map(([text, type], si) => /*#__PURE__*/React.createElement("span", {
    key: si,
    style: {
      color: TOK_COLOR[type] || TOK_COLOR.ink
    }
  }, text))))))))));
}
window.LandingParts2 = {
  Convergence,
  IntegrationSection
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/app2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/app3.jsx
try { (() => {
/* Bridger landing — part 3: tool categories, examples, final CTA, footer, App root */

const {
  Icon: Ic,
  Navbar,
  Hero,
  BrandMark: Mark
} = window.LandingParts1;
const {
  Convergence,
  IntegrationSection
} = window.LandingParts2;
const {
  useState: useS
} = React;
const CATEGORIES = [{
  key: 'weather',
  title: '날씨',
  en: 'Weather',
  icon: 'CloudSun',
  count: 36,
  tint: 'var(--dt-tint-cobalt)',
  color: 'var(--dt-cobalt)',
  tags: ['단기예보', '중기예보', '초단기실황', '생활기상']
}, {
  key: 'realEstate',
  title: '부동산',
  en: 'Real estate',
  icon: 'Building2',
  count: 27,
  tint: 'var(--dt-tint-accent)',
  color: 'var(--dt-accent)',
  tags: ['실거래가', '전월세', '공시지가', '건축물대장']
}, {
  key: 'finance',
  title: '금융',
  en: 'Finance',
  icon: 'TrendingUp',
  count: 19,
  tint: 'var(--dt-tint-success)',
  color: 'var(--dt-success)',
  tags: ['환율', '기준금리', '주가지수', '예금금리']
}, {
  key: 'transport',
  title: '교통',
  en: 'Transport',
  icon: 'Bus',
  count: 21,
  tint: 'var(--dt-tint-warning)',
  color: 'var(--dt-warning)',
  tags: ['버스도착', '지하철', '주차장', '교통량']
}, {
  key: 'health',
  title: '보건·의료',
  en: 'Health',
  icon: 'HeartPulse',
  count: 28,
  tint: 'var(--dt-tint-danger)',
  color: 'var(--dt-danger)',
  tags: ['병원찾기', '의약품', '감염병', '응급실']
}, {
  key: 'civic',
  title: '행정·공공',
  en: 'Civic',
  icon: 'Landmark',
  count: 20,
  tint: 'var(--dt-tint-muted)',
  color: 'var(--dt-muted-strong)',
  tags: ['민원', '인허가', '통계', '재정']
}, {
  key: 'culture',
  title: '문화·관광',
  en: 'Culture',
  icon: 'Palette',
  count: 18,
  tint: 'var(--dt-tint-accent)',
  color: 'var(--dt-accent)',
  tags: ['공연', '전시', '관광지', '축제']
}, {
  key: 'food',
  title: '식품·안전',
  en: 'Food & safety',
  icon: 'UtensilsCrossed',
  count: 14,
  tint: 'var(--dt-tint-cobalt)',
  color: 'var(--dt-cobalt)',
  tags: ['식품안전', '원산지', '영양정보', '회수']
}];
function ToolCategories({
  locale
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("h2", null, locale === 'ko' ? '카테고리로 바로 찾기' : 'Find it by category'), /*#__PURE__*/React.createElement("p", null, locale === 'ko' ? '230여 개 프리셋이 14개 카테고리로 정리되어 있습니다.' : 'Over 230 presets, organized into 14 categories.')), /*#__PURE__*/React.createElement("div", {
    className: "cat-grid"
  }, CATEGORIES.map(c => /*#__PURE__*/React.createElement("div", {
    className: "card cat-card",
    key: c.key
  }, /*#__PURE__*/React.createElement("div", {
    className: "cat-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cat-icon",
    style: {
      background: c.tint,
      color: c.color
    }
  }, /*#__PURE__*/React.createElement(Ic, {
    name: c.icon,
    size: 20,
    strokeWidth: 1.85
  })), /*#__PURE__*/React.createElement("span", {
    className: "cat-count"
  }, c.count)), /*#__PURE__*/React.createElement("h3", null, locale === 'ko' ? c.title : c.en), /*#__PURE__*/React.createElement("div", {
    className: "cat-tags"
  }, c.tags.slice(0, 4).map(t => /*#__PURE__*/React.createElement("span", {
    className: "cat-tag",
    key: t
  }, t))))))));
}

/* ── Example conversations ── */
function Examples({
  locale
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section section-tint"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("h2", null, locale === 'ko' ? 'AI가 공공데이터로 답합니다' : 'Your AI answers with public data'), /*#__PURE__*/React.createElement("p", null, locale === 'ko' ? '클라이언트에 브릿저를 연결하면, 일상 질문이 정식 공공 API 호출로 이어집니다.' : 'Connect Bridger to a client, and everyday questions become real public-API calls.')), /*#__PURE__*/React.createElement("div", {
    className: "ex-grid"
  }, /*#__PURE__*/React.createElement(ChatCard, {
    client: "Claude",
    tone: "var(--dt-accent)",
    tint: "var(--dt-tint-accent)",
    tool: "weather_getVilageFcst",
    q: locale === 'ko' ? '토요일 서울 아침 기온 알려줘' : 'What is Seoul morning temp on Saturday?',
    a: locale === 'ko' ? '기상청 단기예보 기준, 토요일 오전 6–9시 서울 기온은 18–21°C입니다. 강수확률은 20%로 낮습니다.' : 'Per KMA short-term forecast, Seoul reads 18–21°C from 6–9am Saturday, with a low 20% chance of rain.'
  }), /*#__PURE__*/React.createElement(ChatCard, {
    client: "ChatGPT",
    tone: "var(--dt-success)",
    tint: "var(--dt-tint-success)",
    tool: "realestate_getRTMSData",
    q: locale === 'ko' ? '강남구 아파트 최근 실거래가 추세는?' : 'Recent apartment price trend in Gangnam?',
    a: locale === 'ko' ? '국토교통부 실거래가 기준, 최근 3개월 강남구 아파트 평균 거래가는 소폭 상승했습니다. 표로 정리해 드릴게요.' : 'Per MOLIT transaction data, average Gangnam apartment prices rose slightly over 3 months. Here is a table.'
  }))));
}
function ChatCard({
  client,
  tone,
  tint,
  tool,
  q,
  a
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card chat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chat-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chat-avatar",
    style: {
      background: tint,
      color: tone
    }
  }, client[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--dt-ink-strong)'
    }
  }, client), /*#__PURE__*/React.createElement("span", {
    className: "badge badge-accent",
    style: {
      marginLeft: 'auto'
    }
  }, "Bridger MCP")), /*#__PURE__*/React.createElement("div", {
    className: "chat-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bubble user"
  }, q), /*#__PURE__*/React.createElement("div", {
    className: "bubble bot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tool"
  }, /*#__PURE__*/React.createElement(Ic, {
    name: "Wrench",
    size: 11,
    strokeWidth: 2.2
  }), " ", tool), /*#__PURE__*/React.createElement("div", null, a))));
}
function FinalCTA({
  locale
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      borderTop: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-dots",
    style: {
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement(Mark, {
    size: 26
  })), /*#__PURE__*/React.createElement("h2", null, locale === 'ko' ? '공공 API, 지금 이어보세요' : 'Bridge public APIs today'), /*#__PURE__*/React.createElement("p", null, locale === 'ko' ? '무료로 시작하고, 첫 호출부터 운영 키까지 한 흐름으로 검증하세요.' : 'Start free and validate from the first call to the operating key, in one flow.'), /*#__PURE__*/React.createElement("div", {
    className: "cta-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn-primary",
    href: "#",
    style: {
      padding: '13px 24px',
      fontSize: 15
    }
  }, locale === 'ko' ? '콘솔 시작하기' : 'Start in console', /*#__PURE__*/React.createElement(Ic, {
    name: "ArrowRight",
    size: 16,
    strokeWidth: 2.4
  })), /*#__PURE__*/React.createElement("a", {
    className: "btn-secondary",
    href: "#",
    style: {
      padding: '13px 24px',
      fontSize: 15
    }
  }, locale === 'ko' ? '문서 보기' : 'Read docs'))))));
}
function Footer({
  locale
}) {
  const cols = [{
    h: locale === 'ko' ? '제품' : 'Product',
    items: ['콘솔', '연동 카탈로그', '정부 API', '사용량']
  }, {
    h: locale === 'ko' ? '개발자' : 'Developers',
    items: ['API 가이드', 'MCP 연결', 'REST 호출', 'OpenAPI']
  }, {
    h: locale === 'ko' ? '회사' : 'Company',
    items: ['소개', '개인정보처리방침', '이용약관', '문의']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Mark, {
    size: 22
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--dt-muted)',
      maxWidth: 280
    }
  }, locale === 'ko' ? '어려운 공공 API를 하나로 이어주는 서비스. MCP와 REST로 연결합니다.' : 'One managed gateway for Korea\u2019s public-data APIs, over MCP and REST.')), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("h4", null, c.h), c.items.map(i => /*#__PURE__*/React.createElement("a", {
    href: "#",
    key: i
  }, i))))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Bridger \xB7 datari.kr"), /*#__PURE__*/React.createElement("span", null, "api.datari.kr \xB7 mcp.datari.kr \xB7 portal.datari.kr"))));
}
function App() {
  const [theme, setTheme] = useS('light');
  const [locale, setLocale] = useS('ko');
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return /*#__PURE__*/React.createElement("div", {
    className: "landing"
  }, /*#__PURE__*/React.createElement(Navbar, {
    theme: theme,
    onTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),
    locale: locale,
    onLocale: () => setLocale(l => l === 'ko' ? 'en' : 'ko')
  }), /*#__PURE__*/React.createElement(Hero, {
    locale: locale
  }), /*#__PURE__*/React.createElement(Convergence, {
    locale: locale
  }), /*#__PURE__*/React.createElement(IntegrationSection, {
    locale: locale
  }), /*#__PURE__*/React.createElement(ToolCategories, {
    locale: locale
  }), /*#__PURE__*/React.createElement(Examples, {
    locale: locale
  }), /*#__PURE__*/React.createElement(FinalCTA, {
    locale: locale
  }), /*#__PURE__*/React.createElement(Footer, {
    locale: locale
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/app3.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.KeyValue = __ds_scope.KeyValue;

__ds_ns.LogRow = __ds_scope.LogRow;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.UsageMeter = __ds_scope.UsageMeter;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Drawer = __ds_scope.Drawer;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Combobox = __ds_scope.Combobox;

__ds_ns.FileUpload = __ds_scope.FileUpload;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.CommandPalette = __ds_scope.CommandPalette;

__ds_ns.Menu = __ds_scope.Menu;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.BrandLogo = __ds_scope.BrandLogo;

__ds_ns.SectionCard = __ds_scope.SectionCard;

__ds_ns.ToolCard = __ds_scope.ToolCard;

})();
