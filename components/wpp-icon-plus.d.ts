import type { Components, JSX } from "../dist/types/components";

interface WppIconPlus extends Components.WppIconPlus, HTMLElement {}
export const WppIconPlus: {
  prototype: WppIconPlus;
  new (): WppIconPlus;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
