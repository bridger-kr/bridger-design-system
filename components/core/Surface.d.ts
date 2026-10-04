// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/core/Surface.tsx
// Regenerate: pnpm generate

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
export declare const SurfaceTone: {
    readonly Default: "default";
    readonly Raised: "raised";
    readonly Sunken: "sunken";
};
export type SurfaceTone = (typeof SurfaceTone)[keyof typeof SurfaceTone];
export declare const MetricAccent: {
    readonly Accent: "accent";
    readonly Success: "success";
    readonly Info: "info";
};
export type MetricAccent = (typeof MetricAccent)[keyof typeof MetricAccent];
export type MetricAccentName = MetricAccent;
export type PanelProps = ComponentPropsWithoutRef<'section'> & {
    readonly tone?: SurfaceTone;
    readonly children: ReactNode;
};
export declare function Panel({ tone, className, children, ...props }: PanelProps): import("react").JSX.Element;
export declare function metricAccentColor(accent: MetricAccentName): string;
