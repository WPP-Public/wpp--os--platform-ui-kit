import type { Components, JSX } from "../dist/types/components";

interface WppIconPen extends Components.WppIconPen, HTMLElement {}
export const WppIconPen: {
  prototype: WppIconPen;
  new (): WppIconPen;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
