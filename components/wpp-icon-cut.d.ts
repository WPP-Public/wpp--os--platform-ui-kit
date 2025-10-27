import type { Components, JSX } from "../dist/types/components";

interface WppIconCut extends Components.WppIconCut, HTMLElement {}
export const WppIconCut: {
  prototype: WppIconCut;
  new (): WppIconCut;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
