import type { Components, JSX } from "../dist/types/components";

interface WppIconPhone extends Components.WppIconPhone, HTMLElement {}
export const WppIconPhone: {
  prototype: WppIconPhone;
  new (): WppIconPhone;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
