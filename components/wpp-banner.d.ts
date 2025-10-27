import type { Components, JSX } from "../dist/types/components";

interface WppBanner extends Components.WppBanner, HTMLElement {}
export const WppBanner: {
  prototype: WppBanner;
  new (): WppBanner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
