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
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'title'> {
    tone?: AlertTone;
    title?: ReactNode;
    children?: ReactNode;
    icon?: ReactNode;
    action?: ReactNode;
    onDismiss?: () => void;
    style?: CSSProperties;
}
export declare const Alert: import("react").ForwardRefExoticComponent<AlertProps & import("react").RefAttributes<HTMLDivElement>>;
