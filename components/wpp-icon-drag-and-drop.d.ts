import type { Components, JSX } from "../dist/types/components";

interface WppIconDragAndDrop extends Components.WppIconDragAndDrop, HTMLElement {}
export const WppIconDragAndDrop: {
  prototype: WppIconDragAndDrop;
  new (): WppIconDragAndDrop;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
