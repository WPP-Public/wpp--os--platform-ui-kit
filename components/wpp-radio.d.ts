import type { Components, JSX } from "../dist/types/components";

interface WppRadio extends Components.WppRadio, HTMLElement {}
export const WppRadio: {
  prototype: WppRadio;
  new (): WppRadio;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
