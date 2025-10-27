import type { Components, JSX } from "../dist/types/components";

interface WppIconHandDraw extends Components.WppIconHandDraw, HTMLElement {}
export const WppIconHandDraw: {
  prototype: WppIconHandDraw;
  new (): WppIconHandDraw;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
