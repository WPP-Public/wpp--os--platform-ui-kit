import type { Components, JSX } from "../dist/types/components";

interface WppIconLibrary extends Components.WppIconLibrary, HTMLElement {}
export const WppIconLibrary: {
  prototype: WppIconLibrary;
  new (): WppIconLibrary;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
