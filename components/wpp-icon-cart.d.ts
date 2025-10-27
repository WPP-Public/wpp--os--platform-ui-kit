import type { Components, JSX } from "../dist/types/components";

interface WppIconCart extends Components.WppIconCart, HTMLElement {}
export const WppIconCart: {
  prototype: WppIconCart;
  new (): WppIconCart;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
