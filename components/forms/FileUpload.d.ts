// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/FileUpload.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes } from 'react';
export interface UploadedFile {
    name: string;
    size?: number;
}
export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'style'> {
    label?: string;
    /** Accepted file types, passed to the native input. */
    accept?: string;
    hint?: string;
    /** Current file — when set, the filled state renders instead of the dropzone. */
    file?: UploadedFile | null;
    onFiles?: (files: FileList) => void;
    onRemove?: () => void;
    id?: string;
    style?: CSSProperties;
}
/**
 * Dashed hairline dropzone for uploading an OpenAPI spec. Idle / drag / filled.
 * @startingPoint section="Forms" subtitle="Dropzone for an OpenAPI spec" viewport="460x180"
 */
export declare function FileUpload({ label, accept, hint, file, onFiles, onRemove, id, style, }: FileUploadProps): import("react").JSX.Element;
