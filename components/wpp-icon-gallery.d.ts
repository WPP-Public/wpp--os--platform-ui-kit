import type { Components, JSX } from "../dist/types/components";

interface WppIconGallery extends Components.WppIconGallery, HTMLElement {}
export const WppIconGallery: {
  prototype: WppIconGallery;
  new (): WppIconGallery;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
