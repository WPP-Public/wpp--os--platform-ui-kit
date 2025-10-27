import type { Components, JSX } from "../dist/types/components";

interface WppIconDataArea extends Components.WppIconDataArea, HTMLElement {}
export const WppIconDataArea: {
  prototype: WppIconDataArea;
  new (): WppIconDataArea;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
