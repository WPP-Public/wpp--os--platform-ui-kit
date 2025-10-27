import type { Components, JSX } from "../dist/types/components";

interface WppIconDownload extends Components.WppIconDownload, HTMLElement {}
export const WppIconDownload: {
  prototype: WppIconDownload;
  new (): WppIconDownload;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
