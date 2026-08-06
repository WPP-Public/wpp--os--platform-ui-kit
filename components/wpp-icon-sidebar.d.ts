import type { Components, JSX } from "../dist/types/components";

interface WppIconSidebar extends Components.WppIconSidebar, HTMLElement {}
export const WppIconSidebar: {
  prototype: WppIconSidebar;
  new (): WppIconSidebar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
