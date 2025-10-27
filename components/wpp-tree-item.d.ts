import type { Components, JSX } from "../dist/types/components";

interface WppTreeItem extends Components.WppTreeItem, HTMLElement {}
export const WppTreeItem: {
  prototype: WppTreeItem;
  new (): WppTreeItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
