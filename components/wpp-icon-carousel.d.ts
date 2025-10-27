import type { Components, JSX } from "../dist/types/components";

interface WppIconCarousel extends Components.WppIconCarousel, HTMLElement {}
export const WppIconCarousel: {
  prototype: WppIconCarousel;
  new (): WppIconCarousel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
