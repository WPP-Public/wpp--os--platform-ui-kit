import type { Components, JSX } from "../dist/types/components";

interface WppIconHash extends Components.WppIconHash, HTMLElement {}
export const WppIconHash: {
  prototype: WppIconHash;
  new (): WppIconHash;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
