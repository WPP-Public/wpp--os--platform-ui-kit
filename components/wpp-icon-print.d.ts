import type { Components, JSX } from "../dist/types/components";

interface WppIconPrint extends Components.WppIconPrint, HTMLElement {}
export const WppIconPrint: {
  prototype: WppIconPrint;
  new (): WppIconPrint;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
