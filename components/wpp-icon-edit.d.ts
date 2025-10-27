import type { Components, JSX } from "../dist/types/components";

interface WppIconEdit extends Components.WppIconEdit, HTMLElement {}
export const WppIconEdit: {
  prototype: WppIconEdit;
  new (): WppIconEdit;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
