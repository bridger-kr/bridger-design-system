// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ChatBubble.tsx
// Regenerate: pnpm generate

import { forwardRef } from 'react';
import { cx } from '../lib/cx.jsx';
export const ChatBubble = forwardRef(function ChatBubble({ role, children, className, ...rest }, ref) {
    return (<div ref={ref} className={cx('dt-chat-message', `dt-chat-message-${role}`, className)} {...rest}>
      {children}
    </div>);
});
ChatBubble.displayName = 'ChatBubble';
