import type { Components, JSX } from "../dist/types/components";

interface WppIconImage extends Components.WppIconImage, HTMLElement {}
export const WppIconImage: {
  prototype: WppIconImage;
  new (): WppIconImage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
