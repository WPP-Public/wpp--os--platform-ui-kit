import type { Components, JSX } from "../dist/types/components";

interface WppBasicNode extends Components.WppBasicNode, HTMLElement {}
export const WppBasicNode: {
  prototype: WppBasicNode;
  new (): WppBasicNode;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
