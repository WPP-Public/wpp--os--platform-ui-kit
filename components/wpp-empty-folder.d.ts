import type { Components, JSX } from "../dist/types/components";

interface WppEmptyFolder extends Components.WppEmptyFolder, HTMLElement {}
export const WppEmptyFolder: {
  prototype: WppEmptyFolder;
  new (): WppEmptyFolder;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
