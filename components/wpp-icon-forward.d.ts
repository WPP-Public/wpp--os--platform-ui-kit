import type { Components, JSX } from "../dist/types/components";

interface WppIconForward extends Components.WppIconForward, HTMLElement {}
export const WppIconForward: {
  prototype: WppIconForward;
  new (): WppIconForward;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
