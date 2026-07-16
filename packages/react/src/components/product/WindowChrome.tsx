import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface WindowChromeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  url?: ReactNode;
  trailing?: ReactNode;
}

export interface WindowFrameProps extends HTMLAttributes<HTMLDivElement> {
  chrome?: ReactNode;
  children?: ReactNode;
}

export function WindowChrome({ title, url, trailing, className, ...rest }: WindowChromeProps) {
  return (
    <div className={cx('dt-window-chrome', className)} {...rest}>
      <span className="dt-window-chrome-dots" aria-hidden="true">
        <span className="dt-window-chrome-dot dt-window-chrome-dot-1" />
        <span className="dt-window-chrome-dot dt-window-chrome-dot-2" />
        <span className="dt-window-chrome-dot dt-window-chrome-dot-3" />
      </span>
      {title || url ? (
        <span className="dt-window-chrome-title">
          {title ? <strong>{title}</strong> : null}
          {url ? <span>{url}</span> : null}
        </span>
      ) : null}
      {trailing ? <span className="dt-window-chrome-trailing">{trailing}</span> : null}
    </div>
  );
}

export function WindowFrame({ chrome, children, className, ...rest }: WindowFrameProps) {
  return (
    <div className={cx('dt-window-frame', className)} {...rest}>
      {chrome ?? <WindowChrome />}
      <div className="dt-window-frame-body">{children}</div>
    </div>
  );
}
