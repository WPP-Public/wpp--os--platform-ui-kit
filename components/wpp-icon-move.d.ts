import type { Components, JSX } from "../dist/types/components";

interface WppIconMove extends Components.WppIconMove, HTMLElement {}
export const WppIconMove: {
  prototype: WppIconMove;
  new (): WppIconMove;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
