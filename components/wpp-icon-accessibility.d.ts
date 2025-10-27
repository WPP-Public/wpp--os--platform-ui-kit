import type { Components, JSX } from "../dist/types/components";

interface WppIconAccessibility extends Components.WppIconAccessibility, HTMLElement {}
export const WppIconAccessibility: {
  prototype: WppIconAccessibility;
  new (): WppIconAccessibility;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
