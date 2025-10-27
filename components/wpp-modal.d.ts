import type { Components, JSX } from "../dist/types/components";

interface WppModal extends Components.WppModal, HTMLElement {}
export const WppModal: {
  prototype: WppModal;
  new (): WppModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
