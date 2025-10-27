import type { Components, JSX } from "../dist/types/components";

interface WppIconAppFolder extends Components.WppIconAppFolder, HTMLElement {}
export const WppIconAppFolder: {
  prototype: WppIconAppFolder;
  new (): WppIconAppFolder;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
