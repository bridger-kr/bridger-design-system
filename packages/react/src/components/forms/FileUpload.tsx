import { File, Upload, X } from 'lucide-react';
import { forwardRef, useId, useRef, useState } from 'react';
import type { CSSProperties, DragEvent, HTMLAttributes } from 'react';
import { Icon } from '../../lib/icon';
import { useDSMessages } from '../../locale/DSLocaleProvider';

function fmtSize(bytes?: number) {
  if (bytes == null) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export interface UploadedFile {
  name: string;
  size?: number;
}

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id' | 'onChange' | 'style'> {
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
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  {
    label,
    accept = '.json,.yaml,.yml',
    hint,
    file,
    onFiles,
    onRemove,
    id,
    className,
    style,
    ...rest
  },
  ref,
) {
  const messages = useDSMessages();
  const [drag, setDrag] = useState(false);
  const autoId = useId();
  const fId = id ?? autoId;

  const handle = (files: FileList | null) => {
    if (files && files.length) onFiles?.(files);
  };

  return (
    <div className={className} style={{ display: 'grid', gap: 7, ...style }} {...rest}>
      {label ? <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--dt-text-subtle)' }}>{label}</span> : null}

      {file ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            background: 'var(--dt-surface)',
            border: '1px solid var(--dt-border-strong)',
            borderRadius: 'var(--dt-radius-card)',
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              flex: '0 0 auto',
              display: 'grid',
              placeItems: 'center',
              borderRadius: 'var(--dt-radius-control)',
              background: 'var(--dt-tint-accent)',
              color: 'var(--dt-accent-text)',
            }}
          >
            <Icon icon={File} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--dt-font-mono)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--dt-text-strong)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {file.name}
            </div>
            <div style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-text-muted)', marginTop: 2 }}>
              {fmtSize(file.size)} · {messages.fileUpload.uploaded}
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={messages.fileUpload.remove}
            className="dt-file-upload-remove"
            style={{
              flex: '0 0 auto',
              display: 'grid',
              placeItems: 'center',
              border: 'none',
              background: 'var(--dt-surface-sunken)',
              borderRadius: 'var(--dt-radius-chip)',
              color: 'var(--dt-text-subtle)',
              cursor: 'pointer',
            }}
          >
            <Icon icon={X} size="sm" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={fId}
          className="dt-file-upload-dropzone"
          data-dragging={drag ? '' : undefined}
          onDragOver={(e: DragEvent<HTMLLabelElement>) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e: DragEvent<HTMLLabelElement>) => {
            e.preventDefault();
            setDrag(false);
            handle(e.dataTransfer.files);
          }}
        >
          <span style={{ color: drag ? 'var(--dt-accent)' : 'var(--dt-text-muted)' }}>
            <Icon icon={Upload} size="lg" />
          </span>
          <span style={{ fontSize: 13.5, color: 'var(--dt-text-strong)' }}>
            <span style={{ fontWeight: 600, color: 'var(--dt-accent-text)' }}>{messages.fileUpload.chooseFile}</span> {messages.fileUpload.dropHint}
          </span>
          <span style={{ fontFamily: 'var(--dt-font-mono)', fontSize: 11, color: 'var(--dt-text-muted)' }}>{hint ?? messages.fileUpload.specHint}</span>
          <input
            ref={ref}
            id={fId}
            type="file"
            accept={accept}
            onChange={(e) => handle(e.target.files)}
            style={{ display: 'none' }}
          />
        </label>
      )}
    </div>
  );
});
FileUpload.displayName = 'FileUpload';
