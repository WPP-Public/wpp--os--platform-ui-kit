import type { Components, JSX } from "../dist/types/components";

interface WppIconBarChart extends Components.WppIconBarChart, HTMLElement {}
export const WppIconBarChart: {
  prototype: WppIconBarChart;
  new (): WppIconBarChart;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
