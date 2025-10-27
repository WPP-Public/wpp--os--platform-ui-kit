import type { Components, JSX } from "../dist/types/components";

interface WppTopbar extends Components.WppTopbar, HTMLElement {}
export const WppTopbar: {
  prototype: WppTopbar;
  new (): WppTopbar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
