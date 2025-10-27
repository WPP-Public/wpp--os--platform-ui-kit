import type { Components, JSX } from "../dist/types/components";

interface WppIconGrid extends Components.WppIconGrid, HTMLElement {}
export const WppIconGrid: {
  prototype: WppIconGrid;
  new (): WppIconGrid;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
