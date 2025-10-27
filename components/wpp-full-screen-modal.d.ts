import type { Components, JSX } from "../dist/types/components";

interface WppFullScreenModal extends Components.WppFullScreenModal, HTMLElement {}
export const WppFullScreenModal: {
  prototype: WppFullScreenModal;
  new (): WppFullScreenModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
