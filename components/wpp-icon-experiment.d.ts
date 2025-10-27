import type { Components, JSX } from "../dist/types/components";

interface WppIconExperiment extends Components.WppIconExperiment, HTMLElement {}
export const WppIconExperiment: {
  prototype: WppIconExperiment;
  new (): WppIconExperiment;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
