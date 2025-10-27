import type { Components, JSX } from "../dist/types/components";

interface WppTimePicker extends Components.WppTimePicker, HTMLElement {}
export const WppTimePicker: {
  prototype: WppTimePicker;
  new (): WppTimePicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
