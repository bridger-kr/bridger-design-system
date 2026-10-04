// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/product/ChatBubble.tsx
// Regenerate: pnpm generate

import { cx } from '../lib/cx.jsx';
export function ChatBubble({ role, children, className, ...rest }) {
    return (<div className={cx('dt-chat-message', `dt-chat-message-${role}`, className)} {...rest}>
      {children}
    </div>);
}
