import type { Components, JSX } from "../dist/types/components";

interface WppIconTrash extends Components.WppIconTrash, HTMLElement {}
export const WppIconTrash: {
  prototype: WppIconTrash;
  new (): WppIconTrash;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
