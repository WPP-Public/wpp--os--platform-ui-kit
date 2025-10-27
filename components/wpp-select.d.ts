import type { Components, JSX } from "../dist/types/components";

interface WppSelect extends Components.WppSelect, HTMLElement {}
export const WppSelect: {
  prototype: WppSelect;
  new (): WppSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
