import * as React from 'react';

export interface BrandLogoHandle {
  readonly play: () => void;
}

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'symbol' | 'favicon' | number;
  autoplay?: boolean;
  loop?: boolean;
  lang?: 'ko' | 'en';
  style?: React.CSSProperties;
}

export const BrandLogo: React.ForwardRefExoticComponent<BrandLogoProps & React.RefAttributes<BrandLogoHandle>>;
