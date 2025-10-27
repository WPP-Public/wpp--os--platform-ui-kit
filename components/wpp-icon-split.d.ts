import type { Components, JSX } from "../dist/types/components";

interface WppIconSplit extends Components.WppIconSplit, HTMLElement {}
export const WppIconSplit: {
  prototype: WppIconSplit;
  new (): WppIconSplit;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
