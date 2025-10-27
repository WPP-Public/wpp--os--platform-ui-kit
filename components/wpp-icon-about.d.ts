import type { Components, JSX } from "../dist/types/components";

interface WppIconAbout extends Components.WppIconAbout, HTMLElement {}
export const WppIconAbout: {
  prototype: WppIconAbout;
  new (): WppIconAbout;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
