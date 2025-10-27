import type { Components, JSX } from "../dist/types/components";

interface WppCheckbox extends Components.WppCheckbox, HTMLElement {}
export const WppCheckbox: {
  prototype: WppCheckbox;
  new (): WppCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
