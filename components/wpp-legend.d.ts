import type { Components, JSX } from "../dist/types/components";

interface WppLegend extends Components.WppLegend, HTMLElement {}
export const WppLegend: {
  prototype: WppLegend;
  new (): WppLegend;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
