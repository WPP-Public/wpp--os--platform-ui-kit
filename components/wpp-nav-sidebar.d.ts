import type { Components, JSX } from "../dist/types/components";

interface WppNavSidebar extends Components.WppNavSidebar, HTMLElement {}
export const WppNavSidebar: {
  prototype: WppNavSidebar;
  new (): WppNavSidebar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
