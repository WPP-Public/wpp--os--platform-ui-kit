import type { Components, JSX } from "../dist/types/components";

interface WppChatNode extends Components.WppChatNode, HTMLElement {}
export const WppChatNode: {
  prototype: WppChatNode;
  new (): WppChatNode;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
