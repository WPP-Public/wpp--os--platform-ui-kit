import type { Components, JSX } from "../dist/types/components";

interface WppIconRectangle extends Components.WppIconRectangle, HTMLElement {}
export const WppIconRectangle: {
  prototype: WppIconRectangle;
  new (): WppIconRectangle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
