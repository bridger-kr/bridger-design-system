// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/feedback/Alert.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
export declare const AlertTone: {
    readonly Info: "info";
    readonly Success: "success";
    readonly Warning: "warning";
    readonly Danger: "danger";
};
export type AlertTone = (typeof AlertTone)[keyof typeof AlertTone];
export declare const AlertMotion: {
    readonly None: "none";
    readonly Subtle: "subtle";
    readonly Pulse: "pulse";
};
export type AlertMotion = (typeof AlertMotion)[keyof typeof AlertMotion];
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'title'> {
    tone?: AlertTone;
    title?: ReactNode;
    children?: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
    motion?: AlertMotion;
    onDismiss?: () => void;
    style?: CSSProperties;
}
export declare function Alert({ tone, title, children, icon, action, motion, onDismiss, className, style, ...rest }: AlertProps): import("react").JSX.Element;
