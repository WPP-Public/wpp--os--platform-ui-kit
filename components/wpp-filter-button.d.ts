import type { Components, JSX } from "../dist/types/components";

interface WppFilterButton extends Components.WppFilterButton, HTMLElement {}
export const WppFilterButton: {
  prototype: WppFilterButton;
  new (): WppFilterButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
