import type { Components, JSX } from "../dist/types/components";

interface WppListItem extends Components.WppListItem, HTMLElement {}
export const WppListItem: {
  prototype: WppListItem;
  new (): WppListItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
