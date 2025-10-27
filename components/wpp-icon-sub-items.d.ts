import type { Components, JSX } from "../dist/types/components";

interface WppIconSubItems extends Components.WppIconSubItems, HTMLElement {}
export const WppIconSubItems: {
  prototype: WppIconSubItems;
  new (): WppIconSubItems;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
