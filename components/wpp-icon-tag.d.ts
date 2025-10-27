import type { Components, JSX } from "../dist/types/components";

interface WppIconTag extends Components.WppIconTag, HTMLElement {}
export const WppIconTag: {
  prototype: WppIconTag;
  new (): WppIconTag;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
