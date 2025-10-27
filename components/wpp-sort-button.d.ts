import type { Components, JSX } from "../dist/types/components";

interface WppSortButton extends Components.WppSortButton, HTMLElement {}
export const WppSortButton: {
  prototype: WppSortButton;
  new (): WppSortButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
