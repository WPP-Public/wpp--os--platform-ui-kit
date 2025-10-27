import type { Components, JSX } from "../dist/types/components";

interface WppFileUpload extends Components.WppFileUpload, HTMLElement {}
export const WppFileUpload: {
  prototype: WppFileUpload;
  new (): WppFileUpload;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
