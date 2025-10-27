import type { Components, JSX } from "../dist/types/components";

interface WppIconUpload extends Components.WppIconUpload, HTMLElement {}
export const WppIconUpload: {
  prototype: WppIconUpload;
  new (): WppIconUpload;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
