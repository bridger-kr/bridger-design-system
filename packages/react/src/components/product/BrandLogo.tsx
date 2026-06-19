import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
} from 'react';

export const BRAND_LOGO_LANGUAGE = {
  Korean: 'ko',
  English: 'en',
} as const;

export const BRAND_LOGO_SIZE_NAME = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  ExtraLarge: 'xl',
  Symbol: 'symbol',
  Favicon: 'favicon',
} as const;

const BRAND_LOGO_SIZE = {
  [BRAND_LOGO_SIZE_NAME.Small]: 20,
  [BRAND_LOGO_SIZE_NAME.Medium]: 28,
  [BRAND_LOGO_SIZE_NAME.Large]: 56,
  [BRAND_LOGO_SIZE_NAME.ExtraLarge]: 76,
  [BRAND_LOGO_SIZE_NAME.Symbol]: 20,
  [BRAND_LOGO_SIZE_NAME.Favicon]: 45,
} as const;

const BRAND_WORDMARK = 'Bridger';
const BRAND_WORDMARK_PERIOD = '.';

const BRAND_LOGO_LABEL: Record<BrandLogoLanguage, string> = {
  [BRAND_LOGO_LANGUAGE.Korean]: '브릿저',
  [BRAND_LOGO_LANGUAGE.English]: `${BRAND_WORDMARK}${BRAND_WORDMARK_PERIOD}`,
};

export type BrandLogoLanguage = (typeof BRAND_LOGO_LANGUAGE)[keyof typeof BRAND_LOGO_LANGUAGE];
export type BrandLogoSize = keyof typeof BRAND_LOGO_SIZE;

export interface BrandLogoHandle {
  readonly play: () => void;
}

export interface BrandLogoProps {
  size?: BrandLogoSize | number;
  autoplay?: boolean;
  loop?: boolean;
  lang?: BrandLogoLanguage;
  style?: CSSProperties;
}

function playMark(setArmed: Dispatch<SetStateAction<boolean>>) {
  const scheduleFrame = typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame
    : (callback: FrameRequestCallback) => setTimeout(callback, 0);
  setArmed(false);
  scheduleFrame(() =>
    scheduleFrame(() => setArmed(true)),
  );
}

function renderBrandSymbol({ isFavicon }: { readonly isFavicon: boolean }) {
  if (isFavicon) {
    return (
      <>
        <rect width="45" height="45" fill="var(--dt-accent)" />
        <path
          d="M35 18.31V11C29.5756 11 24.8659 12.6995 22.5 15.1925C20.1341 12.6995 15.4244 11 10 11V18.31C15.4244 18.31 20.1341 20.007 22.5 22.5C20.1341 24.993 15.4244 26.69 10 26.69V34C15.4244 34 20.1341 32.3005 22.5 29.8075C24.8659 32.3005 29.5756 34 35 34V26.69C29.5756 26.69 24.8659 24.993 22.5 22.5C24.8659 20.007 29.5756 18.31 35 18.31Z"
          fill="var(--dt-paper)"
        />
      </>
    );
  }

  return (
    <path
      d="M15 4.44959V0C11.7454 0 8.91951 1.0345 7.5 2.55197C6.08049 1.0345 3.25463 0 0 0V4.44959C3.25463 4.44959 6.08049 5.48253 7.5 7C6.08049 8.51747 3.25463 9.55041 0 9.55041V14C3.25463 14 6.08049 12.9655 7.5 11.448C8.91951 12.9655 11.7454 14 15 14V9.55041C11.7454 9.55041 8.91951 8.51747 7.5 7C8.91951 5.48253 11.7454 4.44959 15 4.44959Z"
      fill="currentColor"
    />
  );
}

export const BrandLogo = forwardRef<BrandLogoHandle, BrandLogoProps>(function BrandLogo(
  {
    size = BRAND_LOGO_SIZE_NAME.Medium,
    autoplay = false,
    loop = false,
    lang = BRAND_LOGO_LANGUAGE.Korean,
    style,
  },
  ref,
) {
  const fontSize = typeof size === 'number' ? size : (BRAND_LOGO_SIZE[size] ?? BRAND_LOGO_SIZE.md);
  const isSymbol = size === BRAND_LOGO_SIZE_NAME.Symbol;
  const isFavicon = size === BRAND_LOGO_SIZE_NAME.Favicon;
  const [armed, setArmed] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      play() {
        playMark(setArmed);
      },
    }),
    [],
  );

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

  if (isSymbol || isFavicon) {
    const symbolSize = isFavicon ? BRAND_LOGO_SIZE.favicon : fontSize;

    return (
      <span
        aria-label={BRAND_LOGO_LABEL[lang]}
        style={{
          display: 'inline-flex',
          width: symbolSize,
          height: symbolSize,
          color: 'var(--dt-accent)',
          userSelect: 'none',
          ...style,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={isFavicon ? '0 0 45 45' : '0 0 15 14'}
          aria-hidden="true"
          focusable="false"
          style={{ display: 'block' }}
        >
          {renderBrandSymbol({ isFavicon })}
        </svg>
      </span>
    );
  }

  return (
    <span
      aria-label={BRAND_LOGO_LABEL[lang]}
      className="dt-brand-logo"
      data-armed={armed ? 'true' : 'false'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--dt-font-sans)',
        fontWeight: 780,
        fontSize,
        letterSpacing: 0,
        lineHeight: 1,
        color: 'var(--dt-accent)',
        userSelect: 'none',
        ...style,
      }}
    >
      <span className="dt-brand-logo-wordmark">
        {BRAND_WORDMARK}
        <span className="dt-brand-logo-dot">{BRAND_WORDMARK_PERIOD}</span>
      </span>
    </span>
  );
});
