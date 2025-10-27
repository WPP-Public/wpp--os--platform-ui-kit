import type { Components, JSX } from "../dist/types/components";

interface WppDivider extends Components.WppDivider, HTMLElement {}
export const WppDivider: {
  prototype: WppDivider;
  new (): WppDivider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
