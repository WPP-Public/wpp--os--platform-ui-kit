import type { Components, JSX } from "../dist/types/components";

interface WppIconColor extends Components.WppIconColor, HTMLElement {}
export const WppIconColor: {
  prototype: WppIconColor;
  new (): WppIconColor;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
