import type { Components, JSX } from "../dist/types/components";

interface WppFloatingButton extends Components.WppFloatingButton, HTMLElement {}
export const WppFloatingButton: {
  prototype: WppFloatingButton;
  new (): WppFloatingButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
