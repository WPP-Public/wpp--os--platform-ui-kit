import type { Components, JSX } from "../dist/types/components";

interface WppIconSquare extends Components.WppIconSquare, HTMLElement {}
export const WppIconSquare: {
  prototype: WppIconSquare;
  new (): WppIconSquare;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
