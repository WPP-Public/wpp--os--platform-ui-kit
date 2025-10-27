import type { Components, JSX } from "../dist/types/components";

interface WppIconCircle extends Components.WppIconCircle, HTMLElement {}
export const WppIconCircle: {
  prototype: WppIconCircle;
  new (): WppIconCircle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
