import type { Components, JSX } from "../dist/types/components";

interface WppIconUserBlock extends Components.WppIconUserBlock, HTMLElement {}
export const WppIconUserBlock: {
  prototype: WppIconUserBlock;
  new (): WppIconUserBlock;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
