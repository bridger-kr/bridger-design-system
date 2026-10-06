import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/cx';

export interface ChatBubbleProps extends HTMLAttributes<HTMLDivElement> {
  role: 'user' | 'assistant';
  children?: ReactNode;
}

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(function ChatBubble(
  { role, children, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('dt-chat-message', `dt-chat-message-${role}`, className)} {...rest}>
      {children}
    </div>
  );
});
ChatBubble.displayName = 'ChatBubble';
