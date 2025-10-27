import type { Components, JSX } from "../dist/types/components";

interface WppMoreButton extends Components.WppMoreButton, HTMLElement {}
export const WppMoreButton: {
  prototype: WppMoreButton;
  new (): WppMoreButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
