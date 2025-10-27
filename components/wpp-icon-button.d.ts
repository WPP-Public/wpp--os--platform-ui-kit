import type { Components, JSX } from "../dist/types/components";

interface WppIconButton extends Components.WppIconButton, HTMLElement {}
export const WppIconButton: {
  prototype: WppIconButton;
  new (): WppIconButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
