import type { Components, JSX } from "../dist/types/components";

interface WppLegacyTopbarItem extends Components.WppLegacyTopbarItem, HTMLElement {}
export const WppLegacyTopbarItem: {
  prototype: WppLegacyTopbarItem;
  new (): WppLegacyTopbarItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
