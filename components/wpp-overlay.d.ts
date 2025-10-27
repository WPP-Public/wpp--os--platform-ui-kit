import type { Components, JSX } from "../dist/types/components";

interface WppOverlay extends Components.WppOverlay, HTMLElement {}
export const WppOverlay: {
  prototype: WppOverlay;
  new (): WppOverlay;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
