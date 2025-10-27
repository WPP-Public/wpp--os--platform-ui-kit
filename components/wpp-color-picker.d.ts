import type { Components, JSX } from "../dist/types/components";

interface WppColorPicker extends Components.WppColorPicker, HTMLElement {}
export const WppColorPicker: {
  prototype: WppColorPicker;
  new (): WppColorPicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
