import type { Components, JSX } from "../dist/types/components";

interface WppButton extends Components.WppButton, HTMLElement {}
export const WppButton: {
  prototype: WppButton;
  new (): WppButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
