import type { Components, JSX } from "../dist/types/components";

interface WppIconCta extends Components.WppIconCta, HTMLElement {}
export const WppIconCta: {
  prototype: WppIconCta;
  new (): WppIconCta;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
