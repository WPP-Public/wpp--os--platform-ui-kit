import type { Components, JSX } from "../dist/types/components";

interface WppIconRadio extends Components.WppIconRadio, HTMLElement {}
export const WppIconRadio: {
  prototype: WppIconRadio;
  new (): WppIconRadio;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
