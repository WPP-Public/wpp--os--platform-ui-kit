import type { Components, JSX } from "../dist/types/components";

interface WppIconFill extends Components.WppIconFill, HTMLElement {}
export const WppIconFill: {
  prototype: WppIconFill;
  new (): WppIconFill;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
