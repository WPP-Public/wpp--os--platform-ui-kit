import type { Components, JSX } from "../dist/types/components";

interface WppIconCross extends Components.WppIconCross, HTMLElement {}
export const WppIconCross: {
  prototype: WppIconCross;
  new (): WppIconCross;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
