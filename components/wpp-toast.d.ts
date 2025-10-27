import type { Components, JSX } from "../dist/types/components";

interface WppToast extends Components.WppToast, HTMLElement {}
export const WppToast: {
  prototype: WppToast;
  new (): WppToast;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
