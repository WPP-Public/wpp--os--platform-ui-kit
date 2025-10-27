import type { Components, JSX } from "../dist/types/components";

interface WppIconBorder extends Components.WppIconBorder, HTMLElement {}
export const WppIconBorder: {
  prototype: WppIconBorder;
  new (): WppIconBorder;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
