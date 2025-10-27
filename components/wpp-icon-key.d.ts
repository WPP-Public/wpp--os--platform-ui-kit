import type { Components, JSX } from "../dist/types/components";

interface WppIconKey extends Components.WppIconKey, HTMLElement {}
export const WppIconKey: {
  prototype: WppIconKey;
  new (): WppIconKey;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
