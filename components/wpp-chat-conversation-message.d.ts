import type { Components, JSX } from "../dist/types/components";

interface WppChatConversationMessage extends Components.WppChatConversationMessage, HTMLElement {}
export const WppChatConversationMessage: {
  prototype: WppChatConversationMessage;
  new (): WppChatConversationMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
