import type { Components, JSX } from "../dist/types/components";

interface WppBackToTopButton extends Components.WppBackToTopButton, HTMLElement {}
export const WppBackToTopButton: {
  prototype: WppBackToTopButton;
  new (): WppBackToTopButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
