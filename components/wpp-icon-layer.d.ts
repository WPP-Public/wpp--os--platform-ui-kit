import type { Components, JSX } from "../dist/types/components";

interface WppIconLayer extends Components.WppIconLayer, HTMLElement {}
export const WppIconLayer: {
  prototype: WppIconLayer;
  new (): WppIconLayer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
