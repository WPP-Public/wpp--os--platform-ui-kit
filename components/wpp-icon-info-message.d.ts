import type { Components, JSX } from "../dist/types/components";

interface WppIconInfoMessage extends Components.WppIconInfoMessage, HTMLElement {}
export const WppIconInfoMessage: {
  prototype: WppIconInfoMessage;
  new (): WppIconInfoMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
