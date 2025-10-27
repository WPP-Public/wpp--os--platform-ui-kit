import type { Components, JSX } from "../dist/types/components";

interface WppSpinner extends Components.WppSpinner, HTMLElement {}
export const WppSpinner: {
  prototype: WppSpinner;
  new (): WppSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
