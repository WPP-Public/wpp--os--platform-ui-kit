import type { Components, JSX } from "../dist/types/components";

interface WppSlider extends Components.WppSlider, HTMLElement {}
export const WppSlider: {
  prototype: WppSlider;
  new (): WppSlider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
