import type { Components, JSX } from "../dist/types/components";

interface WppHueSlider extends Components.WppHueSlider, HTMLElement {}
export const WppHueSlider: {
  prototype: WppHueSlider;
  new (): WppHueSlider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
