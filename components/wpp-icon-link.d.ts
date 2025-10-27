import type { Components, JSX } from "../dist/types/components";

interface WppIconLink extends Components.WppIconLink, HTMLElement {}
export const WppIconLink: {
  prototype: WppIconLink;
  new (): WppIconLink;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
