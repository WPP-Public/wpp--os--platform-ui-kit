import type { Components, JSX } from "../dist/types/components";

interface WppChatThinking extends Components.WppChatThinking, HTMLElement {}
export const WppChatThinking: {
  prototype: WppChatThinking;
  new (): WppChatThinking;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
