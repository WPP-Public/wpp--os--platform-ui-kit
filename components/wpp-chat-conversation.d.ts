import type { Components, JSX } from "../dist/types/components";

interface WppChatConversation extends Components.WppChatConversation, HTMLElement {}
export const WppChatConversation: {
  prototype: WppChatConversation;
  new (): WppChatConversation;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
