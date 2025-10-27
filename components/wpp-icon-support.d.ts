import type { Components, JSX } from "../dist/types/components";

interface WppIconSupport extends Components.WppIconSupport, HTMLElement {}
export const WppIconSupport: {
  prototype: WppIconSupport;
  new (): WppIconSupport;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
