import type { Components, JSX } from "../dist/types/components";

interface WppMenuGroup extends Components.WppMenuGroup, HTMLElement {}
export const WppMenuGroup: {
  prototype: WppMenuGroup;
  new (): WppMenuGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
