// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/forms/FileUpload.tsx
// Regenerate: pnpm generate

import { File, Upload, X } from 'lucide-react';
import { forwardRef, useId, useState } from 'react';
import { cx } from '../lib/cx.jsx';
import { Icon } from '../lib/icon.jsx';
import { useDSMessages } from '../locale/DSLocaleProvider.jsx';
function fmtSize(bytes) {
    if (bytes == null)
        return '';
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
/**
 * Dashed hairline dropzone for uploading an OpenAPI spec. Idle / drag / filled.
 * @startingPoint section="Forms" subtitle="Dropzone for an OpenAPI spec" viewport="460x180"
 */
export const FileUpload = forwardRef(function FileUpload({ label, accept = '.json,.yaml,.yml', hint, file, onFiles, onRemove, chooseFileLabel, dropHintLabel, uploadedLabel, removeLabel, id, className, style, ...rest }, ref) {
    const messages = useDSMessages();
    const [drag, setDrag] = useState(false);
    const autoId = useId();
    const fId = id ?? autoId;
    const handle = (files) => {
        if (files && files.length)
            onFiles?.(files);
    };
    return (<div className={cx('dt-file-upload', className)} style={style} {...rest}>
      {label ? <span className="dt-file-upload-label">{label}</span> : null}

      {file ? (<div className="dt-file-upload-file">
          <span className="dt-file-upload-file-icon">
            <Icon icon={File}/>
          </span>
          <div className="dt-file-upload-file-body">
            <div className="dt-file-upload-file-name">
              {file.name}
            </div>
            <div className="dt-file-upload-file-meta">
              {fmtSize(file.size)} · {uploadedLabel ?? messages.fileUpload.uploaded}
            </div>
          </div>
          <button type="button" onClick={onRemove} aria-label={removeLabel ?? messages.fileUpload.remove} className="dt-file-upload-remove">
            <Icon icon={X} size="sm"/>
          </button>
        </div>) : (<label htmlFor={fId} className="dt-file-upload-dropzone" data-dragging={drag ? '' : undefined} onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
            }} onDragLeave={() => setDrag(false)} onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                handle(e.dataTransfer.files);
            }}>
          <span className="dt-file-upload-dropicon">
            <Icon icon={Upload} size="lg"/>
          </span>
          <span className="dt-file-upload-cta">
            <span className="dt-file-upload-cta-strong">{chooseFileLabel ?? messages.fileUpload.chooseFile}</span> {dropHintLabel ?? messages.fileUpload.dropHint}
          </span>
          <span className="dt-file-upload-hint">{hint ?? messages.fileUpload.specHint}</span>
          <input ref={ref} id={fId} type="file" accept={accept} onChange={(e) => handle(e.target.files)} className="dt-file-upload-input"/>
        </label>)}
    </div>);
});
FileUpload.displayName = 'FileUpload';
