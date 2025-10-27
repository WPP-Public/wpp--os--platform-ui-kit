import type { Components, JSX } from "../dist/types/components";

interface WppIconArrow extends Components.WppIconArrow, HTMLElement {}
export const WppIconArrow: {
  prototype: WppIconArrow;
  new (): WppIconArrow;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
