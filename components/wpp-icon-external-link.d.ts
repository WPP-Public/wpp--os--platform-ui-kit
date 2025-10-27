import type { Components, JSX } from "../dist/types/components";

interface WppIconExternalLink extends Components.WppIconExternalLink, HTMLElement {}
export const WppIconExternalLink: {
  prototype: WppIconExternalLink;
  new (): WppIconExternalLink;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
