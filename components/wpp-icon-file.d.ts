import type { Components, JSX } from "../dist/types/components";

interface WppIconFile extends Components.WppIconFile, HTMLElement {}
export const WppIconFile: {
  prototype: WppIconFile;
  new (): WppIconFile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
