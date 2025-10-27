import type { Components, JSX } from "../dist/types/components";

interface WppTree extends Components.WppTree, HTMLElement {}
export const WppTree: {
  prototype: WppTree;
  new (): WppTree;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
