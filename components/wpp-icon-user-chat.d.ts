import type { Components, JSX } from "../dist/types/components";

interface WppIconUserChat extends Components.WppIconUserChat, HTMLElement {}
export const WppIconUserChat: {
  prototype: WppIconUserChat;
  new (): WppIconUserChat;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
