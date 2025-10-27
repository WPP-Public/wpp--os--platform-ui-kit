import type { Components, JSX } from "../dist/types/components";

interface WppIconCrop extends Components.WppIconCrop, HTMLElement {}
export const WppIconCrop: {
  prototype: WppIconCrop;
  new (): WppIconCrop;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
