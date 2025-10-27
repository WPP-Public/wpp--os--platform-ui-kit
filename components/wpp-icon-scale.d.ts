import type { Components, JSX } from "../dist/types/components";

interface WppIconScale extends Components.WppIconScale, HTMLElement {}
export const WppIconScale: {
  prototype: WppIconScale;
  new (): WppIconScale;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
