import type { Components, JSX } from "../dist/types/components";

interface WppToastContainer extends Components.WppToastContainer, HTMLElement {}
export const WppToastContainer: {
  prototype: WppToastContainer;
  new (): WppToastContainer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
