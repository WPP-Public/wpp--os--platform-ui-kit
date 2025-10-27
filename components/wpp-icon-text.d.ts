import type { Components, JSX } from "../dist/types/components";

interface WppIconText extends Components.WppIconText, HTMLElement {}
export const WppIconText: {
  prototype: WppIconText;
  new (): WppIconText;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
