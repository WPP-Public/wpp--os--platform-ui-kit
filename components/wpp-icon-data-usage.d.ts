import type { Components, JSX } from "../dist/types/components";

interface WppIconDataUsage extends Components.WppIconDataUsage, HTMLElement {}
export const WppIconDataUsage: {
  prototype: WppIconDataUsage;
  new (): WppIconDataUsage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
