import type { Components, JSX } from "../dist/types/components";

interface WppIconShare extends Components.WppIconShare, HTMLElement {}
export const WppIconShare: {
  prototype: WppIconShare;
  new (): WppIconShare;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
