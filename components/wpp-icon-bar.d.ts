import type { Components, JSX } from "../dist/types/components";

interface WppIconBar extends Components.WppIconBar, HTMLElement {}
export const WppIconBar: {
  prototype: WppIconBar;
  new (): WppIconBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
