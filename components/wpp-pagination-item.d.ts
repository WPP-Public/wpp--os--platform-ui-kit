import type { Components, JSX } from "../dist/types/components";

interface WppPaginationItem extends Components.WppPaginationItem, HTMLElement {}
export const WppPaginationItem: {
  prototype: WppPaginationItem;
  new (): WppPaginationItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
