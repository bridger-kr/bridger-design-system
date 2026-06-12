import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

const SIZE = { sm: 20, md: 28, lg: 56, xl: 76 };
const LABEL = { ko: '브릿저', en: 'Bridger' };

function playMark(setArmed) {
  const scheduleFrame = typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame
    : (callback) => setTimeout(callback, 0);
  setArmed(false);
  scheduleFrame(() => scheduleFrame(() => setArmed(true)));
}

export const BrandLogo = forwardRef(function BrandLogo({ size = 'md', autoplay = false, loop = false, lang = 'ko', style }, ref) {
  const fontSize = typeof size === 'number' ? size : (SIZE[size] ?? SIZE.md);
  const [armed, setArmed] = useState(false);

  useImperativeHandle(ref, () => ({
    play() {
      playMark(setArmed);
    },
  }), []);

  useEffect(() => {
    if (!autoplay) return;
    const timeout = setTimeout(() => playMark(setArmed), 200);
    return () => clearTimeout(timeout);
  }, [autoplay]);

  useEffect(() => {
    if (!loop) return;
    let alive = true;
    const interval = setInterval(() => {
      if (!alive) return;
      playMark((value) => {
        if (alive) setArmed(value);
      });
    }, 7000);
    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [loop]);

  return (
    <span
      aria-label={LABEL[lang] ?? LABEL.ko}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.38em',
        fontFamily: 'var(--dt-font-sans)',
        fontWeight: 760,
        fontSize,
        letterSpacing: 0,
        lineHeight: 1,
        color: 'var(--dt-ink-strong)',
        userSelect: 'none',
        ...style,
      }}
    >
      <svg
        width="2.306em"
        height="1.24em"
        viewBox="0 0 44 24"
        aria-hidden="true"
        focusable="false"
        style={{ flex: '0 0 auto', overflow: 'visible' }}
      >
        <path d="M4 8H18C24 8 25 4 31 4H40" fill="none" stroke="color-mix(in srgb, var(--dt-ink-strong) 24%, transparent)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path d="M4 16H18C24 16 25 20 31 20H40" fill="none" stroke="color-mix(in srgb, var(--dt-ink-strong) 24%, transparent)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        <path className="dt-brand-logo-line" d="M4 8H18C24 8 25 4 31 4H40" fill="none" stroke="var(--dt-accent)" strokeDasharray="42" strokeDashoffset={0} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.2" style={armed ? { animation: 'dt-brand-logo-line-draw 420ms cubic-bezier(.2, .7, .2, 1) both' } : undefined} />
        <path className="dt-brand-logo-line" d="M4 16H18C24 16 25 20 31 20H40" fill="none" stroke="var(--dt-accent)" strokeDasharray="42" strokeDashoffset={0} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.2" style={armed ? { animation: 'dt-brand-logo-line-draw 420ms cubic-bezier(.2, .7, .2, 1) both' } : undefined} />
      </svg>
      <span>Bridger</span>
      <style>
        {'@keyframes dt-brand-logo-line-draw{from{opacity:.45;stroke-dashoffset:42}to{opacity:1;stroke-dashoffset:0}}@media (prefers-reduced-motion: reduce){.dt-brand-logo-line{animation:none!important}}'}
      </style>
    </span>
  );
});
