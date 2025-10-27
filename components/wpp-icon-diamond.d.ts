import type { Components, JSX } from "../dist/types/components";

interface WppIconDiamond extends Components.WppIconDiamond, HTMLElement {}
export const WppIconDiamond: {
  prototype: WppIconDiamond;
  new (): WppIconDiamond;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
