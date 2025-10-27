import type { Components, JSX } from "../dist/types/components";

interface WppIconParking extends Components.WppIconParking, HTMLElement {}
export const WppIconParking: {
  prototype: WppIconParking;
  new (): WppIconParking;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
