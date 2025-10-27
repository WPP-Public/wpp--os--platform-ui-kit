import type { Components, JSX } from "../dist/types/components";

interface WppIconPadding extends Components.WppIconPadding, HTMLElement {}
export const WppIconPadding: {
  prototype: WppIconPadding;
  new (): WppIconPadding;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
