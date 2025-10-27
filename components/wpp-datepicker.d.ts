import type { Components, JSX } from "../dist/types/components";

interface WppDatepicker extends Components.WppDatepicker, HTMLElement {}
export const WppDatepicker: {
  prototype: WppDatepicker;
  new (): WppDatepicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
