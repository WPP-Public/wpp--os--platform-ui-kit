import type { Components, JSX } from "../dist/types/components";

interface WppTabs extends Components.WppTabs, HTMLElement {}
export const WppTabs: {
  prototype: WppTabs;
  new (): WppTabs;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
