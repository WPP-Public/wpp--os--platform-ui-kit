import type { Components, JSX } from "../dist/types/components";

interface WppTag extends Components.WppTag, HTMLElement {}
export const WppTag: {
  prototype: WppTag;
  new (): WppTag;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
