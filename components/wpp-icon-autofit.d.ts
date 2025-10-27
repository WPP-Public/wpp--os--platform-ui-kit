import type { Components, JSX } from "../dist/types/components";

interface WppIconAutofit extends Components.WppIconAutofit, HTMLElement {}
export const WppIconAutofit: {
  prototype: WppIconAutofit;
  new (): WppIconAutofit;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
