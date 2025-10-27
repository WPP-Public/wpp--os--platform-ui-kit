import type { Components, JSX } from "../dist/types/components";

interface WppIconGear extends Components.WppIconGear, HTMLElement {}
export const WppIconGear: {
  prototype: WppIconGear;
  new (): WppIconGear;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
