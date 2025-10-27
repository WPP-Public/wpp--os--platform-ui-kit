import type { Components, JSX } from "../dist/types/components";

interface WppChatInput extends Components.WppChatInput, HTMLElement {}
export const WppChatInput: {
  prototype: WppChatInput;
  new (): WppChatInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
