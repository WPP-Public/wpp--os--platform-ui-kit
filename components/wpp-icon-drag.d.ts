import type { Components, JSX } from "../dist/types/components";

interface WppIconDrag extends Components.WppIconDrag, HTMLElement {}
export const WppIconDrag: {
  prototype: WppIconDrag;
  new (): WppIconDrag;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
