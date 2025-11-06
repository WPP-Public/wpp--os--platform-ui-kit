import type { Components, JSX } from "../dist/types/components";

interface WppMenuList extends Components.WppMenuList, HTMLElement {}
export const WppMenuList: {
  prototype: WppMenuList;
  new (): WppMenuList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
