import type { Components, JSX } from "../dist/types/components";

interface WppCounter extends Components.WppCounter, HTMLElement {}
export const WppCounter: {
  prototype: WppCounter;
  new (): WppCounter;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
