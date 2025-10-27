import type { Components, JSX } from "../dist/types/components";

interface WppIconResize extends Components.WppIconResize, HTMLElement {}
export const WppIconResize: {
  prototype: WppIconResize;
  new (): WppIconResize;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
