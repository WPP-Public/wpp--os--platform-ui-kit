import type { Components, JSX } from "../dist/types/components";

interface WppOpacitySlider extends Components.WppOpacitySlider, HTMLElement {}
export const WppOpacitySlider: {
  prototype: WppOpacitySlider;
  new (): WppOpacitySlider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
