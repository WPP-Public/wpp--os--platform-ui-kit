import type { Components, JSX } from "../dist/types/components";

interface WppTopbarItem extends Components.WppTopbarItem, HTMLElement {}
export const WppTopbarItem: {
  prototype: WppTopbarItem;
  new (): WppTopbarItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
