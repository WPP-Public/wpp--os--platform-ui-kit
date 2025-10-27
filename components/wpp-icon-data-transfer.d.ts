import type { Components, JSX } from "../dist/types/components";

interface WppIconDataTransfer extends Components.WppIconDataTransfer, HTMLElement {}
export const WppIconDataTransfer: {
  prototype: WppIconDataTransfer;
  new (): WppIconDataTransfer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
