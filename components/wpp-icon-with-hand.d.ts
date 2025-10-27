import type { Components, JSX } from "../dist/types/components";

interface WppIconWithHand extends Components.WppIconWithHand, HTMLElement {}
export const WppIconWithHand: {
  prototype: WppIconWithHand;
  new (): WppIconWithHand;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
