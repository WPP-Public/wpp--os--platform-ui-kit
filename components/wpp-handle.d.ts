import type { Components, JSX } from "../dist/types/components";

interface WppHandle extends Components.WppHandle, HTMLElement {}
export const WppHandle: {
  prototype: WppHandle;
  new (): WppHandle;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
