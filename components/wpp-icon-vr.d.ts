import type { Components, JSX } from "../dist/types/components";

interface WppIconVr extends Components.WppIconVr, HTMLElement {}
export const WppIconVr: {
  prototype: WppIconVr;
  new (): WppIconVr;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
