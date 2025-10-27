import type { Components, JSX } from "../dist/types/components";

interface WppIconCafe extends Components.WppIconCafe, HTMLElement {}
export const WppIconCafe: {
  prototype: WppIconCafe;
  new (): WppIconCafe;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
