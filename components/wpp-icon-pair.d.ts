import type { Components, JSX } from "../dist/types/components";

interface WppIconPair extends Components.WppIconPair, HTMLElement {}
export const WppIconPair: {
  prototype: WppIconPair;
  new (): WppIconPair;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
