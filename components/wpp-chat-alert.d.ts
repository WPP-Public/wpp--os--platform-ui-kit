import type { Components, JSX } from "../dist/types/components";

interface WppChatAlert extends Components.WppChatAlert, HTMLElement {}
export const WppChatAlert: {
  prototype: WppChatAlert;
  new (): WppChatAlert;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
