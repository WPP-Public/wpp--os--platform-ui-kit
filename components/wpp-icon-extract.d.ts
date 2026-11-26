import type { Components, JSX } from "../dist/types/components";

interface WppIconExtract extends Components.WppIconExtract, HTMLElement {}
export const WppIconExtract: {
  prototype: WppIconExtract;
  new (): WppIconExtract;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
