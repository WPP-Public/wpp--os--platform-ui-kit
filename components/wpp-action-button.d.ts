import type { Components, JSX } from "../dist/types/components";

interface WppActionButton extends Components.WppActionButton, HTMLElement {}
export const WppActionButton: {
  prototype: WppActionButton;
  new (): WppActionButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
