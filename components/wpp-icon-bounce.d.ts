import type { Components, JSX } from "../dist/types/components";

interface WppIconBounce extends Components.WppIconBounce, HTMLElement {}
export const WppIconBounce: {
  prototype: WppIconBounce;
  new (): WppIconBounce;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
