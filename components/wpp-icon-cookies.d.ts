import type { Components, JSX } from "../dist/types/components";

interface WppIconCookies extends Components.WppIconCookies, HTMLElement {}
export const WppIconCookies: {
  prototype: WppIconCookies;
  new (): WppIconCookies;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
