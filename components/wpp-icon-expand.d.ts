import type { Components, JSX } from "../dist/types/components";

interface WppIconExpand extends Components.WppIconExpand, HTMLElement {}
export const WppIconExpand: {
  prototype: WppIconExpand;
  new (): WppIconExpand;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
