import type { Components, JSX } from "../dist/types/components";

interface WppIconGraph extends Components.WppIconGraph, HTMLElement {}
export const WppIconGraph: {
  prototype: WppIconGraph;
  new (): WppIconGraph;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
