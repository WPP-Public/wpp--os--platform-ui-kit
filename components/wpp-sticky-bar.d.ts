import type { Components, JSX } from "../dist/types/components";

interface WppStickyBar extends Components.WppStickyBar, HTMLElement {}
export const WppStickyBar: {
  prototype: WppStickyBar;
  new (): WppStickyBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
