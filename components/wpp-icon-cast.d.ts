import type { Components, JSX } from "../dist/types/components";

interface WppIconCast extends Components.WppIconCast, HTMLElement {}
export const WppIconCast: {
  prototype: WppIconCast;
  new (): WppIconCast;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
