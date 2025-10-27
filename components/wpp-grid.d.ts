import type { Components, JSX } from "../dist/types/components";

interface WppGrid extends Components.WppGrid, HTMLElement {}
export const WppGrid: {
  prototype: WppGrid;
  new (): WppGrid;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
