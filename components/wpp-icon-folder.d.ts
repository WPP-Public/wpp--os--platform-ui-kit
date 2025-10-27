import type { Components, JSX } from "../dist/types/components";

interface WppIconFolder extends Components.WppIconFolder, HTMLElement {}
export const WppIconFolder: {
  prototype: WppIconFolder;
  new (): WppIconFolder;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
