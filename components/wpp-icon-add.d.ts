import type { Components, JSX } from "../dist/types/components";

interface WppIconAdd extends Components.WppIconAdd, HTMLElement {}
export const WppIconAdd: {
  prototype: WppIconAdd;
  new (): WppIconAdd;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
