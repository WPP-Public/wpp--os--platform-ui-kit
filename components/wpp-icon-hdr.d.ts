import type { Components, JSX } from "../dist/types/components";

interface WppIconHdr extends Components.WppIconHdr, HTMLElement {}
export const WppIconHdr: {
  prototype: WppIconHdr;
  new (): WppIconHdr;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
