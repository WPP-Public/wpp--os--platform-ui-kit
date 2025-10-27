import type { Components, JSX } from "../dist/types/components";

interface WppMenuContext extends Components.WppMenuContext, HTMLElement {}
export const WppMenuContext: {
  prototype: WppMenuContext;
  new (): WppMenuContext;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
