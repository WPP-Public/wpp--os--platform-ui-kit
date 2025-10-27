import type { Components, JSX } from "../dist/types/components";

interface WppIconIframe extends Components.WppIconIframe, HTMLElement {}
export const WppIconIframe: {
  prototype: WppIconIframe;
  new (): WppIconIframe;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
