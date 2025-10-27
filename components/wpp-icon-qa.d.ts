import type { Components, JSX } from "../dist/types/components";

interface WppIconQa extends Components.WppIconQa, HTMLElement {}
export const WppIconQa: {
  prototype: WppIconQa;
  new (): WppIconQa;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
