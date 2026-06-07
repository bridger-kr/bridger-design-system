import * as React from 'react';

export interface BrandLogoProps {
  /** Named size or explicit px. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Show the persimmon period (the brand detail). */
  period?: boolean;
  lang?: 'ko' | 'en';
  style?: React.CSSProperties;
}

/** The Bridger wordmark — mark-only, with a persimmon period. */
export function BrandLogo(props: BrandLogoProps): React.JSX.Element;
