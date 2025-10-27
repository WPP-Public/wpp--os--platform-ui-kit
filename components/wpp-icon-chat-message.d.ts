import type { Components, JSX } from "../dist/types/components";

interface WppIconChatMessage extends Components.WppIconChatMessage, HTMLElement {}
export const WppIconChatMessage: {
  prototype: WppIconChatMessage;
  new (): WppIconChatMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
