import type { Components, JSX } from "../dist/types/components";

interface WppIconExtension extends Components.WppIconExtension, HTMLElement {}
export const WppIconExtension: {
  prototype: WppIconExtension;
  new (): WppIconExtension;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
