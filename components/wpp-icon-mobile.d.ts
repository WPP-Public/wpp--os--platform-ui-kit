import type { Components, JSX } from "../dist/types/components";

interface WppIconMobile extends Components.WppIconMobile, HTMLElement {}
export const WppIconMobile: {
  prototype: WppIconMobile;
  new (): WppIconMobile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
