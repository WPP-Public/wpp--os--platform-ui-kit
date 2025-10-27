import type { Components, JSX } from "../dist/types/components";

interface WppIconWarning extends Components.WppIconWarning, HTMLElement {}
export const WppIconWarning: {
  prototype: WppIconWarning;
  new (): WppIconWarning;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
