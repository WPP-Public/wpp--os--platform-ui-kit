import type { Components, JSX } from "../dist/types/components";

interface WppProgressIndicator extends Components.WppProgressIndicator, HTMLElement {}
export const WppProgressIndicator: {
  prototype: WppProgressIndicator;
  new (): WppProgressIndicator;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
