import type { Components, JSX } from "../dist/types/components";

interface WppIconGetSupport extends Components.WppIconGetSupport, HTMLElement {}
export const WppIconGetSupport: {
  prototype: WppIconGetSupport;
  new (): WppIconGetSupport;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
