import type { Components, JSX } from "../dist/types/components";

interface WppIconLeaf extends Components.WppIconLeaf, HTMLElement {}
export const WppIconLeaf: {
  prototype: WppIconLeaf;
  new (): WppIconLeaf;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
