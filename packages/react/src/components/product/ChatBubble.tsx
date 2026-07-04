import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  role: 'user' | 'assistant';
  children?: ReactNode;
}

export function ChatBubble({ role, children, className, ...rest }: ChatBubbleProps) {
  return (
    <div className={cx('dt-chat-message', `dt-chat-message-${role}`, className)} {...rest}>
      {children}
    </div>
  );
}
