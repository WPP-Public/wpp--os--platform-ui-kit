import type { Components, JSX } from "../dist/types/components";

interface WppFileUploadItem extends Components.WppFileUploadItem, HTMLElement {}
export const WppFileUploadItem: {
  prototype: WppFileUploadItem;
  new (): WppFileUploadItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
