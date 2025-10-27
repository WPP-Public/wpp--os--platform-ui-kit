import type { Components, JSX } from "../dist/types/components";

interface WppIconWrapOn extends Components.WppIconWrapOn, HTMLElement {}
export const WppIconWrapOn: {
  prototype: WppIconWrapOn;
  new (): WppIconWrapOn;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
