import type { Components, JSX } from "../dist/types/components";

interface WppIconRise extends Components.WppIconRise, HTMLElement {}
export const WppIconRise: {
  prototype: WppIconRise;
  new (): WppIconRise;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
