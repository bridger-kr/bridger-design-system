import React from 'react';

const TONE_CLASS = {
  neutral: 'badge',
  accent: 'badge badge-accent',
  info: 'badge badge-info',
  success: 'badge badge-success',
  warning: 'badge badge-warning',
  danger: 'badge badge-danger',
};

/**
 * Status / classification badge. Pill-shaped, tinted. Status or
 * classification only — never decorative.
 */
export function Badge({ children, tone = 'neutral', dot = false, style, ...rest }) {
  const cls = TONE_CLASS[tone] ?? TONE_CLASS.neutral;
  return (
    <span className={cls} style={style} {...rest}>
      {dot ? (
        <span
          aria-hidden="true"
          style={{
            width: 6,
            height: 6,
            borderRadius: '9999px',
            background: 'currentColor',
            display: 'inline-block',
          }}
        />
      ) : null}
      {children}
    </span>
  );
}
