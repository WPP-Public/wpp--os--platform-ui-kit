import type { Components, JSX } from "../dist/types/components";

interface WppIconEraser extends Components.WppIconEraser, HTMLElement {}
export const WppIconEraser: {
  prototype: WppIconEraser;
  new (): WppIconEraser;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
