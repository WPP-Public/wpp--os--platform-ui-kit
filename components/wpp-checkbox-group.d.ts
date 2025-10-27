import type { Components, JSX } from "../dist/types/components";

interface WppCheckboxGroup extends Components.WppCheckboxGroup, HTMLElement {}
export const WppCheckboxGroup: {
  prototype: WppCheckboxGroup;
  new (): WppCheckboxGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
