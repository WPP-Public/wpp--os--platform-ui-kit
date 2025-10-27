import type { Components, JSX } from "../dist/types/components";

interface WppIconPinned extends Components.WppIconPinned, HTMLElement {}
export const WppIconPinned: {
  prototype: WppIconPinned;
  new (): WppIconPinned;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
