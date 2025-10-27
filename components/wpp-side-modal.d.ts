import type { Components, JSX } from "../dist/types/components";

interface WppSideModal extends Components.WppSideModal, HTMLElement {}
export const WppSideModal: {
  prototype: WppSideModal;
  new (): WppSideModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
