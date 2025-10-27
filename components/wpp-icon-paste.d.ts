import type { Components, JSX } from "../dist/types/components";

interface WppIconPaste extends Components.WppIconPaste, HTMLElement {}
export const WppIconPaste: {
  prototype: WppIconPaste;
  new (): WppIconPaste;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
