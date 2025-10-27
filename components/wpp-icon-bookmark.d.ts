import type { Components, JSX } from "../dist/types/components";

interface WppIconBookmark extends Components.WppIconBookmark, HTMLElement {}
export const WppIconBookmark: {
  prototype: WppIconBookmark;
  new (): WppIconBookmark;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
