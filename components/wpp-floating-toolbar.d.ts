import type { Components, JSX } from "../dist/types/components";

interface WppFloatingToolbar extends Components.WppFloatingToolbar, HTMLElement {}
export const WppFloatingToolbar: {
  prototype: WppFloatingToolbar;
  new (): WppFloatingToolbar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
