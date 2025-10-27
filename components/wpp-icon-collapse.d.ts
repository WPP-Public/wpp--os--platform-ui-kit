import type { Components, JSX } from "../dist/types/components";

interface WppIconCollapse extends Components.WppIconCollapse, HTMLElement {}
export const WppIconCollapse: {
  prototype: WppIconCollapse;
  new (): WppIconCollapse;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
