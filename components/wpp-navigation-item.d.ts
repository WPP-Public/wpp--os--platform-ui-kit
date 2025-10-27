import type { Components, JSX } from "../dist/types/components";

interface WppNavigationItem extends Components.WppNavigationItem, HTMLElement {}
export const WppNavigationItem: {
  prototype: WppNavigationItem;
  new (): WppNavigationItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
