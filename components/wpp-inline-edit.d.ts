import type { Components, JSX } from "../dist/types/components";

interface WppInlineEdit extends Components.WppInlineEdit, HTMLElement {}
export const WppInlineEdit: {
  prototype: WppInlineEdit;
  new (): WppInlineEdit;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
