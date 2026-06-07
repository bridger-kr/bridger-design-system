import * as React from 'react';

export interface UploadedFile { name: string; size?: number; }
export interface FileUploadProps {
  label?: string;
  /** Accepted file types, passed to the native input. */
  accept?: string;
  hint?: string;
  /** Current file — when set, the filled state renders instead of the dropzone. */
  file?: UploadedFile | null;
  onFiles?: (files: FileList) => void;
  onRemove?: () => void;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Dashed hairline dropzone for uploading an OpenAPI spec. Idle / drag / filled.
 * @startingPoint section="Forms" subtitle="Dropzone for an OpenAPI spec" viewport="460x180"
 */
export function FileUpload(props: FileUploadProps): React.JSX.Element;
