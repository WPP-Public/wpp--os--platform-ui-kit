import type { Components, JSX } from "../dist/types/components";

interface WppIconCopy extends Components.WppIconCopy, HTMLElement {}
export const WppIconCopy: {
  prototype: WppIconCopy;
  new (): WppIconCopy;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
