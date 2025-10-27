import type { Components, JSX } from "../dist/types/components";

interface WppIconNumber extends Components.WppIconNumber, HTMLElement {}
export const WppIconNumber: {
  prototype: WppIconNumber;
  new (): WppIconNumber;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
