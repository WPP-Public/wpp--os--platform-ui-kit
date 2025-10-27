import type { Components, JSX } from "../dist/types/components";

interface WppIconScan extends Components.WppIconScan, HTMLElement {}
export const WppIconScan: {
  prototype: WppIconScan;
  new (): WppIconScan;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
