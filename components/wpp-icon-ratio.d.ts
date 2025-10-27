import type { Components, JSX } from "../dist/types/components";

interface WppIconRatio extends Components.WppIconRatio, HTMLElement {}
export const WppIconRatio: {
  prototype: WppIconRatio;
  new (): WppIconRatio;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
