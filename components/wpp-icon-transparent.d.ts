import type { Components, JSX } from "../dist/types/components";

interface WppIconTransparent extends Components.WppIconTransparent, HTMLElement {}
export const WppIconTransparent: {
  prototype: WppIconTransparent;
  new (): WppIconTransparent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
