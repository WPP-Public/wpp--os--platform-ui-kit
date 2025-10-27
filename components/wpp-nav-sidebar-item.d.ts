import type { Components, JSX } from "../dist/types/components";

interface WppNavSidebarItem extends Components.WppNavSidebarItem, HTMLElement {}
export const WppNavSidebarItem: {
  prototype: WppNavSidebarItem;
  new (): WppNavSidebarItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
