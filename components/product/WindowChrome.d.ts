// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/WindowChrome.tsx
// Regenerate: pnpm generate

import type { HTMLAttributes, ReactNode } from 'react';
export interface WindowChromeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: ReactNode;
    url?: ReactNode;
    trailing?: ReactNode;
}
export interface WindowFrameProps extends HTMLAttributes<HTMLDivElement> {
    chrome?: ReactNode;
    children?: ReactNode;
}
export declare function WindowChrome({ title, url, trailing, className, ...rest }: WindowChromeProps): import("react").JSX.Element;
export declare function WindowFrame({ chrome, children, className, ...rest }: WindowFrameProps): import("react").JSX.Element;
