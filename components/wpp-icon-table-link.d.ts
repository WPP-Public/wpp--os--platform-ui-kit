import type { Components, JSX } from "../dist/types/components";

interface WppIconTableLink extends Components.WppIconTableLink, HTMLElement {}
export const WppIconTableLink: {
  prototype: WppIconTableLink;
  new (): WppIconTableLink;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
