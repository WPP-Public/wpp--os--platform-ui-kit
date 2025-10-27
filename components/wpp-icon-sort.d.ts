import type { Components, JSX } from "../dist/types/components";

interface WppIconSort extends Components.WppIconSort, HTMLElement {}
export const WppIconSort: {
  prototype: WppIconSort;
  new (): WppIconSort;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
