import type { Components, JSX } from "../dist/types/components";

interface WppIconHd extends Components.WppIconHd, HTMLElement {}
export const WppIconHd: {
  prototype: WppIconHd;
  new (): WppIconHd;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
