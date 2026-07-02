import type { Components, JSX } from "../dist/types/components";

interface WppChatReference extends Components.WppChatReference, HTMLElement {}
export const WppChatReference: {
  prototype: WppChatReference;
  new (): WppChatReference;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
