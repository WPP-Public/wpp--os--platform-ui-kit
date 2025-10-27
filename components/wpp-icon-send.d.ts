import type { Components, JSX } from "../dist/types/components";

interface WppIconSend extends Components.WppIconSend, HTMLElement {}
export const WppIconSend: {
  prototype: WppIconSend;
  new (): WppIconSend;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
