import type { Components, JSX } from "../dist/types/components";

interface WppTypography extends Components.WppTypography, HTMLElement {}
export const WppTypography: {
  prototype: WppTypography;
  new (): WppTypography;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
