import type { Components, JSX } from "../dist/types/components";

interface WppIconTriangle extends Components.WppIconTriangle, HTMLElement {}
export const WppIconTriangle: {
  prototype: WppIconTriangle;
  new (): WppIconTriangle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
