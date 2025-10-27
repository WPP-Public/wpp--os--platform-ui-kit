import type { Components, JSX } from "../dist/types/components";

interface WppIconDesign extends Components.WppIconDesign, HTMLElement {}
export const WppIconDesign: {
  prototype: WppIconDesign;
  new (): WppIconDesign;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
