import type { Components, JSX } from "../dist/types/components";

interface WppRadioGroup extends Components.WppRadioGroup, HTMLElement {}
export const WppRadioGroup: {
  prototype: WppRadioGroup;
  new (): WppRadioGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
